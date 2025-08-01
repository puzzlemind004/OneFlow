/*
|--------------------------------------------------------------------------
| AdonisJS console entrypoint
|--------------------------------------------------------------------------
|
| The "console.ts" file is the entrypoint for running ace commands. Either
| you can run the ace commands directly or use the "node ace" command to
| run them.
|
*/

import 'reflect-metadata'
import { Ignitor } from '@adonisjs/core'

/**
 * URL to the application root. AdonisJS need it to resolve
 * paths to file and directories for scaffolding commands
 */
const APP_ROOT = new URL('../', import.meta.url)

/**
 * The importer is used to import files in context of the
 * application.
 */
const IMPORTER = (filePath: string) => {
  if (filePath.startsWith('./') || filePath.startsWith('../')) {
    return import(new URL(filePath, APP_ROOT).href)
  }
  return import(filePath)
}

const ignitor = new Ignitor(APP_ROOT, { importer: IMPORTER })
await ignitor.ace().handle(process.argv.splice(2))