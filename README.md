# KARIGAR AI (कारीगर AI) — From Craft to Commerce

> **AI-Driven Market Linkage & Smart Cataloging Application for Marginalized Indian Artisans**

---

## Executive Summary & Problem Statement

Government initiatives provide financial and institutional support to marginalized communities, micro-entrepreneurs, artisans, and weavers to establish small-scale manufacturing and handicraft businesses. However, traditional market exposure is largely restricted to temporary physical exhibitions and fairs (e.g. Shilp Samagam, Surajkund Mela, Dilli Haat).

Artisans face significant barriers:
- Low digital literacy & technical jargon
- Language barriers
- Inability to take professional e-commerce product photography
- Difficulty writing structured product descriptions & tags
- Lack of price transparency & market intelligence
- Exclusion from corporate B2B buyers and government procurement (GeM)

**KARIGAR AI** serves as an intuitive **"Virtual Business Manager"** that acts on a single core promise:
> *"An artisan should not need to learn e-commerce to participate in e-commerce."*

---

## Core Product Journey

```
PHOTO ➔ AI IMAGE ➔ VOICE ➔ LANGUAGE AI ➔ SMART CATALOG ➔ DYNAMIC PRICE ➔ MARKETPLACE ➔ B2B DEALS ➔ GeM READY
```

---

## Key Features

1. **AI Image Enhancer & Studio**: Interactive Before/After slider featuring background removal, studio lighting correction, composition centering, and an AI Image Quality Scorecard (Visibility: 97%, Lighting: 96%, Background: 98%).
2. **Multilingual Voice Auto-Cataloger**: Speech-to-text supporting native Hindi voice notes ("Ye haath se bani hui cotton ki bag hai..."), automatic language detection, translation, and structured metadata extraction (Material, Craft, Time).
3. **Smart Pricing Engine & Price Simulator**: Multi-signal pricing algorithm factoring production cost (₹450 raw material + ₹250 labour + ₹50 packaging = ₹750), market benchmarks (₹899–₹1,199), demand (+18%), and craft uniqueness to recommend **₹999** (₹249 profit, 24.9% margin) with transparent human rationale and an interactive price slider.
4. **B2B Bulk Deal & Negotiation Engine**: Direct corporate matching (e.g., Heritage Hotels 200-unit bulk request) paired with an AI negotiation assistant that suggests optimal counter-offers (e.g., ₹979/unit).
5. **Government Marketplace (GeM) Portal**: Structured specification builder ensuring compliance with HSN codes (42022210), GST rates (12%), and matching government procurement tender opportunities (500 units, 87% match).
6. **Multilingual AI Business Advisor ("Ask Karigar AI")**: Floating voice & text business mentor in Hindi and English.
7. **"From Craft to Commerce" WOW Presentation Screen**: Interactive 9-step pipeline visualization designed for hackathon demonstrations.

---

## Target Persona

- **Name**: Meena Devi
- **Location**: Jaipur, Rajasthan
- **Craft**: Handcrafted Textiles & Marwari Embroidery
- **Language**: Hindi
- **Business**: Traditional handcrafted bags and textile home decor

---

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS v4, Lucide React Icons, Canvas Confetti.
- **Backend API**: Python FastAPI (`backend/main.py`), Uvicorn, Pydantic, NumPy.
- **Color Palette**: Warm Ivory (`#FAF7F2`), Deep Indigo (`#1E1B4B`), Terracotta (`#C85A32`), Muted Gold (`#D4AF37`).
- **Reliability Guarantee**: Client-side fallback intelligence ensures 100% crash-free demonstration even if backend or external APIs are disconnected.

---

## How to Run

### 1. Start Frontend (Vite)
```bash
# Inside C:\Users\palak\.gemini\antigravity\scratch\karigar-ai
npm install
npm run dev
```
Open browser at `http://localhost:5173`.

### 2. Start Backend (FastAPI)
```bash
# Inside C:\Users\palak\.gemini\antigravity\scratch\karigar-ai
py -m uvicorn backend.main:app --reload --port 8000
```
API Documentation available at `http://localhost:8000/docs`.

---

## Presentation Walkthrough Script

1. **Artisan Login**: Click "Use Demo Artisan (Meena Devi)" -> inspect Dashboard insights & Digital Readiness score (82/100).
2. **Add Product**: Click "+ Add New Product" -> choose photo.
3. **AI Image Studio**: Drag the Before/After slider to inspect AI background removal & lighting score.
4. **Voice Description**: Tap "Tap to Speak (Play Demo Voice)" -> view real-time 5-layer NLP pipeline (Voice ➔ STT ➔ Lang Detect ➔ Translation ➔ Extracted Specs).
5. **Catalog Generator**: Review auto-generated title, description, tags, and listing quality score (94/100).
6. **Smart Pricing**: Input production costs (₹450 + ₹250 + ₹50 = ₹750) -> review market signals -> test Price Simulator slider -> confirm recommended ₹999 price.
7. **Publish Product**: Click "Publish Product" -> trigger confetti & view Product ID `KA-2026-001`.
8. **Buyer Marketplace**: Switch tab to "Buyer Marketplace" -> search "Handcrafted bag" -> inspect 92% AI Match Score.
9. **B2B Bulk Order**: Submit 200 unit inquiry from Heritage Hotels Pvt. Ltd.
10. **Artisan Notification**: Switch back to Artisan -> click "🔔 New B2B Opportunity" -> send AI counter-offer of ₹979/unit.
11. **GeM Portal**: Switch tab to "GeM-Ready Portal" -> view 500 unit government procurement opportunity match (87% match).
12. **Presentation WOW Screen**: Switch tab to "From Craft to Commerce" -> step through the interactive 9-node pipeline.
