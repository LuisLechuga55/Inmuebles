import { Property } from '../models/index.js';

const createProperty = async (req, res) => {
  try {
    const newProperty = await Property.create(req.body);

    console.log('Nuevo inmueble creado');

    return res.json({
      message: 'Nuevo inmueble creado',
      data: newProperty,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      data: error.message,
    });
  }
};

const getAllProperty = async (req, res) => {
  try {
    const allProperty = await Property.find();

    console.log('Todos los inmuebles obtenidos');

    return res.json({
      message: 'Todos los inmuebles obtenidos',
      data: allProperty,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      data: error.message,
    });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).jdon({
        message: 'Inmueble no encontrado',
      });
    };

    console.log('Inmueble obtenido');

    return res.json({
      message: 'Inmueble obtenido',
      data: property,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      data: error.message,
    });
  }
};

const updatePropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateProperty = await Property.findByIdAndUpdate(id, req.body);

    console.log('Inmueble actualizado con éxito');

    return res.json({
      message: 'Inmueble actualizado con éxito',
      data: updateProperty,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      data: error.message,
    });
  }
};

const deletePropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProperty = await Property.findByIdAndDelete(id);

    console.log('Inmueble eliminado con éxito');

    return res.json({
      message: 'Inmueble eliminado con éxito',
      data: deleteProperty,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      data: error.message,
    });
  }
};

export {
  createProperty,
  getAllProperty,
  getPropertyById,
  updatePropertyById,
  deletePropertyById,
};
