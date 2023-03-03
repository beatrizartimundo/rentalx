import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (host = "database"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  const isDev = process.env.NODE_ENV === 'test';
  
  return createConnection(
    Object.assign(defaultOptions, {
      host: isDev ? "localhost" : host,
      database: isDev
        ? "rentx_test"
        : defaultOptions.database
    })
  );
};

