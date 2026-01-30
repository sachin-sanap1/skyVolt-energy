const products = [
  {
    id: 1,
    name: "Wind Turbine",
    category: "Renewable Energy",
    brand: "GreenPower",
    price: 120000,
    discount: 10,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBunxPiTJ1ehyKxrMamjtNwPIcoJc8wvwwaQ&s",
      "https://thumbs.dreamstime.com/b/clean-wind-energy-construction-windmill-production-renewable-219085736.jpg"
    ],
    stock: 12,
    description: "High-efficiency wind turbine for residential and commercial use.",
    specifications: {
      capacity: "5 kW",
      voltage: "230V",
      material: "Steel",
      weight: "120 kg"
    },
    deliveryTime: "3–5 days",
    shippingCharge: 0,
    installationRequired: true,
    installationCost: 75000,
    returnable: true,
    returnDays: 7,
    replacementAvailable: true,
    warranty: "2 Years",
    rating: 4.6,
    totalReviews: 128
  },

  {
    id: 2,
    name: "Tower Structure",
    category: "Renewable Energy",
    brand: "WindTech",
    price: 80000,
    discount: 5,
    images: [
      "https://thumbs.dreamstime.com/b/clean-wind-energy-construction-windmill-production-renewable-219085736.jpg"
    ],
    stock: 20,
    description: "Strong galvanized steel tower for wind turbine mounting.",
    specifications: {
      height: "30 meters",
      material: "Galvanized Steel",
      loadCapacity: "500 kg"
    },
    deliveryTime: "5–7 days",
    shippingCharge: 5000,
    installationRequired: true,
    installationCost: 60000,
    returnable: true,
    returnDays: 7,
    replacementAvailable: true,
    warranty: "5 Years",
    rating: 4.4,
    totalReviews: 86
  },

  {
    id: 3,
    name: "Power Inverter",
    category: "Electronics",
    brand: "VoltMax",
    price: 45000,
    discount: 15,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_voj0QIRAyM_ELN5IcqF8MFayIUMx0QF6DQ&s"
    ],
    stock: 35,
    description: "High-efficiency inverter for renewable power systems.",
    specifications: {
      capacity: "6 kVA",
      efficiency: "95%",
      phase: "Single Phase"
    },
    deliveryTime: "2–4 days",
    shippingCharge: 0,
    installationRequired: false,
    returnable: true,
    returnDays: 7,
    replacementAvailable: true,
    warranty: "3 Years",
    rating: 4.5,
    totalReviews: 210
  },

  {
    id: 4,
    name: "Controller Unit",
    category: "Electronics",
    brand: "ControlPro",
    price: 30000,
    discount: 8,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcHhC-LZhxgeiHEt8HTcnFqc8NYGJ_GEPTog&s"
    ],
    stock: 40,
    description: "Smart controller for managing wind energy output.",
    specifications: {
      display: "LCD",
      controlType: "Automatic",
      protection: "Overload Protection"
    },
    deliveryTime: "2–3 days",
    shippingCharge: 0,
    installationRequired: false,
    returnable: true,
    returnDays: 7,
    replacementAvailable: true,
    warranty: "2 Years",
    rating: 4.3,
    totalReviews: 92
  },

  {
    id: 10,
    name: "Cabling & Accessories Kit",
    category: "Accessories",
    brand: "PowerLink",
    price: 12000,
    discount: 5,
    images: [
      "https://d3gpbqyz2aphnw.cloudfront.net/wp-content/uploads/2024/09/raymarine-evolution-cabling-kit-57591.jpg"
    ],
    stock: 200,
    description: "Complete wiring kit for renewable installations.",
    specifications: {
      cableType: "Copper",
      length: "50 meters"
    },
    deliveryTime: "1–2 days",
    shippingCharge: 0,
    installationRequired: false,
    returnable: true,
    returnDays: 7,
    replacementAvailable: true,
    warranty: "1 Year",
    rating: 4.3,
    totalReviews: 112
  }
];

export default products;
