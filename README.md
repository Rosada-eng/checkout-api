<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest



## Project setup
1. Fulfill your `.env` file

2. Create a new database instance with Docker

```bash
$ docker compose up -d
```

3. Setup a new Schema following the name fulfilled in `DATABASE_SCHEMA` env variable

4. Run seeder to populate some entities into the database

```bash
$ npm run seed
```

## Compile and run the project

```bash
$ npm run start
```

5. You can use Swagger Docs API to manipulate the API in http://localhost:3000/docs

## Run tests Manually

- Create new Products
- Create two new companies (buyer, seller)
- Create a new Cart
- Add products to Cart
- Remove product to Cart
- Closes a Cart
- Send Order (it simulates API call to credix and store data into database)

### todo: Upload images