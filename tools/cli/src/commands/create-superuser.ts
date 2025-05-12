import { Command } from 'commander';
import inquirer from 'inquirer';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const createSuperuserCommand = new Command('create-superuser')
  .description('Create a superuser in the production database')
  .action(async () => {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'email',
        message: '📧 Email:',
        validate: async (input: string) => {
          if (!input.includes('@')) return 'Invalid email address';
          const exists = await prisma.user.findUnique({
            where: { email: input },
          });
          if (exists) return 'User with this email already exists';
          return true;
        },
      },
      {
        type: 'password',
        name: 'password',
        message: '🔑 Password:',
        mask: '*',
        validate: (input: string) =>
          input.length >= 8 ? true : 'Password must be at least 8 characters',
      },
      {
        type: 'input',
        name: 'firstname',
        message: '👤 First Name:',
      },
      {
        type: 'input',
        name: 'lastname',
        message: '👤 Last Name:',
      },
    ]);

    const hashedPassword = await bcrypt.hash(answers.password, 10);

    const user = await prisma.user.create({
      data: {
        email: answers.email,
        password: hashedPassword,
        firstname: answers.firstname,
        lastname: answers.lastname,
        isAdmin: true,
      },
    });

    console.log(`✅ Superuser created: ${user.email}`);
    await prisma.$disconnect();
  });
