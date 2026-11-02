# Reusable popup image prompts

These adapt the premium product-banner prompt in `BANNER-DIRECTION.md`.
Unlike a product banner, **use the whole image**: popup text is a separate
content panel. No empty left third is needed. Generate one image per prompt,
not a grid. Export each as a 1200×900 WebP (4:3), ideally under 150 KB.
The popup uses `object-contain`, so the entire artwork stays visible.

## New: popup-offer-new.webp

> Create one standalone premium promotional scene for a fresh software offer.
> Landscape 4:3. Use the full frame with a clear central fresh burst of rising
> sculptural shapes, delicate sparkles and translucent glass elements. Keep
> generous safe margins around the subject so it remains recognizable in a
> small mobile image. Use polished photographic studio lighting, realistic
> materials and a restrained, vivid cyan-to-green palette matching fresh cyan
> and bright green. Make it energetic, optimistic and eye-catching without
> clutter. This is generic year-round artwork, not a launch date or a specific
> festival. No devices are required. No text, logos, prices, numbers, dates,
> countdowns, watermarks or CTA graphics. No diyas, Santa or occasion-specific
> fireworks. Deliver one cohesive image, not a collage.

Upload to `tempAssets/popup-offer-new.webp` under the shared ImageKit origin.

## Hot: popup-offer-hot.webp

> Create one standalone premium promotional scene for a bold software offer.
> Landscape 4:3. Use the full frame with a clear central composition of dynamic
> sculptural ribbons and rising geometric shapes that suggest momentum and
> urgency without warning symbols. Keep generous safe margins and a clean,
> instantly readable silhouette for small mobile previews. Use polished
> photographic studio lighting, realistic glossy materials and a restrained,
> vivid coral-red-to-orange palette. Make it confident, energetic and
> eye-catching without clutter. This is generic year-round artwork, not a
> sale date or a specific festival. No devices are required. No text, logos,
> prices, numbers, dates, countdowns, watermarks or CTA graphics. No diyas,
> Santa or occasion-specific fireworks. Deliver one cohesive image, not a collage.

Upload to `tempAssets/popup-offer-hot.webp` under the shared ImageKit origin.

## Festive: popup-offer-festive.webp

> Create one standalone premium promotional scene for a celebratory software
> offer that works in any month. Landscape 4:3. Use the full frame with a
> clearly composed central flourish of sculptural ribbons, sparse floating
> confetti and soft studio lights. Keep generous safe margins and a strong,
> uncluttered silhouette for a small mobile preview. Use polished photographic
> lighting, realistic satin and metallic materials and a restrained, vivid
> magenta-to-gold palette. Make it joyful, premium and eye-catching without
> tying it to any culture, religious festival or date. No devices are required.
> No text, logos, prices, numbers, dates, countdowns, watermarks or CTA graphics.
> No diyas, Santa or occasion-specific fireworks. Deliver one cohesive image,
> not a collage.

Upload to `tempAssets/popup-offer-festive.webp` under the shared ImageKit origin.

## Contact: existing photograph, no generation needed

`popupImages.contact` in `src/data/offer.ts` reuses the existing office image
at `tempAssets/dubai.webp`. The contact popup adds a 60% dark overlay for white
text. If that image cannot load, its dark fallback keeps the text legible.

## Current placeholders and editing

**TODO:** The three offer images are not uploaded yet. Their reserved ImageKit
URLs are in `src/data/offer.ts`; until an image loads, the art panel shows a
simple gradient in its tone colors. No local image copies are needed.
The file imports the existing `Assetsbaseurl` as `ASSETS_BASE_URL`, so there is
still only one configured ImageKit origin. Upload the real images to these paths
(or edit the four `popupImages` entries in that same file).
