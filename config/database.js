module.exports = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env(
        "DATABASE_HOST",
        "51.159.104.4"
      ),
      port: env.int("DATABASE_PORT", 5432),
      database: env("DATABASE_NAME", "green-good-news-db"),
      user: env("DATABASE_USERNAME", "scalewayuser"),
      password: env(
        "DATABASE_PASSWORD",
        "scalewayuser@123!"
      ),
      schema: env("DATABASE_SCHEMA", "public"), 
      ssl: {
        rejectUnauthorized: env.bool("DATABASE_SSL_SELF", false),
      },
    },
    debug:false,
},
});