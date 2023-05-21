import { exec } from "node:child_process"
import dotenv from "dotenv"
import NodeEnvironment from "jest-environment-node"
import mysql from "mysql2/promise"
import util from "node:util"
import type { JestEnvironmentConfig, EnvironmentContext } from "@jest/environment"
import crypto from "node:crypto"

dotenv.config({ path: ".env.test" })

const execSync = util.promisify(exec)

const prismaBinary = "./node_modules/.bin/prisma"

export default class PrismaTestEnvironment extends NodeEnvironment {
	private readonly dbUser = process.env.DATABASE_USER
	private readonly dbPass = process.env.DATABASE_PASS
	private readonly dbHost = process.env.DATABASE_HOST
	private readonly dbName = `${process.env.DATABASE_NAME}${crypto.randomBytes(4).toString("hex")}`
	private readonly connectionString = `mysql://${this.dbUser}:${this.dbPass}@${this.dbHost}:3306/${this.dbName}`

	constructor(config: JestEnvironmentConfig, ctx: EnvironmentContext) {
		super(config, ctx)
	}

	async setup() {
		process.env.DATABASE_URL = this.connectionString
		this.global.process.env.DATABASE_URL = this.connectionString

		await execSync(`${prismaBinary} migrate deploy`)

		return super.setup()
	}

	async teardown() {
		const connection = await mysql.createConnection(this.connectionString)

		await connection.query(`DROP DATABASE IF EXISTS ${this.dbName}`)
		await connection.end()
	}
}