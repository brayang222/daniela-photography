import "dotenv/config";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";
import { PrismaClient } from "../src/generated/prisma/client";
import { SEED_PROJECTS } from "./seed-data";

neonConfig.webSocketConstructor = ws;
const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function seedAdmins() {
  const admins = [
    { email: process.env.ADMIN1_EMAIL, hash: process.env.ADMIN1_PASSWORD_HASH },
    { email: process.env.ADMIN2_EMAIL, hash: process.env.ADMIN2_PASSWORD_HASH },
  ];

  for (const admin of admins) {
    if (!admin.email || !admin.hash) continue;
    await prisma.user.upsert({
      where: { email: admin.email },
      update: { passwordHash: admin.hash, role: "admin" },
      create: { email: admin.email, passwordHash: admin.hash, role: "admin" },
    });
    console.log(`Admin listo: ${admin.email}`);
  }
}

async function seedProjects() {
  for (let i = 0; i < SEED_PROJECTS.length; i++) {
    const project = SEED_PROJECTS[i];
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {
        title: project.title,
        category: project.category,
        year: project.year,
        concept: project.concept ?? null,
        description: project.description,
        role: project.role,
        tools: project.tools,
        coverSrc: project.cover.src,
        gallery: project.gallery,
        order: i,
      },
      create: {
        slug: project.slug,
        title: project.title,
        category: project.category,
        year: project.year,
        concept: project.concept ?? null,
        description: project.description,
        role: project.role,
        tools: project.tools,
        coverSrc: project.cover.src,
        gallery: project.gallery,
        order: i,
      },
    });
    console.log(`Proyecto listo: ${project.slug}`);
  }
}

async function main() {
  await seedAdmins();
  await seedProjects();
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
