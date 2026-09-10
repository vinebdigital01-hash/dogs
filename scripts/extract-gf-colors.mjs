import fs from "fs";

const html = fs.readFileSync(process.env.TEMP + "/gf.html", "utf8");
const css = [...html.matchAll(/href="([^"]+\.css[^"]*)"/g)].map((m) => m[1]);
console.log("CSS links:", css.slice(0, 30));
const theme = [...html.matchAll(/theme-color[^>]{0,120}/gi)].map((m) => m[0]);
console.log("theme:", theme.slice(0, 5));
const hex = [...html.matchAll(/#([0-9A-Fa-f]{6})\b/g)].map((m) => "#" + m[1].toUpperCase());
const counts = {};
hex.forEach((c) => {
  counts[c] = (counts[c] || 0) + 1;
});
console.log(
  "Top hex:",
  Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 50)
);
const next = [...html.matchAll(/_next\/static\/css\/[^"']+\.css/g)].map((m) => m[0]);
console.log("next css:", [...new Set(next)].slice(0, 10));
const abs = [...html.matchAll(/https?:\/\/[^"'\s]+\.css[^"'\s]*/g)].map((m) => m[0]);
console.log("abs css:", [...new Set(abs)].slice(0, 10));
