const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const logger = require("morgan");

const albumsRouter = require("./src/api/routes/album.route");

const { connect } = require("./src/utils/database");

const JWT_SECRET = process.env.JWT_SECRET



dotenv.config();

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(logger("dev"))



cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})

connect()

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });


server.use(cors({
    origin: "*",
    credentials: true
}))

server.set("secretKey", JWT_SECRET)

server.use("/", albumsRouter);

const PORT = process.env.PORT || 8000;

server.listen (PORT, () => {
    console.log(`Server run in http://localhost:${PORT}`);
});