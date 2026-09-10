import React, { useEffect, useState } from "react";
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
 * EnquiryForm — modal that opens when a user clicks "Enquire About This Puppy".
 * Automatically attaches the puppy metadata to the enquiry (customer never types puppy info).
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
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-title"
    >
      <div
        className="absolute inset-0 bg-brand-ink/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white shadow-pop sm:rounded-3xl">
        <div className="flex items-center justify-between border-b border-brand-cream px-6 py-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-teal">
              {puppy ? "Enquire about" : "General enquiry"}
            </p>
            <h3 id="enquiry-title" className="font-display text-xl font-700 text-brand-ink">
              {puppy ? `${puppy.name} · ${puppy.breed}` : "Contact Madhav Kennal"}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close enquiry form"
            className="grid h-9 w-9 place-items-center rounded-full bg-brand-cream text-brand-charcoal transition hover:bg-brand-tealLight hover:text-brand-teal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-4 px-6 py-6">
            {puppy && (
              <div className="rounded-2xl bg-brand-cream/70 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-teal">
                  Auto-attached puppy details
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-brand-charcoal">
                  <p>
                    <span className="text-brand-charcoalSoft">ID: </span>
                    {puppy.id}
                  </p>
                  <p>
                    <span className="text-brand-charcoalSoft">Gender: </span>
                    {puppy.gender}
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
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Mobile Number"
                value={form.mobile}
                onChange={(v) => setField("mobile", v)}
                placeholder="10-digit number"
                type="tel"
                error={errors.mobile}
                required
              />
              <Field
                label="WhatsApp (optional)"
                value={form.whatsapp}
                onChange={(v) => setField("whatsapp", v)}
                placeholder="Same as above or different"
                type="tel"
              />
            </div>
            <Field
              label="City"
              value={form.city}
              onChange={(v) => setField("city", v)}
              placeholder="e.g. Noida"
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
                className="mt-1.5 w-full resize-none rounded-2xl border border-brand-teal/20 bg-brand-cream/50 px-4 py-3 text-sm outline-none transition focus:border-brand-teal focus:bg-white"
              />
            </div>

            <p className="text-[11px] text-brand-charcoalSoft">
              This sends your enquiry to Madhav Kennal on WhatsApp — with the
              puppy details already included. You never need to copy puppy
              information yourself.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="submit" className="btn-whatsapp w-full">
                <MessageCircle className="h-4 w-4" /> Send Enquiry on WhatsApp
              </button>
              <button
                type="button"
                onClick={onClose}
                className="btn-ghost w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="px-6 py-10 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-tealLight text-brand-teal">
              <CheckCircle2 className="h-7 w-7" />
            </span>
            <h4 className="mt-5 font-display text-2xl font-700 text-brand-ink">
              Enquiry ready to send!
            </h4>
            <p className="mt-2 text-sm text-brand-charcoalSoft">
              WhatsApp should have opened in a new tab. If it didn't, tap the
              button below.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp mt-6"
            >
              <Send className="h-4 w-4" /> Open WhatsApp
            </a>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 block w-full text-xs text-brand-charcoalSoft underline"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", error, required }) {
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
        className={`mt-1.5 w-full rounded-2xl border bg-brand-cream/50 px-4 py-3 text-sm outline-none transition focus:bg-white ${
          error
            ? "border-brand-coral focus:border-brand-coral"
            : "border-brand-teal/20 focus:border-brand-teal"
        }`}
      />
      {error && <p className="mt-1 text-xs text-brand-coralDark">{error}</p>}
    </div>
  );
}
