import { defineConfig } from '@adonisjs/core/app'
import { InferSharedTypes } from '@adonisjs/core/types'

const appConfig = defineConfig({
  /*
  |--------------------------------------------------------------------------
  | App key
  |--------------------------------------------------------------------------
  |
  | The app key is used for encrypting cookies, generating signed URLs,
  | and by the "encryption" module.
  |
  | Make sure to keep the app key secret and never commit it to version
  | control.
  |
  */
  appKey: new URL('../tmp/app_key.txt', import.meta.url),

  http: {
    /*
    |--------------------------------------------------------------------------
    | Generate etag
    |--------------------------------------------------------------------------
    |
    | Whether or not to generate an etag for every response.
    |
    */
    generateRequestId: true,
    allowMethodSpoofing: false,

    /*
    |--------------------------------------------------------------------------
    | Subdomains offset
    |--------------------------------------------------------------------------
    */
    subdomainOffset: 2,

    /*
    |--------------------------------------------------------------------------
    | Make URL function
    |--------------------------------------------------------------------------
    */
    generateRequestId: true,
  },

  /*
  |--------------------------------------------------------------------------
  | Assets
  |--------------------------------------------------------------------------
  |
  | Configure how AdonisJS will serve static assets from the "public"
  | directory.
  |
  */
  assets: {
    /*
    |--------------------------------------------------------------------------
    | Enable or disable serving assets
    |--------------------------------------------------------------------------
    */
    enabled: true,
  },
});

export default appConfig

declare module '@adonisjs/core/types' {
  export interface ContainerBindings extends InferSharedTypes<typeof appConfig> {}
}