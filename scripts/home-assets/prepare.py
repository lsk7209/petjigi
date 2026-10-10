"""Convert a built-in imagegen manifest to homepage WebP assets (no API keys)."""
import json
import sys
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[2]
SIZES = {
    "hero": (2400, 1350),
    "local-dog": (1200, 900),
    "health-dog": (1200, 900),
    "memorial": (1400, 1050),
    "message": (1200, 900),
    "thumb-health": (800, 600),
    "thumb-nutrition": (800, 600),
    "thumb-care": (800, 600),
    "thumb-adoption": (800, 600),
    "thumb-insurance": (800, 600),
}


def main():
    manifest = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    if set(manifest) != set(SIZES):
        raise SystemExit("Manifest must contain exactly the ten specified assets")
    output = ROOT / "public/images/home"
    output.mkdir(parents=True, exist_ok=True)
    for name, size in SIZES.items():
        destination = output / f"{name}.webp"
        if destination.exists():
            raise SystemExit(f"Refusing to overwrite: {destination}")
    for name, size in SIZES.items():
        with Image.open(manifest[name]["source"]) as source:
            image = ImageOps.fit(ImageOps.exif_transpose(source).convert("RGB"), size,
                                 method=Image.Resampling.LANCZOS)
            destination = output / f"{name}.webp"
            image.save(destination, "WEBP", quality=82, method=6)
        with Image.open(destination) as check:
            check.load()
            assert check.size == size and check.format == "WEBP"
        print(f"{name}: {size[0]}x{size[1]}, {destination.stat().st_size} bytes")


if __name__ == "__main__":
    main()
