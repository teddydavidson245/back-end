const POOL = require ("pg").Pool;

const pool = new POOL({
    user: "teddykm",
    host: "localhost",
    database: "demo",
    password: "",
    port: 5432,
});

module.exports = pool;