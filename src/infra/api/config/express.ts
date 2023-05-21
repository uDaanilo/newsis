import express, { NextFunction, Request, Response } from "express"
import "express-async-errors"
import routes from "./routes"
import { errors } from "celebrate"

export class Api {
	public app = express()

	constructor() {
		this.registerMiddlewares()
		this.registerRoutes()
		this.exceptionHandler()
	}

	private registerRoutes() {
		this.app.use(routes)
	}

	private registerMiddlewares() {
		this.app.use(express.urlencoded())
		this.app.use(express.json())
	}

	private exceptionHandler() {
		this.app.use(errors())
		/* eslint-disable @typescript-eslint/no-unused-vars */
		this.app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
			console.error(err)
			res.sendStatus(500)
		})
	}
}