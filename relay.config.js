module.exports = {
    src: "./src",
    language: "typescript",
    schema: "./data/schema.graphql",
    excludes: [
        "**/node_modules/**",
        "/api/**",
        "/public/**",
        "/design/**"
    ],
  }