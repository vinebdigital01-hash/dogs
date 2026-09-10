import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "../services/enquiryService.js";
import {
  DEFAULT_WHATSAPP_MESSAGE,
  puppyWhatsAppMessage,
} from "../config/config.js";
import { getPuppyById } from "../data/puppies.js";

/**
 * Floating WhatsApp button (fixed, bottom-right).
 * Auto-adjusts its message when the visitor is on a /puppy/:id page.
 */
export default function WhatsAppButton() {
  const { pathname } = useLocation();
  const puppyId = pathname.startsWith("/puppy/")
    ? decodeURIComponent(pathname.split("/")[2] || "")
    : "";
  const puppy = puppyId ? getPuppyById(puppyId) : null;
  const onDetails = Boolean(puppy);

  const href = useMemo(() => {
    const msg = puppy ? puppyWhatsAppMessage(puppy) : DEFAULT_WHATSAPP_MESSAGE;
    return buildWhatsAppUrl(msg);
  }, [puppy]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Madhav Kennal on WhatsApp"
      className={`fixed right-4 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-pop transition hover:scale-105 hover:bg-[#1EBE57] sm:bottom-6 sm:right-6 sm:px-5 sm:py-3.5 animate-pulse-soft ${
        onDetails ? "bottom-24 lg:bottom-6" : "bottom-5"
      }`}
    >
      <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
      <span className="hidden text-sm font-semibold sm:inline">
        Chat on WhatsApp
      </span>
    </a>
  );
}
