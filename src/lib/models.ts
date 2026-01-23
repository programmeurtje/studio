export interface Model {
  id: string;
  name: string;
  positioning: string;
  specs: string[];
  price: string;
  priceSubtext?: string;
  images: { id: string; description: string; imageUrl: string }[];
}

export const models: Model[] = [
  {
    id: "sense",
    name: "Sense",
    positioning: "Compact hotel-style tiny house",
    specs: [
      "Minimalistisch design",
      "Vide-indeling",
      "Badkamer met douche & toilet",
      "Pantry / kitchenette",
      "Grote panoramische ramen",
    ],
    price: "Vanaf €78.500 + BTW",
    images: [
      { id: "sense-1", description: "Sense interior", imageUrl: "/images/gallery-1.webp" },
      { id: "sense-2", description: "Sense bathroom", imageUrl: "/images/gallery-2.webp" },
      { id: "sense-3", description: "Sense exterior", imageUrl: "/images/gallery-3.jpeg" },
      { id: "sense-4", description: "Sense detail", imageUrl: "/images/gallery-4.webp" },
    ],
  },
  {
    id: "signature",
    name: "Signature",
    positioning: "Premium balans tussen luxe en ruimte",
    specs: [
      "Meerdere indelingen mogelijk",
      "Optioneel 1 slaapkamer",
      "Optioneel sauna",
      "Panoramische ramen (2 of 3 zijden)",
      "Ruime leefruimte",
    ],
    price: "Vanaf €78.500 + BTW",
    priceSubtext: "One bedroom vanaf €89.000, verlengd vanaf €102.500",
    images: [
        { id: "sig-1", description: "Signature interior", imageUrl: "/images/gallery-4.webp" },
        { id: "sig-2", description: "Signature exterior", imageUrl: "/images/gallery-5.webp" },
        { id: "sig-3", description: "Signature layout", imageUrl: "/images/gallery-6.webp" },
        { id: "sig-4", description: "Signature construction", imageUrl: "/images/gallery-8.webp" },
    ],
  },
  {
    id: "luxury-retreat",
    name: "Luxury Retreat",
    positioning: "High-end luxe tiny house",
    specs: [
      "Groot woonoppervlak",
      "1 of 2 slaapkamers",
      "Luxe badkamer(s)",
      "Meerdere raamconfiguraties",
      "Optionele spa / wellness",
    ],
    price: "Vanaf €63.000 + BTW",
    images: [
        { id: "retreat-1", description: "Retreat backyard", imageUrl: "/images/gallery-7.webp" },
        { id: "retreat-2", description: "Retreat construction", imageUrl: "/images/gallery-8.webp" },
        { id: "retreat-3", description: "Retreat hero", imageUrl: "/images/hero-background.webp" },
        { id: "retreat-4", description: "Retreat interior", imageUrl: "/images/gallery-1.webp" },
    ],
  },
];
