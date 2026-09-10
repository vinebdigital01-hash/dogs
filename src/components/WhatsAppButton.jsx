import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "../services/enquiryService.js";
import { DEFAULT_WHATSAPP_MESSAGE, puppyWhatsAppMessage } from "../config/config.js";
import { getPuppyById } from "../data/puppies.js";

export default function WhatsAppButton() {
  const { pathname } = useLocation();
  const puppyId = pathname.startsWith("/puppy/")
    ? decodeURIComponent(pathname.split("/")[2] || "")
    : "";
  const puppy = puppyId ? getPuppyById(puppyId) : null;

  const href = useMemo(() => {
    const msg = puppy ? puppyWhatsAppMessage(puppy) : DEFAULT_WHATSAPP_MESSAGE;
    return buildWhatsAppUrl(msg);
  }, [puppy]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-4 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-pop transition duration-300 hover:scale-110 hover:-translate-y-1 animate-pulse-soft sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="h-5 w-5 animate-bounce-soft" />
      <span className="hidden text-sm font-semibold sm:inline">WhatsApp</span>
    </a>
  );
}
