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
      DB_USER: Joi.string().required(),
      DB_PASS: Joi.string().required()
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
  get nameDB(): string {
    return this.envConfig.DATABASE_NAME;
  }

  get userDB(): string {
    return this.envConfig.DB_USER
  }

  get passDB(): string {
    return this.envConfig.DB_PASS
  }

  get uriConnectDB(): string {
    const urlDatabaseAtlas = 
    `mongodb+srv://${this.userDB}:${this.passDB}@cluster0-esass.mongodb.net/${this.nameDB}?retryWrites=true&w=majority`
    return urlDatabaseAtlas
    // const host = `mongodb://localhost:27017`;
    // return `${host}/${this.nameDB}`;
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
