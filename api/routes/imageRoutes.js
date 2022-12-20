import express from 'express';
import multer from 'multer';
import fs from 'fs'
import { imageController } from '../controllers/index.js';
import { Image } from '../models/index.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage })

/* router.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    }
    else {
      const newImage = new Image({
        name: req.body.name,
        image: {
          data: req.file.filename,
          contentType: 'image/png',
        }
      });
      newImage.save()
        .then(() => 
          res.send('Successfully uploaded'))
        .catch((err) =>
          console.log(err));
    }
    console.log('Image uploaded');
  });
}); */

router.post('/', upload.single('testImage'), (req, res) => {
  const saveImage = new Image({
    name: req.body.name,
    image: {
      data: fs.readFileSync('uploads/' + req.file.filename),
      contentType: 'image/png',
    }
  });
  saveImage.save()
    .then(() => {
      res.send('Successfully uploaded')
      console.log('Image saved')
    })
    .catch((err) => {
      console.log(err, 'Image not saved')
    });
});

router
  .route('/')
  .get(imageController.getAllImages);

router
  .route('/:id')
  .get(imageController.getOneImageById)

router
  .route('/:id/destroy')
  .delete(imageController.deleteImageById);

export default router;
