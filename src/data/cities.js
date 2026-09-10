import { kennelPhoto } from "./images.js";

export const CITIES_DATA = [
  { slug: "delhi-ncr", name: "Delhi NCR", image: kennelPhoto(0) },
  { slug: "mumbai", name: "Mumbai", image: kennelPhoto(1) },
  { slug: "bangalore", name: "Bangalore", image: kennelPhoto(2) },
  { slug: "pune", name: "Pune", image: kennelPhoto(3) },
  { slug: "chennai", name: "Chennai", image: kennelPhoto(4) },
  { slug: "hyderabad", name: "Hyderabad", image: kennelPhoto(5) },
  { slug: "jaipur", name: "Jaipur", image: kennelPhoto(6) },
  { slug: "chandigarh", name: "Chandigarh", image: kennelPhoto(7) },
  { slug: "kolkata", name: "Kolkata", image: kennelPhoto(8) },
  { slug: "lucknow", name: "Lucknow", image: kennelPhoto(9) },
  { slug: "patna", name: "Patna", image: kennelPhoto(10) },
  { slug: "ahmedabad", name: "Ahmedabad", image: kennelPhoto(11) },
  { slug: "hisar", name: "Hisar", image: kennelPhoto(12) },
  { slug: "karnal", name: "Karnal", image: kennelPhoto(13) },
  { slug: "ambala", name: "Ambala", image: kennelPhoto(14) },
  { slug: "panchkula", name: "Panchkula", image: kennelPhoto(15) },
];

export const SIZE_OPTIONS = [
  { value: "all", label: "All" },
  { value: "small", label: "Small Dogs" },
  { value: "training", label: "Training Dogs" },
  { value: "medium", label: "Medium Breed" },
  { value: "large", label: "Large Breeds" },
];

export const AGE_OPTIONS = [
  { value: "all", label: "All Ages" },
  { value: "0-3", label: "0–3 Weeks", min: 0, max: 3 },
  { value: "3-8", label: "3–8 Weeks", min: 3, max: 8 },
  { value: "8-15", label: "8–15 Weeks", min: 8, max: 15 },
  { value: "15-30", label: "15–30 Weeks", min: 15, max: 30 },
  { value: "30-100", label: "30–100 Weeks", min: 30, max: 100 },
  { value: "100+", label: "100+ Weeks", min: 100, max: 999 },
];
