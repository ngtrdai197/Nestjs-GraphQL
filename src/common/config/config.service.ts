import * as dotenv from 'dotenv';
import * as fs from 'fs';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: Record<string, string>;

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  get port(): number {
    return +this.envConfig.PORT;
  }
  get databaseName(): string {
    return this.envConfig.DATABASE_NAME;
  }
  get db_username(): string {
    return this.envConfig.DB_USERNAME;
  }
  get db_password(): string {
    return this.envConfig.DB_PASS;
  }
}
