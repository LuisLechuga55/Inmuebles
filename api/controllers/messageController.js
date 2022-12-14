import { Message, Property } from '../models/index.js';

const createMessage = async (req, res) => {
  try {
    const newMessage = await Message.create(req.body);
    const property = await Property.findById(req.params.id);

    property.messages.push(newMessage.id);
    await property.save();

    console.log('Mensaje creado con éxito');

    return res.json({
      message: 'Mensaje creado con éxito',
      data: newMessage,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al crear el mensaje',
      data: error.message,
    });
  }
};

const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findById(id).populate('messages');

    console.log('Mensaje obtenido con éxito');

    return res.json({
      message: 'Mensajes obtenidos de la propiedad con éxito',
      data: message,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener el mensaje',
      data: error.message,
    });
  }
};

const getAllMessage = async (req, res) => {
  try {
    const message = await Message.find();

    console.log('Mensajes obtenidos con éxito');

    return res.json({
      message: 'Mensajes obtenidos con éxito',
      data: message,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener todos los mensajes',
      data: error.message,
    });
  }
};

const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const messageUpdate = await Message.findById(id, req.body);

    console.log('Mensaje actualizado con éxito');

    return res.json({
      message: 'Mensaje actualizado con éxito',
      data: messageUpdate,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al actualizar el mensaje',
      data: error.message,
    });
  }
};

const deleteMessageById = async (req, res) => {
  try {
    const { id, messageId } = req.params;
    const foundProperty = await Property.findById(id);
    const message = await Message.deleteById(messageId);

    const index = foundProperty.messages.indexOf(messageId);
    if (index > -1) {
      foundProperty.messages.splice(index, 1);
      await foundProperty.save();
    };

    console.log('Mensaje eliminado con éxito');

    return res.json({
      message: 'Mensaje eliminado con éxito',
      data: message,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al eliminar el mensaje',
      data: error.message,
    });
  }
};

export {
  createMessage,
  getMessageById,
  getAllMessage,
  updateMessage,
  deleteMessageById,
};