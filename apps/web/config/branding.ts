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
