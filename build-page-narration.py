"""Create offline speech text from the Figma PNGs using Windows OCR."""

import json
import re
import subprocess
from pathlib import Path

from PIL import Image


root = Path(__file__).resolve().parent
source = (root / "figma-reader.js").read_text(encoding="utf-8")
pages = re.findall(r"\['([^']+)', '[^']+', '([^']+\.png)'\]", source)
narration = {}

try:
    for index, (page_id, filename) in enumerate(pages):
        if index < 3 or index == len(pages) - 1:
            continue
        image = Image.open(root / "assets" / "images" / "figma-frames" / filename)
        passages = []
        for half, bounds in enumerate(((0, 0, image.width // 2, image.height),
                                       (image.width // 2, 0, image.width, image.height))):
            crop = root / f".narration-crop-{half}.png"
            image.crop(bounds).save(crop)
            result = subprocess.run(
                ["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-File",
                 str(root / "extract-page-text.ps1"), "-ImagePath", str(crop)],
                capture_output=True, text=True, encoding="utf-8", errors="replace", check=True,
            )
            passages.append(re.sub(r"\s+", " ", result.stdout).strip())
        narration[page_id] = " ".join(part for part in passages if part)
        print(f"{index + 1:02d} {page_id}: {len(narration[page_id])} caracteres", flush=True)
finally:
    for half in (0, 1):
        (root / f".narration-crop-{half}.png").unlink(missing_ok=True)

output = root / "page-narration.js"
output.write_text(
    "// Texto obtido por OCR das exportações do Figma para leitura em voz alta.\n"
    "window.IDIBI_PAGE_NARRATION = " + json.dumps(narration, ensure_ascii=False, indent=2) + ";\n",
    encoding="utf-8",
)
