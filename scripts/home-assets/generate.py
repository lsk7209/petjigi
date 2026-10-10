"""홈페이지 시안용 사진·일러스트 생성 스크립트 (Gemini 이미지 생성).

사용: python scripts/home-assets/generate.py [asset-name ...]
 - API 키는 ~/.claude/.env 의 GEMINI_API_KEY 에서만 읽고 출력하지 않는다.
 - 원본 PNG는 저장소 밖(RAW_DIR)에, 웹용 WebP만 public/images/home 에 저장한다.
 - 프롬프트에는 항상 글자·로고·UI 금지를 명시한다. 실제 병원·수의사·이용자 사진이 아닌 AI 생성물이다.
"""
import io
import os
import sys
from pathlib import Path

from google import genai
from google.genai import types
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
OUT_DIR = ROOT / "public" / "images" / "home"
RAW_DIR = Path(os.environ.get("HOME_ASSET_RAW_DIR", ROOT / ".home-assets-raw"))
MODEL = "gemini-3-pro-image-preview"
NO_TEXT = "No text, no letters, no numbers, no logos, no watermark, no UI elements, no borders."
PHOTO = "Photorealistic, natural soft daylight, warm cream and ivory tones, shallow depth of field, anatomically correct animals with natural paws, eyes and ears. "

# name: (aspect ratio, output width, prompt)
ASSETS = {
    "hero": ("16:9", 2400, PHOTO + "A golden retriever and a tabby cat cuddled together under a cream knit blanket on a bed by a bright window. The animals occupy the right 60% of the frame with the dog's face large and sharp; the left 35% of the frame is a calm, softly blurred warm ivory room with sheer curtains and very low detail so a headline can sit there. Cozy, gentle, joyful mood. " + NO_TEXT),
    "local-dog": ("4:3", 1200, PHOTO + "A friendly corgi sitting and smiling, three-quarter view, photographed against a perfectly flat solid pale peach background (#FBF1E7) with no floor line and no shadow on the background. " + NO_TEXT),
    "health-dog": ("4:3", 1200, PHOTO + "A fluffy white small dog (bichon frise) lying on a cozy beige knit throw looking at the camera, a few green plant leaves in the corner, background a flat soft pale sage (#EAF0E4), clean and airy. " + NO_TEXT),
    "memorial": ("4:3", 1400, PHOTO + "A field of white daisies with yellow centers in soft sunlight, gentle glow, soft focus background, calm and comforting, bright and airy, no dark tones. " + NO_TEXT),
    "message": ("4:3", 1200, "Flat warm illustration, soft shapes, simple outlines. A woman with a dark bun hugging a small cream dog tightly, seen from the side, gentle smiles, a small coral heart floating nearby. Background is a perfectly flat solid muted sage green (#6F9A79) with no texture. " + NO_TEXT),
    "thumb-health": ("4:3", 800, PHOTO + "A golden retriever calmly being examined by a veterinarian whose face is not shown (only hands and a stethoscope), bright clean clinic, soft light. " + NO_TEXT),
    "thumb-nutrition": ("4:3", 800, PHOTO + "A tabby cat eating from a white ceramic bowl of kibble on a light wooden floor, soft window light. " + NO_TEXT),
    "thumb-care": ("4:3", 800, PHOTO + "A happy corgi walking on a sunny park path with green trees blurred behind, joyful. " + NO_TEXT),
    "thumb-adoption": ("4:3", 800, PHOTO + "A sleeping orange kitten curled up on a soft cream blanket, peaceful. " + NO_TEXT),
    "thumb-insurance": ("4:3", 800, PHOTO + "A calm cat sitting beside a neat stack of blank paper documents and a pen on a bright wooden desk, no readable writing on any paper. " + NO_TEXT),
}


def load_key() -> str:
    if os.environ.get("GEMINI_API_KEY"):
        return os.environ["GEMINI_API_KEY"]
    for line in (Path.home() / ".claude" / ".env").read_text(encoding="utf-8").splitlines():
        if line.startswith("GEMINI_API_KEY="):
            return line.split("=", 1)[1].strip().strip('"')
    raise SystemExit("GEMINI_API_KEY 없음")


def crop_to_ratio(image: Image.Image, ratio: str) -> Image.Image:
    """SDK가 종횡비 지정을 지원하지 않으므로 생성 후 중앙을 기준으로 맞춘다."""
    w, h = (int(v) for v in ratio.split(":"))
    target = w / h
    if abs(image.width / image.height - target) < 0.01:
        return image
    if image.width / image.height > target:
        new_w = round(image.height * target)
        left = (image.width - new_w) // 2
        return image.crop((left, 0, left + new_w, image.height))
    new_h = round(image.width / target)
    top = (image.height - new_h) // 2
    return image.crop((0, top, image.width, top + new_h))


def generate(client: genai.Client, name: str) -> None:
    ratio, width, prompt = ASSETS[name]
    response = client.models.generate_content(
        model=MODEL,
        contents=f"{prompt} Compose for a {ratio} aspect ratio frame.",
        config=types.GenerateContentConfig(response_modalities=["IMAGE", "TEXT"]),
    )
    for part in response.candidates[0].content.parts:
        if getattr(part, "inline_data", None) and part.inline_data.data:
            RAW_DIR.mkdir(parents=True, exist_ok=True)
            (RAW_DIR / f"{name}.png").write_bytes(part.inline_data.data)
            image = Image.open(io.BytesIO(part.inline_data.data)).convert("RGB")
            image = crop_to_ratio(image, ratio)
            height = round(image.height * width / image.width)
            image = image.resize((width, height), Image.LANCZOS) if image.width > width else image
            OUT_DIR.mkdir(parents=True, exist_ok=True)
            image.save(OUT_DIR / f"{name}.webp", "WEBP", quality=82, method=6)
            print(f"{name}: {image.size} -> {(OUT_DIR / f'{name}.webp').stat().st_size // 1024}KB")
            return
    raise RuntimeError(f"{name}: 이미지 응답 없음")


if __name__ == "__main__":
    client = genai.Client(api_key=load_key())
    for asset in sys.argv[1:] or list(ASSETS):
        generate(client, asset)
