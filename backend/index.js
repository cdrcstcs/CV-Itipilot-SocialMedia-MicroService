import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import multer from "multer";
import path from "path";
import { getImageById, uploadImage } from "./controllers/image.js";
import Image from "./models/Image.js";
import User from "./models/User.js";
import { generateImageData, generateUsers, generatePosts } from "./data.js";
import Post from "./models/Post.js";
import 'dotenv/config';
const app = express();
app.use(express.json());
app.use(cors());
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
mongoose.connect(process.env.MONGO_URL).then(async () => {
  await Image.deleteMany();
  await User.deleteMany();
  await Post.deleteMany();
  await Image.insertMany(generateImageData());
  await User.insertMany(await generateUsers());
  await Post.insertMany(await generatePosts());
  app.listen(process.env.PORT, () => console.log(`Server running on PORT: ${process.env.PORT}`));
}).catch((error) => console.log(`${error} did not connect`));

