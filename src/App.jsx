import React, { useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";

import AnnouncementBar from "./components/AnnouncementBar.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";
import { FavoritesProvider } from "./context/FavoritesContext.jsx";

import Home from "./pages/Home.jsx";
import Puppies from "./pages/Puppies.jsx";
import PuppyDetails from "./pages/PuppyDetails.jsx";
import Breeds from "./pages/Breeds.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import WhyChooseUsPage from "./pages/WhyChooseUsPage.jsx";

// Reset scroll on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <FavoritesProvider>
    <div className="flex min-h-screen flex-col bg-white overflow-x-hidden">
      <ScrollToTop />
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/puppies" element={<Puppies />} />
          <Route path="/puppy/:id" element={<PuppyDetails />} />
          <Route path="/breeds" element={<Breeds />} />
          <Route path="/about" element={<About />} />
          <Route path="/why-choose-us" element={<WhyChooseUsPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="*"
            element={
              <section className="section py-24 text-center">
                <h1 className="h-display text-brand-ink">Page not found</h1>
                <p className="mt-2 text-brand-charcoalSoft">
                  The page you're looking for doesn't exist.
                </p>
                <Link to="/" className="btn-primary mt-6 inline-flex">
                  Go Home
                </Link>
              </section>
            }
          />
        </Routes>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
    </FavoritesProvider>
  );
}
