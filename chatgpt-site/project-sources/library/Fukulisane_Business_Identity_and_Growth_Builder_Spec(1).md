# Fukulisane — Business Identity Search & Digital Visibility Growth Builder

## Purpose

Add a Business Identity Search step to Fukulisane so that when a user enters a common name, the system does not assume the first result is the correct business/person.

Fukulisane should search multiple permitted sources, present approximately 4–5 likely matches, let the user select the correct one, confirm the discovered digital profiles, and then create a central Business Master File. That file becomes the foundation for the Digital Visibility Growth Builder.

## 1. Search Flow

### Step 1 — Enter a name

Example:

> Bonga Bhengu

Optional information that can improve matching:
- City/location
- Country
- Business/company name
- Industry
- Website
- Phone number
- Email
- Social profile

Optional fields should not be required.

### Step 2 — Multi-source search

Search across connected and permitted sources, potentially including:
- Google Search / Google business data where API access permits
- Google Maps / Google Business Profile data where API access permits
- Microsoft/Bing search services that are currently available
- OpenAI web search
- Anthropic/Claude web search
- Google Gemini with Google Search
- Public business websites
- Public social/profile pages where access and platform rules permit

Use a replaceable provider/connector architecture so a search provider can be changed without rebuilding the whole application.

Do not scrape or collect data in violation of provider terms, API rules, robots rules, privacy requirements, or licensing restrictions.

## 2. Candidate Selection

For a common name, show approximately 4–5 likely matches.

Example:

### Which Bonga Bhengu is your business?

**Match 1**
- Name: Bonga Bhengu
- Location: Cape Town
- Business/company: ABC Consulting
- Industry: Consulting
- Website: example.co.za
- Google presence: Found
- LinkedIn: Found
- Facebook: Found

**Match 2**
- Name: Bonga Bhengu
- Location: Johannesburg
- Company: XYZ Solutions
- Industry: Marketing
- LinkedIn: Found

**Match 3**
- Name: Bonga Bhengu
- Location: Durban
- Business: Bhengu Trading
- Facebook: Found
- Website: Found

**Match 4**
- Name: Bonga Bhengu
- Location: KwaZulu-Natal
- Website: Found
- Google presence: Found

Actions:
- Select This Business
- None of These
- Search Again

Never silently select a person/business when multiple plausible matches exist.

## 3. Match Confidence

Calculate a simple confidence level using available signals such as:
- Exact name
- Business name
- Location
- Website/domain
- Phone
- Email/domain
- Industry
- Social profile
- Google business information
- Cross-source agreement

Show a simple explanation, for example:

> High match — name, location, website and business information agree across multiple sources.

Do not expose unnecessary technical scoring details to the user.

## 4. Profile Confirmation

After a candidate is selected, show discovered digital assets.

Example:

### We found these online profiles

✓ Website  
✓ Google Business Profile  
✓ Facebook  
✓ Instagram  
✓ LinkedIn  
✓ YouTube

Ask:

> Do these profiles belong to your business?

Actions:
- Confirm & Analyse
- Edit Selection
- Remove Incorrect Profile

The user must be able to remove incorrectly matched profiles before analysis.

## 5. Business Master File

After confirmation, create one central Business Master File.

### Identity
- Business/person name
- Business name
- Industry
- Location
- Country
- Description

### Contact
- Phone
- Email
- Website
- Address
- Opening hours

### Digital assets
- Website
- Google Business Profile
- Facebook
- Instagram
- LinkedIn
- TikTok
- YouTube
- Other discovered profiles

### Public visibility evidence
- Search results
- Search appearances
- Business listings
- Public profile information
- Review information where legally/API permitted
- Public content
- Source URLs/references
- Discovery date/time

Important: store the source/provider and discovery timestamp for important data items.

## 6. Digital Visibility Growth Builder

The Business Master File becomes the input to the Digital Visibility Growth Builder.

Core flow:

Business Search → Candidate Selection → Profile Confirmation → Business Master File → Public Visibility Score → Digital Visibility Growth Builder

