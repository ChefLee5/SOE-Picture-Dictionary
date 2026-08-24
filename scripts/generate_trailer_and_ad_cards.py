import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_gradient_bg(width, height, top_color, bottom_color):
    """Creates a smooth vertical 2-color gradient."""
    base = Image.new('RGBA', (width, height), top_color)
    top_r, top_g, top_b = top_color[:3]
    bot_r, bot_g, bot_b = bottom_color[:3]
    
    draw = ImageDraw.Draw(base)
    for y in range(height):
        factor = y / float(height)
        r = int(top_r + factor * (bot_r - top_r))
        g = int(top_g + factor * (bot_g - top_g))
        b = int(top_b + factor * (bot_b - top_b))
        draw.line([(0, y), (width, y)], fill=(r, g, b, 255))
    return base

def draw_text_centered(draw, text, font, box, fill_color, spacing=10):
    """Draws centered text within a bounding box (x1, y1, x2, y2)."""
    x1, y1, x2, y2 = box
    bbox = draw.textbbox((0, 0), text, font=font, spacing=spacing, align='center')
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    x = x1 + (x2 - x1 - w) / 2
    y = y1 + (y2 - y1 - h) / 2
    draw.text((x, y), text, font=font, fill=fill_color, spacing=spacing, align='center')
    return (x, y, w, h)

