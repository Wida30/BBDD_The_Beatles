const express = require("express");


const router = express.Router();

const {
  getAllAlbums,
  getAlbumByID,
  createAlbum,
  patchAlbum,
  deleteAlbum,
} = require("../controllers/album.controller");

router.get("/", getAllAlbums);
router.get("/:id", getAlbumByID);
router.post("/", createAlbum);

router.patch("/:id", patchAlbum);
router.delete("/:id", deleteAlbum);

module.exports = router;
