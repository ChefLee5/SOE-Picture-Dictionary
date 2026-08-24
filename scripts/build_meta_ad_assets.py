import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_1x1_square(source_img_path, output_path, badge_text=None, title_overlay=None, font_path=None):
    """Crops/fits image into a 1080x1080 canvas with optional Fredoka badge and branding."""
    canvas = Image.new('RGB', (1080, 1080), (255, 248, 240)) # #FFF8F0 Cream
    
    if os.path.exists(source_img_path):
        src = Image.open(source_img_path).convert('RGB')
        
        # Calculate aspect ratio crop or fit
        src_w, src_h = src.size
        aspect = src_w / float(src_h)
        
        if aspect > 1.0: # Landscape
            new_h = 1080
            new_w = int(src_w * (1080 / float(src_h)))
            src_resized = src.resize((new_w, new_h), Image.LANCZOS)
            offset_x = (new_w - 1080) // 2
            canvas = src_resized.crop((offset_x, 0, offset_x + 1080, 1080))
        elif aspect < 1.0: # Portrait
            new_w = 1080
            new_h = int(src_h * (1080 / float(src_w)))
            src_resized = src.resize((new_w, new_h), Image.LANCZOS)
            offset_y = (new_h - 1080) // 2
            canvas = src_resized.crop((0, offset_y, 1080, offset_y + 1080))
        else: # Square
            canvas = src.resize((1080, 1080), Image.LANCZOS)
            
    # Add subtle bottom vignette/gradient for text readability if title overlay present
    draw = ImageDraw.Draw(canvas)
    
    if font_path and os.path.exists(font_path):
        font_badge = ImageFont.truetype(font_path, 32)
        font_title = ImageFont.truetype(font_path, 46)
        
        # Top-left Floating Badge Pill
        if badge_text:
            bbox = draw.textbbox((0, 0), badge_text, font=font_badge)
            bw = bbox[2] - bbox[0]
            bh = bbox[3] - bbox[1]
            pad_x, pad_y = 28, 14
            x, y = 48, 48
            pill_box = [x, y, x + bw + pad_x * 2, y + bh + pad_y * 2]
            
            # Draw translucent pill
            overlay = Image.new('RGBA', (1080, 1080), (0, 0, 0, 0))
            overlay_draw = ImageDraw.Draw(overlay)
            overlay_draw.rounded_rectangle(pill_box, radius=24, fill=(0, 24, 56, 220), outline=(248, 200, 56, 255), width=2)
            overlay_draw.text((x + pad_x, y + pad_y - 2), badge_text, font=font_badge, fill=(248, 232, 112, 255))
            
            canvas = Image.alpha_composite(canvas.convert('RGBA'), overlay).convert('RGB')
            draw = ImageDraw.Draw(canvas)

        # Bottom Title Overlay Banner
        if title_overlay:
            overlay = Image.new('RGBA', (1080, 1080), (0, 0, 0, 0))
            overlay_draw = ImageDraw.Draw(overlay)
            
            # Bottom gradient bar
            bar_y = 920
            overlay_draw.rectangle([0, bar_y, 1080, 1080], fill=(0, 24, 56, 230))
            overlay_draw.line([(0, bar_y), (1080, bar_y)], fill=(248, 200, 56, 255), width=3)
            
            tbox = overlay_draw.textbbox((0, 0), title_overlay, font=font_title)
            tw = tbox[2] - tbox[0]
            tx = (1080 - tw) // 2
            overlay_draw.text((tx, bar_y + 45), title_overlay, font=font_title, fill=(255, 255, 255, 255))
            
            canvas = Image.alpha_composite(canvas.convert('RGBA'), overlay).convert('RGB')

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    canvas.save(output_path, "JPEG", quality=88, optimize=True)
    print(f"Built Ad Asset: {output_path}")

def main():
    font = 'web/public/assets/fonts/Fredoka-VariableFont_wdth,wght.ttf'
    out_dir = 'web/public/assets/marketing/meta-ads'
    os.makedirs(out_dir, exist_ok=True)

    # 1. Ad 01 - The Enemy (Before/After)
    create_1x1_square(
        'web/public/assets/marketing/meta-ads/ad01_the_enemy_before_after.jpg',
        f'{out_dir}/ad01_the_enemy_before_after.jpg',
        badge_text='Ages 2–7 • Anti-Cocomelon',
        font_path=font
    )

    # 2. Ad 02 - What They Took (Testing vs Arts)
    create_1x1_square(
        'web/public/assets/marketing/ads/stat_card_44m_teachers_1x1.png',
        f'{out_dir}/ad02_what_they_took.jpg',
        badge_text='Global Education Crisis',
        font_path=font
    )

    # 3. Ad 03 - The Other Side (Harmonia)
    create_1x1_square(
        'web/public/assets/lands/harmonia.webp',
        f'{out_dir}/ad03_the_other_side_harmonia.jpg',
        badge_text='19 Free Songs • Land of Harmonia',
        title_overlay='Phonics, Music & Movement Quest',
        font_path=font
    )

    # 4. Ad 04 - The Name (Seriphia)
    create_1x1_square(
        'web/public/assets/marketing/seriphia-seven-lands-square.webp',
        f'{out_dir}/ad04_the_name_seriphia.jpg',
        badge_text='Built for Brains, Not Algorithms',
        title_overlay='The Sound of Essentials',
        font_path=font
    )

    # 5. Ad 05 - Victory Garden (Terrasol)
    create_1x1_square(
        'web/public/assets/lands/terrasol.webp',
        f'{out_dir}/ad05_victory_garden_terrasol.jpg',
        badge_text='Living Room Learning Sanctuary',
        title_overlay='16 Mins / Day · Zero Screen Fatigue',
        font_path=font
    )

    # 6. Ad 06 - Trojan Horse (Vitalis Phonics)
    create_1x1_square(
        'web/public/assets/lands/vitalis.webp',
        f'{out_dir}/ad06_trojan_horse_vitalis.jpg',
        badge_text='Secret Backdoor to Reading',
        title_overlay='Ages 2–7 · Phonics & Motor Rhythm',
        font_path=font
    )

    # 7. Ad 07 - Numeria Rhythm Math
    create_1x1_square(
        'web/public/assets/lands/numeria.webp',
        f'{out_dir}/ad07_numeria_counting_stem.jpg',
        badge_text='Skip Counting & Math Quest',
        title_overlay='Rhythm Math That Clicks',
        font_path=font
    )

    # 8. Ad 08 - Official Quest Book Hero
    create_1x1_square(
        'web/public/assets/marketing/soe-storybook-cover.webp',
        f'{out_dir}/ad08_official_quest_book_hero.jpg',
        badge_text='100% Free 19-Track Album',
        title_overlay='Instant Digital Access',
        font_path=font
    )

    # 9. Ad 09 - Aquaria Emotional Calm
    create_1x1_square(
        'web/public/assets/lands/aquaria.webp',
        f'{out_dir}/ad09_aquaria_ronan_nerissa.jpg',
        badge_text='Emotional Literacy & Calm',
        title_overlay='Somatic Grounding & Melodies',
        font_path=font
    )

    # 10. Ad 10 - Crystal Creek Routine ($21 Workbook)
    create_1x1_square(
        'web/public/assets/marketing/summer-stretch-cover.webp',
        f'{out_dir}/ad10_crystal_creek_routine.jpg',
        badge_text='8-Week Readiness Quest ($21)',
        title_overlay='40 Days of Hands-On Learning',
        font_path=font
    )

if __name__ == '__main__':
    main()
