import "dotenv"
import { Api } from "./config/express"

const api = new Api()

const PORT = process.env.PORT || 3000
api.app.listen(PORT, () => {
	console.log(`Running on ${PORT}`)
})