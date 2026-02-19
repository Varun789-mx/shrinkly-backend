import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.link.deleteMany();
  await prisma.user.deleteMany();

  // Create users with nested links
  const alice = await prisma.user.create({
    data: {
      name: "Alice Johnson",
      email: "alice@example.com",
      Urls: {
        create: [
          {
            original_url: "https://www.google.com",
            short_url: "go-ogle",
            clicks: 120,
          },
          {
            original_url: "https://www.github.com",
            short_url: "gh-hub",
            clicks: 85,
          },
        ],
      },
    },
  });

  const bob = await prisma.user.create({
    data: {
      name: "Bob Smith",
      email: "bob@example.com",
      Urls: {
        create: [
          {
            original_url: "https://www.youtube.com",
            short_url: "yt-ube",
            clicks: 200,
          },
          {
            original_url: "https://www.reddit.com",
            short_url: "rdt-it",
            clicks: 34,
          },
          {
            original_url: "https://www.stackoverflow.com",
            short_url: "stk-ovr",
            clicks: 57,
          },
        ],
      },
    },
  });

  console.log("Seeded users:", { alice, bob });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });