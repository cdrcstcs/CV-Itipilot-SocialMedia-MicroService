import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import multer from "multer";
import path from "path";
import { getImageById, uploadImage } from "./controllers/image.js";
const app = express();
app.use(express.json());
app.use(cors());
const MONGO_URL = "mongodb://localhost:27017/mongo-golang";
const PORT = 3000;
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use(express.static('uploads'));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });
app.post('/upload', upload.single('file'), uploadImage);
app.get('/images/:id', getImageById);
mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, 'localhost' ,() => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
