const express = require("express");
const adminRoutes = require("./src/routes/adminRoutes");
const playerRoutes = require("./src/routes/playerRoutes");
const app = express();
const PORT = 3000;
// const cors = require("cors");
// app.use(cors());
app.use(express.json());
app.listen(PORT, () => {
    console.log(`Listening in port ${PORT}`)
})
app.use("/api", adminRoutes);
app.use("/player", playerRoutes);