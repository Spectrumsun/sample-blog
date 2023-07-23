import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const role: Prisma.UserRoleCreateInput[] = [
  {
    name: 'ADMIN',
    description: 'Can access every resource in the system'
  },
  {
    name: 'USER',
    description: 'Cab only access personal resource'
  }
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of role) {
    const role = await prisma.userRole.create({
      data: u,
    })
    console.log(`Created user with id: ${role.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })