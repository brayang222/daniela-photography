// pendientes: fotos reales del portafolio — hoy son placeholders de Unsplash,
// tal como venían en el diseño original.
const PLACEHOLDER_SRCS = [
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=550&fit=crop&q=80",
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=500&h=340&fit=crop&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=550&fit=crop&q=80",
  "https://images.unsplash.com/photo-1551292831-023188e78222?w=400&h=550&fit=crop&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=520&h=350&fit=crop&q=80",
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=420&h=280&fit=crop&q=80",
  "https://images.unsplash.com/photo-1558865869-c93f6f8482af?w=360&h=500&fit=crop&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=550&fit=crop&q=80",
];

const PROJECT_DEFS = [
  { slug: "portrait-series", title: "PORTRAIT SERIES", year: "2024", rot: -1.5, w: 218, h: 298 },
  { slug: "urban-landscapes", title: "URBAN LANDSCAPES", year: "2024", rot: 1.0, w: 316, h: 210 },
  { slug: "editorial", title: "EDITORIAL", year: "2023", rot: -0.5, w: 196, h: 286 },
  { slug: "documentary", title: "DOCUMENTARY", year: "2023", rot: 2.0, w: 210, h: 286 },
  { slug: "fine-art", title: "FINE ART", year: "2022", rot: -1.0, w: 236, h: 316 },
  { slug: "architecture", title: "ARCHITECTURE", year: "2024", rot: 0.5, w: 306, h: 200 },
];

export const PROJECTS = PROJECT_DEFS.map((project, i) => ({
  ...project,
  src: PLACEHOLDER_SRCS[i % PLACEHOLDER_SRCS.length],
}));

export type Project = (typeof PROJECTS)[number];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
