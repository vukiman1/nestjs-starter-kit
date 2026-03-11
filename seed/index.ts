import { AppDataSource } from '../ormconfigs';

async function runSeeds() {
  await AppDataSource.initialize();
  await AppDataSource.destroy();
}

void runSeeds();