def generate_stat_card_44m(width, height, output_path, font_path):
    img = Image.new('RGBA', (width, height), (0, 0, 0, 255))
    draw = ImageDraw.Draw(img)
    
    # Scale font sizes relative to height
    scale = height / 1080.0
    
    font_eyebrow = ImageFont.truetype(font_path, int(28 * scale))
    font_number = ImageFont.truetype(font_path, int(112 * scale))
    font_main = ImageFont.truetype(font_path, int(48 * scale))
    font_sub = ImageFont.truetype(font_path, int(26 * scale))
    
    red_color = (224, 16, 32, 255)      # #E01020 Emergency Red
    white_color = (255, 255, 255, 255)
    gray_color = (160, 160, 152, 255)   # #A0A098
    
    center_x = width // 2
    center_y = height // 2
    
    # Eyebrow Pill
    eyebrow_text = "GLOBAL LITERACY EMERGENCY"
    eb_bbox = draw.textbbox((0, 0), eyebrow_text, font=font_eyebrow)
    eb_w = eb_bbox[2] - eb_bbox[0]
    eb_h = eb_bbox[3] - eb_bbox[1]
    
    pill_pad_x = int(24 * scale)
    pill_pad_y = int(8 * scale)
    pill_y = int(center_y - 240 * scale)
    pill_box = [
        center_x - eb_w // 2 - pill_pad_x,
        pill_y - pill_pad_y,
        center_x + eb_w // 2 + pill_pad_x,
        pill_y + eb_h + pill_pad_y
    ]
    draw.rounded_rectangle(pill_box, radius=int(20 * scale), outline=red_color, width=max(2, int(2 * scale)))
    draw.text((center_x - eb_w // 2, pill_y), eyebrow_text, font=font_eyebrow, fill=red_color)
    
    # Number: 44 MILLION
    num_text = "44 MILLION"
    num_bbox = draw.textbbox((0, 0), num_text, font=font_number)
    num_w = num_bbox[2] - num_bbox[0]
    num_y = int(center_y - 120 * scale)
    draw.text((center_x - num_w // 2, num_y), num_text, font=font_number, fill=red_color)
    
    # Main Line: TEACHERS SHORT WORLDWIDE
    main_text = "TEACHERS SHORT WORLDWIDE"
    main_bbox = draw.textbbox((0, 0), main_text, font=font_main)
    main_w = main_bbox[2] - main_bbox[0]
    main_y = int(center_y + 40 * scale)
    draw.text((center_x - main_w // 2, main_y), main_text, font=font_main, fill=white_color)
    
    # Source / Subtext
    sub_text = "UNESCO Global Teacher Report · The pathway is broken."
    sub_bbox = draw.textbbox((0, 0), sub_text, font=font_sub)
    sub_w = sub_bbox[2] - sub_bbox[0]
    sub_y = int(center_y + 160 * scale)
    draw.text((center_x - sub_w // 2, sub_y), sub_text, font=font_sub, fill=gray_color)
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img.save(output_path, "PNG", optimize=True)
    print(f"Generated: {output_path} ({width}x{height})")

def generate_stat_card_300m(width, height, output_path, font_path):
    img = Image.new('RGBA', (width, height), (0, 0, 0, 255))
    draw = ImageDraw.Draw(img)
    
    scale = height / 1080.0
    
    font_eyebrow = ImageFont.truetype(font_path, int(28 * scale))
    font_number = ImageFont.truetype(font_path, int(112 * scale))
    font_main = ImageFont.truetype(font_path, int(48 * scale))
    font_sub = ImageFont.truetype(font_path, int(26 * scale))
    
    red_color = (224, 16, 32, 255)
    white_color = (255, 255, 255, 255)
    gray_color = (160, 160, 152, 255)
    
    center_x = width // 2
    center_y = height // 2
    
    # Eyebrow Pill
    eyebrow_text = "FOUNDATIONAL LEARNING CRISIS"
    eb_bbox = draw.textbbox((0, 0), eyebrow_text, font=font_eyebrow)
    eb_w = eb_bbox[2] - eb_bbox[0]
    eb_h = eb_bbox[3] - eb_bbox[1]
    
    pill_pad_x = int(24 * scale)
    pill_pad_y = int(8 * scale)
    pill_y = int(center_y - 240 * scale)
    pill_box = [
        center_x - eb_w // 2 - pill_pad_x,
        pill_y - pill_pad_y,
        center_x + eb_w // 2 + pill_pad_x,
        pill_y + eb_h + pill_pad_y
    ]
    draw.rounded_rectangle(pill_box, radius=int(20 * scale), outline=red_color, width=max(2, int(2 * scale)))
    draw.text((center_x - eb_w // 2, pill_y), eyebrow_text, font=font_eyebrow, fill=red_color)
    
    # Number: 300 MILLION
    num_text = "300 MILLION"
    num_bbox = draw.textbbox((0, 0), num_text, font=font_number)
    num_w = num_bbox[2] - num_bbox[0]
    num_y = int(center_y - 120 * scale)
    draw.text((center_x - num_w // 2, num_y), num_text, font=font_number, fill=red_color)
    
    # Main Line: CHILDREN FALLING BEHIND
    main_text = "CHILDREN FALLING BEHIND"
    main_bbox = draw.textbbox((0, 0), main_text, font=font_main)
    main_w = main_bbox[2] - main_bbox[0]
    main_y = int(center_y + 40 * scale)
    draw.text((center_x - main_w // 2, main_y), main_text, font=font_main, fill=white_color)
    
    # Source / Subtext
    sub_text = "World Bank & UNESCO · But children are not the problem."
    sub_bbox = draw.textbbox((0, 0), sub_text, font=font_sub)
    sub_w = sub_bbox[2] - sub_bbox[0]
    sub_y = int(center_y + 160 * scale)
    draw.text((center_x - sub_w // 2, sub_y), sub_text, font=font_sub, fill=gray_color)
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img.save(output_path, "PNG", optimize=True)
    print(f"Generated: {output_path} ({width}x{height})")

def generate_end_card_shot13(width, height, output_path, font_path, logo_path):
    # Deep Navy gradient #001838 to #001030
    img = create_gradient_bg(width, height, (0, 24, 56, 255), (0, 16, 48, 255))
    draw = ImageDraw.Draw(img)
    scale = height / 1080.0
    
    center_x = width // 2
    center_y = height // 2
    
    # Add Logo
    if os.path.exists(logo_path):
        logo = Image.open(logo_path).convert('RGBA')
        logo_h = int(280 * scale)
        logo_w = int(logo.width * (logo_h / float(logo.height)))
        logo = logo.resize((logo_w, logo_h), Image.LANCZOS)
        logo_x = center_x - logo_w // 2
        logo_y = int(center_y - 200 * scale)
        img.paste(logo, (logo_x, logo_y), logo)
    
    font_tagline = ImageFont.truetype(font_path, int(38 * scale))
    font_sub = ImageFont.truetype(font_path, int(26 * scale))
    
    gold_highlight = (248, 232, 112, 255) # #F8E870
    gold_mid = (248, 200, 56, 255)       # #F8C838
    cream = (248, 248, 240, 255)          # #F8F8F0
    
    tagline_text = "Free Learning Album + Companion Storybook"
    tag_bbox = draw.textbbox((0, 0), tagline_text, font=font_tagline)
    tag_w = tag_bbox[2] - tag_bbox[0]
    tag_y = int(center_y + 130 * scale)
    draw.text((center_x - tag_w // 2, tag_y), tagline_text, font=font_tagline, fill=gold_mid)
    
    sub_text = "Join our Rhythm Quest · TheSoundofEssentials.com"
    sub_bbox = draw.textbbox((0, 0), sub_text, font=font_sub)
    sub_w = sub_bbox[2] - sub_bbox[0]
    sub_y = int(center_y + 210 * scale)
    draw.text((center_x - sub_w // 2, sub_y), sub_text, font=font_sub, fill=cream)
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img.save(output_path, "PNG", optimize=True)
    print(f"Generated: {output_path} ({width}x{height})")

def main():
    font = 'web/public/assets/fonts/Fredoka-VariableFont_wdth,wght.ttf'
    logo = 'web/public/assets/soe-official-logo.png'
    
    sizes = [
        ('16x9', 1920, 1080),
        ('1x1', 1080, 1080),
        ('9x16', 1080, 1920)
    ]
    
    for label, w, h in sizes:
        generate_stat_card_44m(w, h, f'web/public/assets/marketing/ads/stat_card_44m_teachers_{label}.png', font)
        generate_stat_card_300m(w, h, f'web/public/assets/marketing/ads/stat_card_300m_children_{label}.png', font)
        generate_end_card_shot13(w, h, f'web/public/assets/marketing/ads/soe_trailer_end_card_{label}.png', font, logo)

if __name__ == '__main__':
    main()
