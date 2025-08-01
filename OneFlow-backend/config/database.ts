import { defineConfig } from '@adonisjs/lucid'
import env from '#start/env'

const dbConfig = defineConfig({
  connection: 'postgres',
  connections: {
    postgres: {
      client: 'pg',
      connection: {
        host: env.get('DB_HOST'),
        port: env.get('DB_PORT'),
        user: env.get('DB_USER'),
        password: env.get('DB_PASSWORD', ''),
        database: env.get('DB_DATABASE'),
      },
      migrations: {
        naturalSort: true,
      },
      healthCheck: false,
      debug: false,
    },
  },
})

export default dbConfig
declare module '@adonisjs/lucid/types' {
  export interface DataProviderContract {
    default: typeof dbConfig
  }
}