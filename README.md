# Madhav Kennal — Premium Puppy Kennel Website

A production-ready React website for **Madhav Kennal**, a professional kennel dealing in all popular puppy breeds. The site is optimized around one goal: converting visitors into WhatsApp enquiries.

## Tech Stack

- **React 18** + **JSX**
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **React Router DOM** (routing)
- **Lucide React** (icons)

No Bootstrap, no Material UI, no Next.js, no TypeScript.

## Getting Started

```bash
npm install
npm run dev       # start dev server on http://localhost:5173
npm run build     # production build
npm run preview   # preview production build
```

## Where to change things

| I want to change… | Edit |
| --- | --- |
| Owner WhatsApp / phone / email | `src/config/config.js` |
| Price slider limits | `src/config/config.js` → `PRICE_LIMITS` |
| Puppy listings | `src/data/puppies.js` |
| Breed catalogue | `src/data/breeds.js` |
| Testimonials | `src/data/testimonials.js` |
| FAQs | `src/data/faqs.js` |
| Gallery images | `src/data/gallery.js` |
| Enquiry destination / logic | `src/services/enquiryService.js` |
| Brand colours & fonts | `tailwind.config.js` |

## Enquiry Flow

1. Visitor browses `/puppies` and uses filters (breed, gender, age, price range slider, availability, search).
2. Clicks a puppy card → opens `/puppy/:id`.
3. Clicks **Enquire About This Puppy** → an enquiry modal opens.
4. Customer fills name, mobile, city, message.
5. On submit, `submitEnquiry()` in `src/services/enquiryService.js`:
   - Composes a rich message containing customer + puppy details.
   - Persists the enquiry to `localStorage` (demo backend hook).
   - Opens WhatsApp to `OWNER_WHATSAPP_NUMBER` with the message pre-filled.
6. Owner receives full context and contacts the customer.

The **customer's number is never used as the destination**. The owner number configured in `config.js` is always the target.

## Making it backend-powered later

Add your integration inside `submitEnquiry` in `src/services/enquiryService.js`:

```js
// Example: send to a Node / Supabase / Firebase endpoint
await fetch("/api/enquiries", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(record),
});
```

The UI never needs to change.

## Routes

- `/` — Home
- `/puppies` — Listing with filters (URL-synced)
- `/puppy/:id` — Puppy details + enquiry
- `/breeds` — Breed catalogue
- `/about` — About Madhav Kennal
- `/why-choose-us` — Trust page
- `/contact` — Contact form
