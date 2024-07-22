require('dotenv').config()
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware');
const fileService = require('./service/file-service');

const PORT = process.env.PORT || 3666;
const app = express();

app.use('/upload', fileService.uploadFile.single('file'), (req, res) => {
  if (!req.file) return res.sendStatus(400)

  // формируем относительный путь к файлу
  const relativeFilePath = req.file.path
    .replace(/\\/g, '/')
    .split('server/files')[1]

  // и возвращаем его
  res.status(201).json(relativeFilePath)
})

app.use('/files', (req, res) => {
  // формируем абсолютный путь к файлу
  const filePath = fileService.getFilePath(req.url)

  // и возвращаем файл по этому пути
  res.status(200).sendFile(filePath)
})

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}));
app.use('/api', router);
app.use(errorMiddleware);

const server = createServer(app);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    server.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

const io = new Server(server, {
  origin: process.env.CLIENT_URL,
  serveClient: false
})

io.on('connection', (socket) => {
  onConnection(io, socket)
  console.log('connection')
})

start();

