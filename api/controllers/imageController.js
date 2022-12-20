import { Image } from '../models/index.js';

const getAllImages = async (_, res) => {
  try {
    const allImages = await Image.find();

    console.log('Todas las imagenes obtenidas');

    return res.json({
      message: 'Todas las imagenes obtenidas',
      data: allImages,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener las imagenes',
      data: error.message,
    });
  }
};

const getOneImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const getImage = await Image.findById(id);
    if (!getImage) {
      return res.status(404).json({
        message: 'Imagen no encontrada',
      });
    };

    console.log('Imagen obtenida');

    return res.json({
      message: 'Imagen obtenida',
      data: getImage,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener la imagen',
      data: error.message,
    });
  }
};

const uploadImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const uploadImage = await Image.findByIdAndUpdate(id, req.body);

    console.log('Imagen actualizada con exito');

    return res.json({
      message: 'Imagen actualizada',
      data: uploadImage,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al actualizar la imagen',
      data: error.message,
    });
  }
};

const deleteImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteImage = await Image.findByIdAndDelete(id);
    
    console.log('Imagen eliminada con exito');

    return res.json({
      message: 'Imagen eliminada',
      data: deleteImage,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error ',
      data: error.message,
    });
  }
};

export {
  getAllImages,
  getOneImageById,
  uploadImageById,
  deleteImageById,
}
