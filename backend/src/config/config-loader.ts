/** Loaded app configuration. */
export type Config = {
  port: number;
  database: DatabaseConfig;
};

/** Database configuration details. */
export type DatabaseConfig = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};

export class ConfigLoader {
  constructor() {}

  /** Loads app configuration. */
  load(): Config {
    return {
      port: parseInt(process.env.SERVER_PORT) ?? 3000,
      database: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
      },
    };
  }
}
