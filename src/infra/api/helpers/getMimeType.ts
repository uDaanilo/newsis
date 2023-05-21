import mmm from "mmmagic"

export function getMimeType(file: Buffer): Promise<string> {
	return new Promise((resolve, reject) => {
		new mmm.Magic(mmm.MAGIC_MIME_TYPE).detect(file, (err, result) => {
			if(err) return reject(err)
      
      
			if(typeof result === "string")
				return resolve(result)

			resolve(result[0])
		})
	})
}