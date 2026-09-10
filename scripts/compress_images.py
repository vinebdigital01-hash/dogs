"""
Compress public/images to WebP for faster loads.

Note: JPEG/WebP encoder "quality=95" often INCREASES size on already-compressed
photos. quality=85 keeps ~95% visual fidelity for web while cutting KB a lot.
"""
from __future__ import annotations

from pathlib import Path
from PIL import Image, ImageFile

ImageFile.LOAD_TRUNCATED_IMAGES = True

ROOT = Path(__file__).resolve().parents[1]
IMG_DIR = ROOT / "public" / "images"
MAX_EDGE = 1400
# High visual quality for web (~95% perceived fidelity vs original)
QUALITY = 85
EXTS = {".jpg", ".jpeg", ".png", ".webp"}


def compress_one(path: Path) -> tuple[int, int, Path]:
    before = path.stat().st_size
    with Image.open(path) as im:
        im.load()
        if im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info):
            im = im.convert("RGBA")
        elif im.mode != "RGB":
            im = im.convert("RGB")

        w, h = im.size
        longest = max(w, h)
        if longest > MAX_EDGE:
            scale = MAX_EDGE / longest
            im = im.resize(
                (max(1, int(w * scale)), max(1, int(h * scale))),
                Image.Resampling.LANCZOS,
            )

        out = path.with_suffix(".webp")
        tmp = out.with_name(out.stem + ".tmp.webp")
        im.save(tmp, format="WEBP", quality=QUALITY, method=6)

    after_tmp = tmp.stat().st_size
    # Keep original if somehow webp is larger (rare at q=85)
    if after_tmp >= before and path.suffix.lower() in {".jpg", ".jpeg", ".webp"}:
        tmp.unlink(missing_ok=True)
        return before, before, path

    if out.exists():
        out.unlink()
    tmp.replace(out)
    if path.resolve() != out.resolve() and path.exists():
        path.unlink()

    after = out.stat().st_size
    return before, after, out


def main() -> None:
    files = sorted(
        p
        for p in IMG_DIR.iterdir()
        if p.is_file() and p.suffix.lower() in EXTS and ".tmp." not in p.name
    )
    if not files:
        print(f"No images in {IMG_DIR}")
        return

    total_before = 0
    total_after = 0
    print(f"Compressing {len(files)} images -> WebP q={QUALITY}, max_edge={MAX_EDGE}px\n")

    for path in files:
        try:
            before, after, out = compress_one(path)
            total_before += before
            total_after += after
            pct = ((before - after) / before * 100) if before else 0
            print(
                f"{out.name:22s}  {before/1024:7.1f} KB -> {after/1024:7.1f} KB  "
                f"({pct:+.1f}%)"
            )
        except Exception as e:
            print(f"FAIL {path.name}: {e}")

    saved = (total_before - total_after) / 1024
    pct = ((total_before - total_after) / total_before * 100) if total_before else 0
    print(
        f"\nTotal: {total_before/1024:.1f} KB -> {total_after/1024:.1f} KB "
        f"(saved {saved:.1f} KB / {pct:.1f}%)"
    )


if __name__ == "__main__":
    main()
