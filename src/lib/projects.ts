export type ProjectPhoto = { src: string; w: number; h: number; caption?: string };

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  concept?: string;
  description: string;
  role: string[];
  tools: string[];
  rot: number;
  cover: ProjectPhoto;
  gallery: ProjectPhoto[];
};

export const PROJECTS: Project[] = [
  {
    slug: "estella",
    title: "ESTELLA",
    category: "Fotografía comercial · Accesorios",
    year: "2024",
    description:
      "Producción fotográfica desarrollada para Estella, un emprendimiento de accesorios artesanales en etapa de lanzamiento, creando contenido visual para comunicar la identidad de la marca y presentar collares, dijes y pulseras con una estética pensada para medios digitales (Instagram, página web).",
    role: [
      "Conceptualización de la sesión",
      "Dirección de arte",
      "Producción fotográfica",
      "Fotografía de producto",
      "Fotografía con modelo",
      "Edición y retoque",
    ],
    tools: ["Lightroom", "Photoshop"],
    rot: -1.5,
    cover: { src: "/proyectos/luz-3.webp", w: 532, h: 799 },
    gallery: [
      {
        src: "/proyectos/luz-1.webp",
        w: 1066,
        h: 1599,
        caption: "Collares y pulseras en mano, luz natural",
      },
      {
        src: "/proyectos/luz-2.webp",
        w: 533,
        h: 800,
        caption: "Dije de margarita sobre columna acanalada",
      },
      {
        src: "/proyectos/luz-3.webp",
        w: 532,
        h: 799,
        caption: "Cadena con dijes de corazón sobre copa de cristal",
      },
      {
        src: "/proyectos/luz-4.webp",
        w: 533,
        h: 800,
        caption: "Dijes y aretes dorados, bodegón sobre plato blanco",
      },
      {
        src: "/proyectos/luz-5.webp",
        w: 533,
        h: 800,
        caption: "Pulsera de dijes en muñeca, tela blanca",
      },
    ],
  },
  {
    slug: "esencia",
    title: "ESENCIA",
    category: "Fotografía de producto",
    year: "2024",
    concept: "Naturaleza · Frescura · Bienestar",
    description:
      "Producción fotográfica desarrollada para destacar un aceite esencial mediante una propuesta visual de alto contraste, iluminación dirigida y una dirección de arte inspirada en elementos botánicos que transmiten frescura, bienestar y sofisticación.",
    role: [
      "Conceptualización",
      "Dirección de arte",
      "Producción fotográfica",
      "Edición y retoque",
    ],
    tools: ["Lightroom", "Photoshop"],
    rot: 1.0,
    cover: { src: "/proyectos/esencia-2.webp", w: 1066, h: 1599 },
    gallery: [
      {
        src: "/proyectos/esencia-2.webp",
        w: 1066,
        h: 1599,
        caption: "Frasco de esencia, fondo oscuro",
      },
      {
        src: "/proyectos/esencia-1.webp",
        w: 533,
        h: 800,
        caption: "Vapor y flores alrededor del frasco",
      },
      {
        src: "/proyectos/esencia-3.webp",
        w: 533,
        h: 800,
        caption: "Composición con ramas y cítrico",
      },
      {
        src: "/proyectos/esencia-4.webp",
        w: 533,
        h: 800,
        caption: "Astromelias naranjas junto al frasco",
      },
      {
        src: "/proyectos/esencia-5.webp",
        w: 1600,
        h: 2400,
        caption: "Bodegón sobre espejo con follaje",
      },
    ],
  },
  {
    slug: "pelitos-felices",
    title: "PELITOS FELICES",
    category: "Fotografía comercial · Accesorios para el cabello",
    year: "2024",
    description:
      "Producción fotográfica desarrollada para Pelitos Felices, un emprendimiento de accesorios para el cabello, creando contenido visual enfocado en resaltar el uso del producto y transmitir una imagen fresca, femenina y cercana para medios digitales.",
    role: [
      "Conceptualización de la sesión",
      "Dirección de arte",
      "Producción fotográfica",
      "Fotografía de producto",
      "Fotografía con modelo",
      "Edición y retoque",
    ],
    tools: ["Lightroom", "Photoshop"],
    rot: -0.5,
    cover: { src: "/proyectos/pelitos-1.webp", w: 1066, h: 1599 },
    gallery: [
      {
        src: "/proyectos/pelitos-1.webp",
        w: 1066,
        h: 1599,
        caption: "Moño en el cabello, retrato de perfil",
      },
      {
        src: "/proyectos/pelitos-2.webp",
        w: 533,
        h: 800,
        caption: "Scrunchie rosa en la muñeca, luz de calle",
      },
      {
        src: "/proyectos/pelitos-3.webp",
        w: 799,
        h: 526,
        caption: "Moño color crema entre los dedos, contraluz",
      },
    ],
  },
  {
    slug: "maria-luisa",
    title: "MARÍA LUISA",
    category: "Fotografía gastronómica",
    year: "2024",
    description:
      "Producción gastronómica desarrollada para destacar la identidad visual del producto mediante una propuesta de dirección de arte e iluminación orientada a contenido para medios digitales: fotografía y video, planeación de contenido y diseño de portadas.",
    role: [
      "Conceptualización",
      "Dirección de arte",
      "Producción fotográfica",
      "Grabación de reels",
      "Edición y retoque",
    ],
    tools: ["Lightroom", "Photoshop", "CapCut", "Canva"],
    rot: 2.0,
    cover: { src: "/proyectos/marialuisa-3.webp", w: 1599, h: 1066 },
    gallery: [
      {
        src: "/proyectos/marialuisa-3.webp",
        w: 1599,
        h: 1066,
        caption: "Torta completa con mermelada y flores",
      },
      {
        src: "/proyectos/marialuisa-1.webp",
        w: 1229,
        h: 1599,
        caption: "Porción servida, mantel tejido y moras",
      },
      {
        src: "/proyectos/marialuisa-2.webp",
        w: 533,
        h: 800,
        caption: "Corte de la torta, decoración otoñal",
      },
      {
        src: "/proyectos/marialuisa-4.webp",
        w: 533,
        h: 800,
        caption: "Torta en mano, fondo azul liso",
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
