import React from "react";
import { Link } from "react-router-dom";

export default function BlogCard({ post }) {
  const date = new Date(post.date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return (
    <article className="group card-soft overflow-hidden transition duration-500 ease-out hover:-translate-y-2 hover:shadow-pop">
      <Link to={`/blogs/${post.category}/${post.slug}`} className="block overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="aspect-[16/10] w-full object-cover transition duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
      </Link>
      <div className="p-4 sm:p-5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-teal">{date}</p>
        <h3 className="mt-2 font-display text-base font-extrabold text-brand-ink transition group-hover:text-brand-teal sm:text-lg">
          <Link to={`/blogs/${post.category}/${post.slug}`}>{post.title}</Link>
        </h3>
        <Link
          to={`/blogs/${post.category}/${post.slug}`}
          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-teal transition group-hover:gap-2"
        >
          Read More <span>→</span>
        </Link>
      </div>
    </article>
  );
}
