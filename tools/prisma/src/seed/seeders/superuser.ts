import bcrypt from 'bcryptjs';
import { prisma } from '@larapida-websites/api-service-database-utils';
import { superuser } from '../data/superuser';

export async function seedSuperuser() {
  const passwordHash = await bcrypt.hash(superuser.password, 10);

  const admin = await prisma.user.upsert({
    where: { email: superuser.email },
    update: {},
    create: {
      email: superuser.email,
      firstname: superuser.firstname,
      lastname: superuser.lastname,
      password: passwordHash,
      isActive: true,
      isAdmin: true,
    },
  });

  console.log('✅ Superuser upserted:', admin.email);
}
