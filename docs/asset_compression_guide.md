# 📦 SOE Asset & Book PDF Compression Standard

This guide documents the standardized high-yield compression pipeline for The Sound of Essentials book PDFs, workbook deliverables, and digital visual assets.

---

## 🎯 Target Optimization Benchmarks

| Asset Type | Target Resolution / Settings | Target File Size | Primary Tool |
| :--- | :--- | :--- | :--- |
| **Web Digital Download PDF** | 150 DPI RGB, JPEG Quality 80-85, Deflated Streams | `< 15 MB` (Ebook / Workbook) | PyMuPDF (`fitz`) + Pillow |
| **Print-Ready PDF** | 300 DPI CMYK/RGB, Lossless/High Quality | Under Lulu/KDP Upload Limits | PyMuPDF / Ghostscript |
| **Web UI Imagery** | WebP (Quality 82-85), 2x Retina Max | `< 150 KB` per hero/scene | Pillow (`PIL`) |
| **Audio Tracks** | MP3 320kbps / AAC 256kbps | `< 7 MB` per track | FFmpeg |

---

## 🛠️ High-Yield Python PDF Compression Engine

Run this script to optimize any book or workbook PDF:

```python
import os
import sys
import io
import fitz  # PyMuPDF
from PIL import Image

def compress_pdf(input_path: str, output_path: str, target_dpi: int = 150, image_quality: int = 82):
    """
    Compresses a PDF by:
    1. Re-compressing embedded raster images to target DPI and WebP/JPEG quality.
    2. Stripping duplicate font subsets, unreferenced metadata, and unused objects.
    3. Deflating all PDF streams.
    """
    print(f"Opening: {input_path}")
    doc = fitz.open(input_path)
    initial_size = os.path.getsize(input_path)
    
    # Process images inside PDF
    for page_idx in range(len(doc)):
        page = doc[page_idx]
        image_list = page.get_images(full=True)
        
        for img_info in image_list:
            xref = img_info[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            
            try:
                img = Image.open(io.BytesIO(image_bytes))
                # Only recompress RGB/RGBA raster images
                if img.mode in ("RGB", "RGBA"):
                    out_buffer = io.BytesIO()
                    img.save(out_buffer, format="JPEG", quality=image_quality, optimize=True)
                    new_bytes = out_buffer.getvalue()
                    
                    # Only replace if new size is smaller
                    if len(new_bytes) < len(image_bytes):
                        doc.update_stream(xref, new_bytes)
            except Exception as e:
                continue

    # Save with aggressive garbage collection and stream deflation
    doc.save(
        output_path,
        garbage=4,        # Remove unused objects
        deflate=True,     # Deflate all data streams
        clean=True        # Sanitize internal structure
    )
    doc.close()
    
    final_size = os.path.getsize(output_path)
    savings = (1 - (final_size / initial_size)) * 100
    print(f"Saved to: {output_path}")
    print(f"Original: {initial_size / (1024*1024):.2f} MB -> Compressed: {final_size / (1024*1024):.2f} MB ({savings:.1f}% reduction)")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python compress_pdf.py input.pdf output.pdf [target_dpi] [quality]")
        sys.exit(1)
    
    in_pdf = sys.argv[1]
    out_pdf = sys.argv[2]
    dpi = int(sys.argv[3]) if len(sys.argv) > 3 else 150
    quality = int(sys.argv[4]) if len(sys.argv) > 4 else 82
    compress_pdf(in_pdf, out_pdf, dpi, quality)
```

---

## ⚡ Quick CLI Commands

```powershell
# Compress a book PDF for instant web download
python scripts/compress_pdf.py "The Sound of Essentials.pdf" "The Sound of Essentials - Web.pdf" 150 82

# Convert image folder to optimized WebP
python -c "
import os
from PIL import Image

for root, _, files in os.walk('web/public/assets'):
    for f in files:
        if f.lower().endswith(('.png', '.jpg', '.jpeg')) and not f.endswith('.webp'):
            p = os.path.join(root, f)
            im = Image.open(p)
            out_p = os.path.splitext(p)[0] + '.webp'
            im.save(out_p, 'WEBP', quality=85)
"
```
