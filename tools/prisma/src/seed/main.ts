import { prisma } from '@larapida-websites/api-service-database-utils';
import { seedCategories, seedSuperuser } from './seeders';

export async function main() {
  try {
    await seedSuperuser();
    await seedCategories();
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}
