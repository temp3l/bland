# Challenge-4

- Project created with: `npx nest new challenge-4`
  - Server:  http://127.0.0.1:3000
  - Swagger: http://127.0.0.1:3000/api
- Azurite Storage: `docker run -p 10000:10000 -p 10001:10001 -p 10002:10002 mcr.microsoft.com/azure-storage/azurite`
  - Uses the default `AZURE_STORAGE_CONNECTION_STRING` from `.env` file
- MongoDB: `docker run -d -p 27017:27017 --name example-mongo mongo:latest`
  - I used my local MongoDB Server (did not test the above docker image)
- Testing 
  - I focused on integration-testing here - since unit-tests were demonstrated in previous challenges
  - Test-cases (for text & binary files):
    - upload
    - download
    - verify (checks md5sum)


## Way to production

- Change `AZURE_STORAGE_CONNECTION_STRING`
- Use ORM + Repositories
- Implement Logger
- Error handling
  - catch + log + throw errors
  - currently all errors are propagated to the client (full stack trace)
- Implementation
  - more explicit typings
  - I'm currently using a simple `uuid` as azure filePath
    - better filePaths: 
      - `${fileName}-${uuid}`
      - `${md5sum}`


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
