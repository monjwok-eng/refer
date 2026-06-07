export interface SiteConfig {
  hero: {
    headline: string;
    subheadline: string;
    ctaText: string;
    description?: string;
  };
  brand: {
    name: string;
    accentColor: string;
    backgroundColor?: string;
    tagline?: string;
  };
  features: {
    title: string;
    items: {
      title: string;
      description: string;
      icon?: string;
    }[];
  };
  stats?: {
    label: string;
    value: string;
  }[];
  customCode?: string;
}

export const BLANK_CONFIG: SiteConfig = {
  hero: {
    headline: "",
    subheadline: "",
    ctaText: "",
    description: ""
  },
  brand: {
    name: "",
    accentColor: "#f1f5f9"
  },
  features: {
    title: "",
    items: []
  },
  stats: []
};

export const DEFAULT_CONFIGS: Record<number, SiteConfig> = {
  1: {
    hero: {
      headline: "CRAFTING DIGITAL EXCELLENCE.",
      subheadline: "Creative Intelligence Agency",
      ctaText: "Start Your Journey",
      description: "We partner with visionary founders to build products that define categories and disrupt industries."
    },
    brand: {
      name: "ARCHIVE.",
      accentColor: "#1dbf73"
    },
    features: {
      title: "Releases / 24",
      items: [
        { title: "Vanguard Systems", description: "Fintech Solution" },
        { title: "Nova Bio-Labs", description: "Health Collective" }
      ]
    },
    stats: [
      { label: "Products Shipped", value: "32" },
      { label: "Billion in Value", value: "127" }
    ]
  },
  2: {
    hero: {
      headline: "Architecting the future of Global Capital.",
      subheadline: "Stratos Group Advisory",
      ctaText: "Partner with us",
      description: "We deliver uncompromising expertise in high-stakes market expansion, risk mitigation, and algorithmic diversification."
    },
    brand: {
      name: "STRATOS",
      accentColor: "#1dbf73",
      tagline: "Group Advisory"
    },
    features: {
      title: "Methodology 04",
      items: [
        { title: "Risk Monitoring", description: "24/7 Protection" },
        { title: "Global Hubs", description: "12 Strategic Locations" }
      ]
    },
    stats: [
        { label: "Assets Protected", value: "4.2B" },
        { label: "Risk Monitoring", value: "24/7" }
    ]
  },
  3: {
    hero: {
      headline: "THE ART OF STILLNESS IN MOTION.",
      subheadline: "Cinematic Perspective / NYC",
      ctaText: "Inquire Now",
      description: "I believe that every shadows tells a secret that the light is too afraid to whisper."
    },
    brand: {
      name: "Elias Thorne",
      accentColor: "#ffffff"
    },
    features: {
      title: "Featured Commissions",
      items: [
        { title: "Vogue Italia", description: "Study in Contrast / 001" },
        { title: "Hasselblad Masters", description: "Urban Silhouette / 014" }
      ]
    }
  }
};
