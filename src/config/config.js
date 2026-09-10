/**
 * MADHAV KENNAL — Site Configuration
 * -----------------------------------
 * All owner / business details live in this single file.
 * Change values here and they update everywhere on the site.
 */

export const BRAND = {
  name: "Madhav Kennal",
  tagline: "Find Your Perfect Puppy",
  established: 2016,
  description:
    "Madhav Kennal is a professional puppy kennel dealing in all popular breeds. We help families discover loving companions and make their puppy journey simple and joyful.",
};

// ⚠️ Replace with the actual owner contact details before going live.
// WhatsApp number MUST include country code and NO plus sign / spaces.
export const OWNER_WHATSAPP_NUMBER = "919999999999"; // e.g. 91XXXXXXXXXX
export const OWNER_PHONE_NUMBER = "+91 99999 99999";
export const OWNER_EMAIL = "hello@madhavkennal.com";

export const LOCATION = {
  city: "Delhi NCR",
  address: "Madhav Kennal, Sector 62, Noida, Uttar Pradesh 201301",
  mapsUrl: "https://maps.google.com/?q=Noida+Uttar+Pradesh",
  hours: "Open Daily · 9:00 AM – 8:00 PM",
};

export const SOCIALS = {
  instagram: "https://instagram.com/madhavkennal",
  facebook: "https://facebook.com/madhavkennal",
  youtube: "https://youtube.com/@madhavkennal",
};

export const PRICE_LIMITS = {
  min: 5000,
  max: 200000,
  step: 1000,
};

// Default WhatsApp message when the visitor is not on a specific puppy page.
export const DEFAULT_WHATSAPP_MESSAGE =
  "Hello Madhav Kennal, I am interested in your puppies. Please share the currently available breeds.";

// Utility that returns a puppy-specific WhatsApp message.
export const puppyWhatsAppMessage = (puppy) =>
  `Hello Madhav Kennal, I am interested in ${puppy.name}, ${puppy.breed}, priced at ₹${puppy.price.toLocaleString(
    "en-IN"
  )}. Please share more details.`;
