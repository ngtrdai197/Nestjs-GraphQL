import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from '@hapi/joi';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'production')
        .default('development'),
      PORT: Joi.number().default(3000),
      DATABASE_NAME: Joi.string().required(),
      SECRET_KEY: Joi.string().required(),
    });
    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
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

  get uriConnectDB(): string {
    const host = `mongodb://localhost:27017`;
    return `${host}/${this.databaseName}`;
  }

  get secretKey(): string {
    return this.envConfig.SECRET_KEY;
  }

  get db_username(): string {
    return this.envConfig.DB_USERNAME;
  }
  get db_password(): string {
    return this.envConfig.DB_PASS;
  }
}
