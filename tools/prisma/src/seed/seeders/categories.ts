import { categories } from '../data/categories';
import { prisma } from '../../prisma';

export async function seedCategories() {
  const results = [];

  for (const category of categories) {
    const newCategory = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: {
        name: category.name,
        slug: category.slug,
      },
    });

    results.push(newCategory);
  }

  console.log(
    `✅ ${results.length} categories upserted:`,
    results.map((c) => c.slug)
  );
}
