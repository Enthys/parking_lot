# Parking lot
## Setup
### Docker development
1. Copy `.env.default` under the name `.env`
2. Start application with `docker compose up`

### Local development
1. Deploy PostgreSQL server
2. Set correct variables in copied `.env` file
3. Start application with `npm run start`

## Endpoints
API Endpoints can be viewed under the path `/specz` once the application has
started.
> Environment variable `APP_MODE` has to have the value `development` in order
> to view the OpenAPI documentation

## Environment variable
- `APP_MODE` (optional)
  - if set to `development` will be able to view the OpenAPI documentation
- `PORT` (optional - defaults to 80)
  - the port on which the application will be listening for requests
- `DATABASE_HOST`, `DATABASE_USER`, `DATABASE_PASSWORD`, `DATABASE_PORT`, `DATABASE_DB`
  - configurations concerning the connection to the database
- `RUN_MIGRATION_ON_START`
  - if value is set to `1` will attempt to run the migrations upon startup of the
  application
  - if value is set to `0` migrations will have to be run manually
