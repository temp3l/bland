# Challenge-5

- Uses postgresSQL: `docker run --name some-postgres -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -d postgres`
- provides functions for Database initialization: createPlatesTable(), dropAllTables(), etc
  - see: `src/lib/Database.ts`
- supports queries
  - see `src/index.ts` (example query)
- watches `cams` folder for changes (simple nodemon restart)

## Setup

```bash
# setup
npm install
npm run build

# running
npm run start:watch

# testing
npm run test:unit
```
