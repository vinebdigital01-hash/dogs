import React from "react";
import { Link, useParams } from "react-router-dom";
import BlogCard from "../components/BlogCard.jsx";
import TrustStrip from "../components/TrustStrip.jsx";
import { getBlogBySlug, BLOGS } from "../data/blogs.js";
import usePageTitle from "../hooks/usePageTitle.js";

export default function BlogPost() {
  const { slug } = useParams();
  const post = getBlogBySlug(slug);
  usePageTitle(post ? `${post.title} | Madhav Kennal` : "Blog | Madhav Kennal");

  if (!post) {
    return (
      <section className="section py-24 text-center">
        <h1 className="h-display">Article not found</h1>
        <Link to="/blogs" className="btn-primary mt-6">Back to Blog</Link>
      </section>
    );
  }

  const related = BLOGS.filter((b) => b.slug !== post.slug && b.category === post.category).slice(0, 3);

  return (
    <>
      <article>
        <div className="relative aspect-[21/9] max-h-[420px] overflow-hidden bg-brand-beige">
          <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/70 to-transparent" />
          <div className="section absolute bottom-0 left-0 right-0 pb-8 text-white">
            <p className="text-sm font-semibold text-brand-gold">{post.categoryLabel}</p>
            <h1 className="mt-2 max-w-3xl font-display text-3xl font-extrabold sm:text-4xl">{post.title}</h1>
            <p className="mt-2 text-sm text-white/80">
              {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
        </div>

        <div className="section max-w-3xl py-10 sm:py-14">
          <p className="text-lg text-brand-charcoalSoft">{post.excerpt}</p>
          <div className="mt-8 space-y-5 text-brand-charcoal leading-relaxed">
            {(post.body || []).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <Link to="/blogs" className="btn-ghost mt-10">← All articles</Link>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-cream-wash py-12">
          <div className="section">
            <h2 className="font-display text-2xl font-extrabold">Related posts</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <TrustStrip />
    </>
  );
}
