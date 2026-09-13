from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any

app = FastAPI(
    title="KARIGAR AI Backend API",
    description="AI Engine Backend for Market Linkage and Smart Cataloging Mobile Application",
    version="1.0.0"
)

# Enable CORS for local Vite dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class EnhanceImageRequest(BaseModel):
    image_url: str

class TranscribeRequest(BaseModel):
    audio_data: Optional[str] = "demo"

class CostModel(BaseModel):
    rawMaterial: float
    labour: float
    packaging: float
    other: Optional[float] = 0

class RecommendPriceRequest(BaseModel):
    cost: CostModel
    category: Optional[str] = "Handbags"
    uniqueness: Optional[str] = "HIGH"
    demand: Optional[str] = "HIGH"

class CatalogGenerateRequest(BaseModel):
    transcript: str
    craft: Optional[str] = "Traditional Embroidery"
    material: Optional[str] = "Cotton"

class B2BMatchRequest(BaseModel):
    product_id: str
    buyer_budget_min: float
    buyer_budget_max: float
    quantity: int

# In-memory demo products database
products_db = [
    {
        "id": "prod-001",
        "title": "Handcrafted Cotton Bag with Traditional Embroidery",
        "description": "Exquisite cotton tote bag featuring traditional Marwari needlework embroidery. Handcrafted with reinforced cotton handles, inner zippered pouch, and eco-friendly organic canvas material.",
        "artisanId": "art-001",
        "artisanName": "Meena Devi",
        "location": "Jaipur, Rajasthan",
        "category": "Handbags",
        "material": "Cotton",
        "craft": "Traditional Embroidery",
        "color": "Multicolor / Beige",
        "originalImage": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
        "enhancedImage": "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
        "price": 999,
        "costBreakdown": {"rawMaterial": 450, "labour": 250, "packaging": 50, "other": 0, "totalProductionCost": 750},
        "stock": 38,
        "reserved": 12,
        "sold": 42,
        "demandScore": "HIGH",
        "uniquenessScore": "HIGH",
        "tags": ["#Handmade", "#CottonBag", "#IndianCraft", "#TraditionalEmbroidery", "#ArtisanMade"],
        "seoKeywords": ["Handcrafted cotton bag", "Indian handmade bag", "Traditional embroidered tote"],
        "listingQualityScore": 94,
        "imageQualityScore": {"visibility": 97, "lighting": 96, "background": 98},
        "gemReady": True,
        "hsnCode": "42022210",
        "gstRate": 12,
        "createdAt": "2026-09-01"
    },
    {
        "id": "prod-002",
        "title": "Pure Banarasi Silk Zari Dupatta",
        "description": "Handwoven pure silk dupatta adorned with elaborate gold zari floral bootis and woven border. Woven on traditional handlooms in Varanasi.",
        "artisanId": "art-002",
        "artisanName": "Ramesh Kumar",
        "location": "Varanasi, UP",
        "category": "Textiles",
        "material": "Silk",
        "craft": "Handloom Silk Weaving",
        "color": "Royal Magenta & Gold",
        "originalImage": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "enhancedImage": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "price": 3499,
        "costBreakdown": {"rawMaterial": 1800, "labour": 800, "packaging": 100, "other": 50, "totalProductionCost": 2750},
        "stock": 14,
        "reserved": 4,
        "sold": 28,
        "demandScore": "HIGH",
        "uniquenessScore": "HIGH",
        "tags": ["#SilkDupatta", "#BanarasiHandloom", "#ZariWork", "#VaranasiSilk"],
        "seoKeywords": ["Banarasi silk dupatta", "Handloom zari dupatta", "Varanasi silk scarf"],
        "listingQualityScore": 96,
        "imageQualityScore": {"visibility": 98, "lighting": 95, "background": 99},
        "gemReady": True,
        "hsnCode": "50072010",
        "gstRate": 5,
        "createdAt": "2026-08-25"
    }
]

inquiries_db = [
    {
        "id": "inq-101",
        "buyerName": "Vikramaditya Roy",
        "buyerCompany": "Heritage Hotels Pvt. Ltd.",
        "buyerLocation": "Udaipur, Rajasthan",
        "productId": "prod-001",
        "productTitle": "Handcrafted Cotton Bag with Traditional Embroidery",
        "quantityRequested": 200,
        "budgetPerUnit": {"min": 900, "max": 1100},
        "purpose": "Corporate Gifting & Guest Welcome Kits",
        "deliveryDays": 30,
        "status": "PENDING",
        "offeredPricePerUnit": 950,
        "aiMatchScore": 92,
        "matchReasons": [
            "Price fits buyer budget range (₹900 - ₹1,100)",
            "Artisan production capacity verified for 200 units in 30 days",
            "Authentic Jaipur craft matching heritage hotel theme",
            "High product quality score (94/100)"
        ],
        "createdAt": "2026-09-12T10:30:00Z"
    }
]

