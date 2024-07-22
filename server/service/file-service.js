const { unlink } = require('fs/promises');
const { join } = require('path');
const { existsSync, mkdirSync } = require('fs');
const multer = require('multer');
const ApiError = require('../exceptions/api-error');

class FileService {
  fileDir = join(__dirname, '../files');

  uploadFile = multer({
    storage: multer.diskStorage({
      // директория для записи файлов
      destination: async (req, _, cb) => {
        // извлекаем идентификатор комнаты из HTTP-заголовка `X-Room-Id`
        const roomId = req.headers['x-room-id']
        // файлы хранятся по комнатам
        // название директории - идентификатор комнаты
        const dirPath = join(__dirname, '../files', roomId)

        // создаем директорию при отсутствии
        if (!existsSync(dirPath)) {
          mkdirSync(dirPath, { recursive: true })
        }

        cb(null, dirPath)
      },
      filename: (_, file, cb) => {
        // названия файлов могут быть одинаковыми
        // добавляем к названию время с начала эпохи и дефис
        const fileName = `${Date.now()}-${file.originalname}`

        cb(null, fileName)
      }
    })
  })

  getFilePath(filePath) {
    return join(this.fileDir, filePath)
  }

  async removeFile() {
    try {
      await unlink(join(fileDir, filePath))
    } catch (e) {
      ApiError.BadRequest('Ошибка при удаление файла!')
    }
  }
}

module.exports = new FileService();