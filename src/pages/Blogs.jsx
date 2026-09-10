import React from "react";
import BlogCard from "../components/BlogCard.jsx";
import TrustStrip from "../components/TrustStrip.jsx";
import { BLOGS } from "../data/blogs.js";
import { IMG } from "../data/images.js";
import usePageTitle from "../hooks/usePageTitle.js";

export default function Blogs() {
  usePageTitle("Blog | Madhav Kennal");

  return (
    <>
      <section className="relative overflow-hidden">
        <img src={IMG.husky[1]} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-brand-ink/70" />
        <div className="section relative py-16 sm:py-20">
          <h1 className="font-display text-4xl font-extrabold text-white">Kennel journal</h1>
          <p className="mt-3 text-white/90">Practical notes on breeds, care and bringing a puppy home</p>
        </div>
      </section>
      <section className="section py-12">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BLOGS.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
      <TrustStrip />
    </>
  );
}
