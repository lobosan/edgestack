import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const saltRounds = 10;

  const users = [
    {
      email: "user@example.com",
      password: await bcrypt.hash("UserPassword12!@#", saltRounds),
      name: "Regular User",
      role: Role.USER,
    },
    {
      email: "admin@example.com",
      password: await bcrypt.hash("AdminPassword12!@#", saltRounds),
      name: "Admin User",
      role: Role.ADMINISTRATOR,
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  console.log("Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
