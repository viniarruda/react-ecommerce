export interface BrandingConfig {
  store: {
    name: string;
    tagline: string;
    description: string;
    logoText: string;
    logoAbbrev: string;
    logoUrl?: string;
  };
  contact: {
    email: string;
    phone?: string;
    address?: string;
  };
  locale: {
    language: string;
    currency: string;
  };
  shipping: {
    freeShippingThreshold: number;
    standardFee: number;
    expressFee: number;
    overnightFee: number;
    standardDays: string;
    expressDays: string;
    overnightCutoff: string;
    internationalDays: string;
    processingCutoff: string;
  };
  policies: {
    returnWindowDays: number;
    refundProcessingDays: string;
    refundCreditDays: string;
  };
  social: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
  features: {
    newsletter: boolean;
    reviews: boolean;
    wishlist: boolean;
    darkMode: boolean;
  };
  theme: {
    primaryColor: string;
    primaryColorDark: string;
  };
}

export const branding: BrandingConfig = {
  store: {
    name: "Berzerk",
    tagline: "Best Online Shopping Experience",
    description: "Shop the latest products at unbeatable prices.",
    logoText: "Berzerk",
    logoAbbrev: "BK",
  },
  contact: {
    email: "support@berzerk.com",
  },
  locale: {
    language: "en-US",
    currency: "USD",
  },
  shipping: {
    freeShippingThreshold: 50,
    standardFee: 4.99,
    expressFee: 9.99,
    overnightFee: 24.99,
    standardDays: "5–7 business days",
    expressDays: "2–3 business days",
    overnightCutoff: "1pm EST",
    internationalDays: "10–21 business days",
    processingCutoff: "2pm EST",
  },
  policies: {
    returnWindowDays: 30,
    refundProcessingDays: "3–5 business days",
    refundCreditDays: "5–10 business days",
  },
  social: {},
  features: {
    newsletter: true,
    reviews: true,
    wishlist: true,
    darkMode: true,
  },
  theme: {
    primaryColor: "#0284c7",
    primaryColorDark: "#4ea9d8",
  },
};
