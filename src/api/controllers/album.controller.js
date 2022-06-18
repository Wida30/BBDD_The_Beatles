const Album = require("../models/album.models");
const HTTPSTATUSCODE = require("../../utils/HTTP");

const getAllAlbums = async (req, res, next) => {
  try {
    const allAlbums = await Album.find();
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      album: allAlbums,
    });
  } catch (error) {
    return next(error);
  }
};

const getAlbumByID = async (req, res, next) => {
    try {
      const id = req.params.id;
      const albumByID = await Album.findById(id);
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        album: albumByID,
      });
    } catch (error) {
      return next(error);
    }
  };

  const createAlbum= async (req, res, next) => {
    try {
      const newAlbum = new Album(req.body);
      if (req.file) {
          newAlbum.imagen = req.file.path;
        }
        const createdAlbum = await newAlbum.save();
        return res.json({
          status: 201,
          message: HTTPSTATUSCODE[201],
          album: createdAlbum,
        });
    } catch (error) {
      return next(error);
    }
  };

  const deleteAlbum = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const albumBorrado = await Album.findByIdAndDelete(id);
  
      return res.status(200).json(albumBorrado);
    } catch (error) {
      return next(error);
    }
  };
  
  const patchAlbum = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const patchAlbum = new Album(req.body);
  
      patchAlbum._id = id;
  
      const ALbumDB = await Album.findByIdAndUpdate(id, patchAlbum);
      if (ALbumDB.foto) {
          deletefile(ALbumDB.foto);
      }
      if (req.file){
        patchAlbum.foto = req.file.path;
      }
  
      return res.status(200).json({ nuevo: patchAlbum, vieja: ALbumDB });
    } catch (error) {
      return next(error);
    }
  };

module.exports = {

    getAllAlbums,
    getAlbumByID,
    createAlbum,
    patchAlbum,
    deleteAlbum
    
};