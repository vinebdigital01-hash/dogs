import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, MessageCircle, Send, X } from "lucide-react";
import { submitEnquiry } from "../services/enquiryService.js";

const blankForm = (puppy) => ({
  name: "",
  mobile: "",
  whatsapp: "",
  city: "",
  message: puppy
    ? `I am interested in ${puppy.name}. Please share more details.`
    : "",
});

/**
 * EnquiryForm — mobile-first bottom sheet / centered modal.
 */
export default function EnquiryForm({ open, onClose, puppy = null }) {
  const [form, setForm] = useState(() => blankForm(puppy));
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  useEffect(() => {
    if (!open) return;
    setSent(false);
    setErrors({});
    setWhatsappUrl("");
    setForm(blankForm(puppy));
  }, [open, puppy]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.dataset.enquiryOpen = "1";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      delete document.body.dataset.enquiryOpen;
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  const setField = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please tell us your name";
    if (!form.mobile.trim()) e.mobile = "Mobile number is required";
    else if (!/^[+\d\s-]{7,15}$/.test(form.mobile.trim()))
      e.mobile = "Enter a valid mobile number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    const { whatsappUrl: url } = submitEnquiry({
      customer: form,
      puppy,
      source: "whatsapp",
    });
    setWhatsappUrl(url);
    setSent(true);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-brand-ink/55 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Close enquiry form"
      />

      <div
        className="relative z-10 flex w-full max-w-lg flex-col overflow-hidden rounded-t-[1.75rem] bg-white shadow-pop animate-fade-up sm:max-h-[90vh] sm:rounded-3xl"
        style={{
          maxHeight: "min(92dvh, 920px)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        {/* Drag hint (mobile) */}
        <div className="flex justify-center pt-2 sm:hidden" aria-hidden>
          <span className="h-1 w-10 rounded-full bg-brand-beige" />
        </div>

        {/* Sticky header */}
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-brand-beige px-4 pb-3 pt-2 sm:px-6 sm:pt-5">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-teal">
              {puppy ? "Enquire about" : "General enquiry"}
            </p>
            <h3
              id="enquiry-title"
              className="truncate font-display text-lg font-extrabold text-brand-ink sm:text-xl"
            >
              {puppy ? `${puppy.name} · ${puppy.breed}` : "Contact Madhav Kennal"}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-brand-beige text-brand-charcoal transition hover:bg-brand-tealLight hover:text-brand-teal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6">
              {puppy && (
                <div className="rounded-2xl bg-brand-cream p-3.5 ring-1 ring-brand-beige">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-teal">
                    Puppy details (auto-attached)
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-brand-charcoal">
                    <p>
                      <span className="text-brand-charcoalSoft">ID: </span>
                      {puppy.id}
                    </p>
                    <p>
                      <span className="text-brand-charcoalSoft">Gender: </span>
                      <span className="capitalize">{puppy.gender}</span>
                    </p>
                    <p>
                      <span className="text-brand-charcoalSoft">Age: </span>
                      {puppy.age}
                    </p>
                    <p>
                      <span className="text-brand-charcoalSoft">Price: </span>₹
                      {puppy.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              )}

              <Field
                label="Your Name"
                value={form.name}
                onChange={(v) => setField("name", v)}
                placeholder="e.g. Rahul Sharma"
                error={errors.name}
                required
                autoComplete="name"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Mobile Number"
                  value={form.mobile}
                  onChange={(v) => setField("mobile", v)}
                  placeholder="10-digit number"
                  type="tel"
                  inputMode="tel"
                  error={errors.mobile}
                  required
                  autoComplete="tel"
                />
                <Field
                  label="WhatsApp (optional)"
                  value={form.whatsapp}
                  onChange={(v) => setField("whatsapp", v)}
                  placeholder="Same as above or different"
                  type="tel"
                  inputMode="tel"
                />
              </div>
              <Field
                label="City"
                value={form.city}
                onChange={(v) => setField("city", v)}
                placeholder="e.g. Noida"
                autoComplete="address-level2"
              />
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-brand-charcoalSoft">
                  Message
                </label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => setField("message", e.target.value)}
                  placeholder="Any specific question about this puppy?"
                  className="mt-1.5 w-full resize-none rounded-2xl border border-brand-teal/20 bg-brand-cream/50 px-4 py-3 text-base outline-none transition focus:border-brand-teal focus:bg-white sm:text-sm"
                />
              </div>
              <p className="pb-2 text-[11px] leading-relaxed text-brand-charcoalSoft">
                Sends your enquiry to Madhav Kennal on WhatsApp with puppy details already included.
              </p>
            </div>

            {/* Sticky bottom actions — clear of home indicator / FAB */}
            <div className="shrink-0 border-t border-brand-beige bg-white px-4 py-3 sm:px-6">
              <div className="flex flex-col gap-2.5">
                <button type="submit" className="btn-primary w-full !py-3.5">
                  <MessageCircle className="h-4 w-4" /> Send on WhatsApp
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full rounded-full py-2.5 text-sm font-semibold text-brand-charcoalSoft hover:text-brand-ink"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="overflow-y-auto px-6 py-10 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-tealLight text-brand-teal">
              <CheckCircle2 className="h-7 w-7" />
            </span>
            <h4 className="mt-5 font-display text-2xl font-extrabold text-brand-ink">
              Enquiry ready to send!
            </h4>
            <p className="mt-2 text-sm text-brand-charcoalSoft">
              WhatsApp should have opened. If it didn&apos;t, tap below.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6 w-full"
            >
              <Send className="h-4 w-4" /> Open WhatsApp
            </a>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full py-2 text-sm font-semibold text-brand-charcoalSoft"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  required,
  autoComplete,
  inputMode,
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-widest text-brand-charcoalSoft">
        {label} {required && <span className="text-brand-coral">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className={`mt-1.5 w-full rounded-2xl border bg-brand-cream/50 px-4 py-3 text-base outline-none transition focus:bg-white sm:text-sm ${
          error
            ? "border-brand-coral focus:border-brand-coral"
            : "border-brand-teal/20 focus:border-brand-teal"
        }`}
      />
      {error && <p className="mt-1 text-xs text-brand-coralDark">{error}</p>}
    </div>
  );
}
