/**
 * Enquiry Service
 * ---------------
 * Central place that owns "what happens when a customer submits an enquiry".
 *
 * Today it:
 *  1. Composes a rich enquiry message.
 *  2. Opens WhatsApp to the OWNER's number with the message pre-filled.
 *  3. Persists a copy of the enquiry to localStorage (for a future admin dashboard).
 *
 * Tomorrow you can plug in any of these without touching the UI:
 *  - Supabase / Firebase (persist enquiries in a table)
 *  - Node.js / Express API (POST to /api/enquiries)
 *  - Email API (Resend, SendGrid, Postmark)
 *  - CRM (HubSpot, Zoho)
 *  - WhatsApp Business Cloud API (send template messages server-side)
 *
 * Just add a new function below and call it from `submitEnquiry`.
 */

import { BRAND, OWNER_WHATSAPP_NUMBER } from "../config/config.js";

const STORAGE_KEY = "madhav_kennal_enquiries_v1";

// -----------------------------------------------------------------------------
// Message composition
// -----------------------------------------------------------------------------

export const buildEnquiryMessage = ({ customer, puppy }) => {
  const price = puppy ? `₹${puppy.price.toLocaleString("en-IN")}` : "-";
  const puppyBlock = puppy
    ? [
        "",
        "Interested Puppy:",
        `• Name: ${puppy.name}`,
        `• Breed: ${puppy.breed}`,
        `• Gender: ${puppy.gender}`,
        `• Age: ${puppy.age}`,
        `• Price: ${price}`,
        `• Puppy ID: ${puppy.id}`,
        typeof window !== "undefined"
          ? `• Puppy Page: ${window.location.origin}/puppy/${puppy.id}`
          : "",
      ]
        .filter(Boolean)
        .join("\n")
    : "";

  return [
    "-------------------------------",
    "NEW PUPPY ENQUIRY",
    "-------------------------------",
    "",
    `Customer Name: ${customer.name}`,
    `Mobile: ${customer.mobile}`,
    customer.whatsapp ? `WhatsApp: ${customer.whatsapp}` : "",
    customer.city ? `City: ${customer.city}` : "",
    puppyBlock,
    "",
    "Message:",
    customer.message || "I am interested in this puppy.",
    "",
    `Website: ${BRAND.name}`,
    "-------------------------------",
  ]
    .filter(Boolean)
    .join("\n");
};

// -----------------------------------------------------------------------------
// WhatsApp integration (click-to-chat)
// -----------------------------------------------------------------------------

export const buildWhatsAppUrl = (message, phoneNumber = OWNER_WHATSAPP_NUMBER) => {
  const cleanNumber = String(phoneNumber).replace(/\D/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
};

export const openWhatsApp = (message, phoneNumber) => {
  const url = buildWhatsAppUrl(message, phoneNumber);
  if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
  return url;
};

// -----------------------------------------------------------------------------
// Local persistence (demo — replace with API call in production)
// -----------------------------------------------------------------------------

const persistLocally = (enquiry) => {
  if (typeof window === "undefined") return;
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
    existing.unshift(enquiry);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(0, 200)));
  } catch (err) {
    // Silently ignore storage errors (private mode / quota exceeded).
    console.warn("Enquiry persist failed", err);
  }
};

export const getStoredEnquiries = () => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};

// -----------------------------------------------------------------------------
// Public API — this is the ONLY function the UI should call.
// -----------------------------------------------------------------------------

/**
 * Submits an enquiry.
 * @param {Object} enquiryData
 * @param {{name:string, mobile:string, whatsapp?:string, city?:string, message?:string}} enquiryData.customer
 * @param {Object|null} enquiryData.puppy - Selected puppy object (or null for a general enquiry).
 * @param {"whatsapp"|"contact-form"|"quick"} [enquiryData.source]
 * @returns {{ok: boolean, whatsappUrl: string, message: string, enquiryId: string}}
 */
export const submitEnquiry = ({ customer, puppy = null, source = "whatsapp" }) => {
  const message = buildEnquiryMessage({ customer, puppy });
  const whatsappUrl = buildWhatsAppUrl(message);

  const record = {
    id: `ENQ-${Date.now()}`,
    createdAt: new Date().toISOString(),
    source,
    customer,
    puppyId: puppy?.id ?? null,
    puppyName: puppy?.name ?? null,
    puppyBreed: puppy?.breed ?? null,
    message,
  };

  persistLocally(record);

  // Fire-and-forget hook — plug in Supabase / API / email here later:
  // await fetch("/api/enquiries", { method: "POST", body: JSON.stringify(record) });

  // Always open WhatsApp to the OWNER's configured number.
  if (source === "whatsapp") openWhatsApp(message);

  return { ok: true, whatsappUrl, message, enquiryId: record.id };
};