The Growth Builder should identify opportunities across:
1. Website
2. Google/local presence
3. Social media
4. SEO
5. Content
6. Branding
7. Reviews/reputation
8. Contact/conversion
9. Business information consistency
10. Digital presence gaps

## 7. Growth Recommendations

Convert the visibility analysis into prioritized actions.

Example:

### Digital Visibility Score: 48/100

**Website — 35/100**
- Missing service pages
- Weak SEO information
- No clear WhatsApp call-to-action

**Social — 31/100**
- Instagram profile incomplete
- Low recent content activity

**Google — 52/100**
- Business description needs improvement
- Missing/limited services
- More recent photos recommended

Primary action:

**Build My Growth Plan**

## 8. Builder Modules

The Digital Visibility Growth Builder should connect to:
- Website Builder
- Business Profile Builder
- SEO Builder
- Google Growth
- Social Content Builder
- Image/Creative Builder
- Video/Content Builder
- Review/Reputation Builder
- Publishing/Distribution
- Reporting
- Rescoring

All modules should reuse the Business Master File rather than asking the user to re-enter the same information.

## 9. Website Builder

When Website Builder is opened, automatically use verified information from the Business Master File.

Generate, where appropriate:
- Home
- About
- Services
- Products
- Gallery
- Reviews
- Contact
- Location/map
- WhatsApp/contact CTA
- SEO metadata

The user must be able to edit the generated website before publishing.

## 10. Continuous Improvement Loop

Support this complete cycle:

Search → Identify → Confirm → Score → Find gaps → Build → Publish → Improve → Rescan → Rescore

Show measurable change, for example:

**Before:** 48/100  
**After:** 72/100  
**Improvement:** +24 points

Show which completed actions contributed to improvement.

## 11. Architecture Requirements

Build this as a module inside the existing Fukulisane application, not as a separate unrelated application.

Requirements:
- Reuse existing authentication.
- Reuse existing business/customer records.
- Reuse existing visibility-score system where available.
- Create a central Business Master File/data model.
- Create a provider/connector layer for search sources.
- Allow individual search providers to be enabled/disabled.
- Keep API keys and secrets server-side.
- Store source/provider information with collected data.
- Prevent duplicate businesses/profiles.
- Allow manual correction by the business owner.
- Keep an audit trail of important changes.
- Make it easy to add additional search providers later.

## 12. Data and Privacy Rules

Clearly distinguish between:
- Publicly discoverable information
- User-confirmed business information
- Connected/authorized account data

Do not claim that a profile belongs to a business until the user confirms it or an appropriate authorized connection establishes it.

Do not expose private personal information.

Do not bypass login systems, paywalls, CAPTCHAs, API restrictions, or platform protections.

Respect the terms, API policies, privacy requirements, and licensing rules of every connected source.

## 13. Primary User Experience

### FIND YOUR BUSINESS

Enter your business/person name:

[ Bonga Bhengu ]

[ Search ]

↓

### WE FOUND 5 POSSIBLE MATCHES

Show candidate cards.

↓

### SELECT YOUR BUSINESS

[ Select ]

↓

### CONFIRM YOUR DIGITAL PRESENCE

[✓ Website] [✓ Google] [✓ Facebook] [✓ Instagram] [✓ LinkedIn]

[ Confirm & Analyse ]

↓

### YOUR DIGITAL VISIBILITY SCORE

48 / 100

[ Build My Growth Plan ]

↓

### DIGITAL VISIBILITY GROWTH BUILDER

Prioritized actions + Website Builder + Content + Social + Google + SEO + Reputation

↓

### RESCAN & MEASURE

Before 48 → After 72

## 14. Product Principle

Fukulisane should not simply be a dashboard that reports problems.

It should move the customer from:

**Discovery → Verification → Diagnosis → Action → Execution → Measurement → Growth**

The Digital Visibility Growth Builder is the central module that turns initial search data into actual business growth work.