gem_opportunities_db = [
    {
        "id": "gem-201",
        "title": "Procurement of 500 Eco-Friendly Handcrafted Cotton Bags",
        "department": "Ministry of Textiles — Cottage Industries Division",
        "category": "Handicraft & Textile Articles",
        "quantityNeeded": 500,
        "estimatedBudgetPerUnit": 1000,
        "tenderDeadline": "2026-10-15",
        "aiMatchScore": 87,
        "matchReasons": [
            "Product specifications align 100% with HSN 42022210",
            "GST 12% compliant profile",
            "Meena Devi verified artisan credentials",
            "Production capacity capability verified"
        ],
        "specifications": [
            "100% natural cotton canvas",
            "Hand embroidery finish",
            "Reinforced shoulder straps",
            "Standard eco-friendly packaging"
        ],
        "status": "OPEN"
    }
]

@app.get("/")
def read_root():
    return {
        "status": "online",
        "app": "KARIGAR AI Backend API",
        "tagline": "From Craft to Commerce",
        "version": "1.0.0"
    }

@app.post("/api/image/enhance")
def enhance_image(req: EnhanceImageRequest):
    return {
        "enhancedUrl": "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
        "scores": {"visibility": 97, "lighting": 96, "background": 98},
        "steps": [
            "✓ Background cleaned & removed",
            "✓ Studio lighting corrected",
            "✓ Product centered & aligned",
            "✓ Soft shadow generated",
            "✓ E-commerce high-res crop"
        ]
    }

@app.post("/api/speech/transcribe")
def transcribe_speech(req: TranscribeRequest):
    return {
        "detectedLanguage": "Hindi (हिंदी)",
        "transcript": "यह हाथ से बनी हुई कॉटन की बैग है। इसमें ट्रेडिशनल कढ़ाई है और इसे बनाने में तीन दिन लगे हैं।",
        "translatedText": "This is a handcrafted cotton bag with traditional Marwari embroidery. It took 3 days to make.",
        "extractedInfo": {
            "product": "Handcrafted Cotton Bag",
            "material": "Cotton Canvas",
            "craft": "Traditional Marwari Embroidery",
            "productionTime": "3 Days",
            "color": "Multicolor / Beige"
        }
    }

@app.post("/api/catalog/generate")
def generate_catalog(req: CatalogGenerateRequest):
    return {
        "title": "Handcrafted Cotton Bag with Traditional Embroidery",
        "description": "Exquisite cotton tote bag featuring traditional Marwari needlework embroidery. Handcrafted with reinforced cotton handles, inner zippered pouch, and eco-friendly organic canvas material.",
        "category": "Handbags",
        "material": req.material or "Cotton",
        "craft": req.craft or "Traditional Embroidery",
        "color": "Multicolor / Beige",
        "tags": ["#Handmade", "#CottonBag", "#IndianCraft", "#TraditionalEmbroidery", "#ArtisanMade"],
        "seoKeywords": ["Handcrafted cotton bag", "Indian handmade bag", "Traditional embroidered tote"],
        "listingQualityScore": 94
    }

@app.post("/api/pricing/recommend")
def recommend_price(req: RecommendPriceRequest):
    total_cost = req.cost.rawMaterial + req.cost.labour + req.cost.packaging + (req.cost.other or 0)
    suggested_price = 999 if total_cost == 750 else int(round(total_cost * 1.33))
    profit = max(0, suggested_price - int(total_cost))
    margin = round((profit / suggested_price) * 100, 1)

    return {
        "suggestedPrice": suggested_price,
        "minPrice": int(total_cost * 1.15),
        "maxPrice": int(total_cost * 1.55),
        "expectedProfit": profit,
        "expectedMargin": margin,
        "comparableRange": {"min": int(total_cost * 1.2), "max": int(total_cost * 1.6)},
        "demandLevel": req.demand,
        "uniqueness": req.uniqueness,
        "materialTrend": "+4%",
        "explanation": f"₹{suggested_price} balances your production cost (₹{int(total_cost)}), comparable market range, product uniqueness ({req.uniqueness}) and current market demand ({req.demand}) while maintaining a competitive margin.",
        "competitiveness": "BALANCED"
    }

@app.get("/api/products")
def get_products():
    return products_db

@app.post("/api/products")
def create_product(product: Dict[str, Any]):
    product["id"] = f"prod-{len(products_db) + 1:03d}"
    products_db.append(product)
    return product

@app.get("/api/inquiries")
def get_inquiries():
    return inquiries_db

@app.get("/api/government/opportunities")
def get_gem_opportunities():
    return gem_opportunities_db

@app.get("/api/dashboard")
def get_dashboard():
    return {
        "artisan": "Meena Devi",
        "craft": "Handcrafted Textiles",
        "totalSales": 48750,
        "totalOrders": 42,
        "activeInquiries": 8,
        "digitalReadinessScore": 82
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
