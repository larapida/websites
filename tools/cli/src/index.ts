#!/usr/bin/env node

import { Command } from 'commander';
import { createSuperuserCommand } from './commands/create-superuser';

const program = new Command();

program
  .name('larapida')
  .description('CLI for managing Larapida ecosystem')
  .addCommand(createSuperuserCommand);

program.parseAsync();
