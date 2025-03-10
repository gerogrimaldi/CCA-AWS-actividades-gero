import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // await prisma.product.createMany({
  //   data: [
  //     {
  //       name: 'Laptop',
  //       description: 'High-performance laptop for work and gaming',
  //     },
  //     {
  //       name: 'Smartphone',
  //       description: 'Latest smartphone with 5G connectivity',
  //     },
  //     {
  //       name: 'Headphones',
  //       description: 'Noise-canceling over-ear headphones',
  //     },
  //     {
  //       name: 'Smartwatch',
  //       description: 'Waterproof smartwatch with health tracking',
  //     },
  //     {
  //       name: 'Mechanical Keyboard',
  //       description: 'RGB-backlit mechanical keyboard',
  //     },
  //     {
  //       name: 'Wireless Mouse',
  //       description: 'Ergonomic wireless mouse with fast response',
  //     },
  //     { name: 'Monitor', description: '4K UHD monitor with HDR support' },
  //   ],
  // });

  // console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
