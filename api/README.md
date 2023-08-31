
# Cloudmos API

- [Environment Variables](#environment-variables)
- [How to run](#how-to-run)

## How to run

1. Make sure you have a valid [Akash database](../README.md#how-to-run) first.
2. Make sure you have a valid User database. If the user database is empty, the necessary tables will be created automatically.
2. Create a `.env` file with the necessary [environment variables](#environment-variables).
3. Run `npm install` to install dependencies.
4. Start the app with `npm start`.

You can make sure the api is working by accessing the status endpoint: `http://localhost:3080/status`

## Environment Variables

When running the api locally the following environment variables can be set in a `.env` file.

|Name|Value|Note|
|-|-|-
Network|`mainnet` or `testnet`|Specify if the api should be in mainnet or testnet mode. Default: `mainnet`.
RestApiNodeUrl|ex: `"https://api.akashnet.net"`|Rest api to use. Will default to `"https://rest.cosmos.directory/akash"` for mainnet and `"https://api.testnet-02.aksh.pw:443"` for testnet.
HealthchecksEnabled|`true` or `false`|Specify if the [Scheduler](./src/index.ts#L42) should send health check pings.
SentryDSN|ex: `"https://1234...789@z645.ingest.sentry.io/1234"`|[Sentry DSN](https://docs.sentry.io/product/sentry-basics/dsn-explainer/) used when [initializing](./src/index.ts#L29) Sentry
AkashDatabaseCS|ex: `postgres://user:password@localhost:5432/cloudmos-akash`|Akash Database Connection String
AkashTestnetDatabaseCS|ex: `postgres://user:password@localhost:5432/cloudmos-akash-testnet`|Akash Testnet Database Connection String
UserDatabaseCS|ex: `postgres://user:password@localhost:5432/cloudmos-users`|User Database Connection String
Auth0JWKSUri|ex: `'https://1a2b3c.us.auth0.com/.well-known/jwks.json'`|
Auth0Audience|ex: `'https://api.cloudmos.io'`
Auth0Issuer|ex: `'https://dev-5aprb0lr.us.auth0.com/'`
Auth0Issuer|ex: `'https://auth.cloudmos.io/'`
StripeSecretKey|ex: `sk_test_12aw315wdawd3...293d12d32df8jf`
WebsiteUrl|`http://localhost:3001`
