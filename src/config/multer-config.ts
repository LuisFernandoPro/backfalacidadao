import multer from "multer"
import logger from "./logger";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const tempFolder = process.env.TMP;
        logger.info(tempFolder)
        cb(null, `${tempFolder}`)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname.substring(file.originalname.indexOf('.')))
    }
  })
  
  const upload = multer({ storage: storage })

  export { upload };