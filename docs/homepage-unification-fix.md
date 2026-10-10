# Bonga Bhengu App — Homepage Unification Fix

Target: existing Bonga Bhengu App homepage. Do not create a second app, duplicate hero, overlay, or independent OS screen.

## Required correction
- Render exactly one header, one hero, and one main content root.
- Remove duplicate stacked homepage layers and duplicated navigation.
- Ensure normal Android viewport scaling (`width=device-width, initial-scale=1`), no forced zoom and no horizontal overflow.
- Use responsive width (`width:100%; max-width:100%`), `box-sizing:border-box`, responsive grids, and sensible vertical spacing.
- Keep Mall, Seller and Admin as navigable views within the same existing application.
- Preserve existing Digital Studio, AI employees, seller and admin features and routes.
- Apply premium black #0B0B0B, gold #D4AF37 and action blue #2F6BFF consistently.
- Use the approved premium mobile homepage visual from the design conversation as a reference; do not paste the whole screenshot as a nonfunctional homepage.
- Check at Android mobile widths 360px and 412px and desktop widths, and verify scrolling, touch targets, tabs and no overlaps.

## Deployment
The domain bongabhenguos.online has been described as a redirect to the existing ChatGPT site. Verify the actual source and deployment link before claiming this GitHub change updates the live site.

Status: implementation specification only; no production UI code or image asset has been changed by this document.
