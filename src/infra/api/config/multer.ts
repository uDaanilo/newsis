import multer from "multer"

const upload = multer({
	fileFilter(req, file, cb) {
		if(!file.mimetype.startsWith("image")) {
			req.invalidFileType = true
			return cb(null, false)
		}

		return cb(null, true)
	},
})

export { upload }