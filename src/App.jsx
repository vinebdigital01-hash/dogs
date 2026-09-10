import React, { useEffect } from "react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";

import UtilityBar from "./components/UtilityBar.jsx";
import Navbar from "./components/Navbar.jsx";
import SecondaryNav from "./components/SecondaryNav.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";
import PageTransition from "./components/PageTransition.jsx";
import { FavoritesProvider } from "./context/FavoritesContext.jsx";
import { CityProvider } from "./context/CityContext.jsx";

import Home from "./pages/Home.jsx";
import PuppyListing from "./pages/PuppyListing.jsx";
import PuppyDetail from "./pages/PuppyDetail.jsx";
import BreedDetail from "./pages/BreedDetail.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import FAQs from "./pages/FAQs.jsx";
import BuyingPet from "./pages/BuyingPet.jsx";
import SellingPet from "./pages/SellingPet.jsx";
import Blogs from "./pages/Blogs.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import Login from "./pages/Login.jsx";
import SellForm from "./pages/SellForm.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsConditions from "./pages/TermsConditions.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <section className="section py-24 text-center">
      <h1 className="h-display text-brand-ink">Page not found</h1>
      <p className="mt-2 text-brand-charcoalSoft">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-primary mt-6 inline-flex">
        Go Home
      </Link>
    </section>
  );
}

export default function App() {
  return (
    <CityProvider>
      <FavoritesProvider>
        <div className="flex min-h-screen flex-col overflow-x-hidden bg-white">
          <ScrollToTop />
          <UtilityBar />
          <Navbar />
          <SecondaryNav />

          <main className="flex-1">
            <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/puppies" element={<PuppyListing />} />
              <Route path="/puppies/breed/:breed" element={<PuppyListing />} />
              <Route path="/puppies/city/:city" element={<PuppyListing />} />
              <Route path="/puppy/:id" element={<PuppyDetail />} />
              <Route path="/breed/:breedName" element={<BreedDetail />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/about" element={<Navigate to="/about-us" replace />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/buying-pet" element={<BuyingPet />} />
              <Route path="/selling-pet" element={<SellingPet />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:category/:slug" element={<BlogPost />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sell" element={<SellForm />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
              <Route path="/breeds" element={<Navigate to="/puppies" replace />} />
              <Route path="/contact" element={<Navigate to="/faqs" replace />} />
              <Route path="/why-choose-us" element={<Navigate to="/about-us" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            </PageTransition>
          </main>

          <Footer />
          <WhatsAppButton />
        </div>
      </FavoritesProvider>
    </CityProvider>
  );
}
