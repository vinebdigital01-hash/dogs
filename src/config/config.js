/**
 * MADHAV KENNAL — Site Configuration
 * Replace placeholders before go-live.
 */

export const BRAND = {
  name: "Madhav Kennal",
  tagline: "Find Your Perfect Furry Companion in India",
  established: 2016,
  description:
    "Madhav Kennal helps families across India find healthy, well-cared-for purebred puppies — with clear details, warm guidance and support beyond the first day home.",
};

export const OWNER_WHATSAPP_NUMBER = "919999999999";
export const OWNER_PHONE_NUMBER = "+91 99999 99999";
export const OWNER_EMAIL = "hello@madhavkennal.com";

export const LOCATION = {
  city: "Delhi NCR",
  address: "Madhav Kennal, Sector 62, Noida, Uttar Pradesh 201301",
  mapsUrl: "https://maps.google.com/?q=Noida+Uttar+Pradesh",
  hours: "Call us 09:00–18:00",
};

export const SOCIALS = {
  instagram: "https://instagram.com/madhavkennal",
  facebook: "https://facebook.com/madhavkennal",
  twitter: "https://twitter.com/madhavkennal",
  pinterest: "https://pinterest.com/madhavkennal",
  youtube: "https://youtube.com/@madhavkennal",
};

export const PRICE_LIMITS = {
  min: 0,
  max: 100000,
  step: 1000,
};

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hello Madhav Kennal, I want to buy a puppy.";

export const puppyWhatsAppMessage = (puppy) =>
  `Hello Madhav Kennal, I am interested in ${puppy.name}, ${puppy.breed}, priced at ₹${puppy.price.toLocaleString(
    "en-IN"
  )}. Please share more details.`;

export const CITIES = [
  "Delhi NCR",
  "Mumbai",
  "Bangalore",
  "Pune",
  "Chennai",
  "Hyderabad",
  "Jaipur",
  "Chandigarh",
  "Kolkata",
  "Lucknow",
  "Patna",
  "Ahmedabad",
  "Hisar",
  "Karnal",
  "Ambala",
  "Panchkula",
];
