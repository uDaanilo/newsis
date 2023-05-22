import request from "supertest"
import { Api } from "../config/express"
import { prisma } from "../config/prisma"

const app = new Api().app
describe("End to End vehicle tests", () => {
	afterEach(async () => {
		await prisma.veiculo.deleteMany()
		await prisma.$disconnect()
	})

	test("should create a new vehicle", async () => {
		const res = await request(app)
			.post("/vehicles/create")
			.field("placa", "1234567")
			.field("rastreado", "false")
			.field("comprimento", "2.75")
			.field("largura", "1.90")
			.field("altura", "3.89")
			.field("cubagem", "2")
			.attach("fotos", Buffer.from("foo"), {
				filename: "test.png",
				contentType: "image/png"
			})

		expect(res.status).toBe(201)
		expect(res.body.fotos).toHaveLength(1)
	})

	test("should update a vehicle", async () => {
		const res1 = await request(app)
			.post("/vehicles/create")
			.field("placa", "1234567")
			.field("rastreado", "false")
			.field("comprimento", "2.75")
			.field("largura", "1.90")
			.field("altura", "3.89")
			.field("cubagem", "2")
			.expect(201)

		await request(app)
			.put(`/vehicles/update/${res1.body.id}`)
			.field("placa", "7777777")
			.expect(200)

		const res3 = await request(app)
			.get(`/vehicles/${res1.body.id}`)
			.expect(200)

		expect(res3.body.placa).toBe("7777777")
	})
  
	test("should delete a vehicle", async () => {
		const res1 = await request(app)
			.post("/vehicles/create")
			.field("placa", "1234567")
			.field("rastreado", "false")
			.field("comprimento", "2.75")
			.field("largura", "1.90")
			.field("altura", "3.89")
			.field("cubagem", "2")
			.expect(201)

		await request(app)
			.delete(`/vehicles/delete/${res1.body.id}`)
			.expect(200)

		await request(app)
			.get(`/vehicles/${res1.body.id}`)
			.expect(404)
	})

	test("should get a vehicle by id", async () => {
		const res1 = await request(app)
			.post("/vehicles/create")
			.field("placa", "1234567")
			.field("rastreado", "false")
			.field("comprimento", "2.75")
			.field("largura", "1.90")
			.field("altura", "3.89")
			.field("cubagem", "2")
			.expect(201)

		const res2 = await request(app)
			.get(`/vehicles/${res1.body.id}`)
			.expect(200)

		expect(res2.body.placa).toBe("1234567")
		expect(res2.body.rastreado).toBe(false)
		expect(res2.body.comprimento).toBe(2.75)
		expect(res2.body.largura).toBe(1.90)
		expect(res2.body.altura).toBe(3.89)
		expect(res2.body.cubagem).toBe(2)
	})

	test("should list all vehicles", async () => {
		await request(app)
			.post("/vehicles/create")
			.field("placa", "1234567")
			.field("rastreado", "false")
			.field("comprimento", "2.75")
			.field("largura", "1.90")
			.field("altura", "3.89")
			.field("cubagem", "2")
			.expect(201)

		await request(app)
			.post("/vehicles/create")
			.field("placa", "1234567")
			.field("rastreado", "false")
			.field("comprimento", "2.75")
			.field("largura", "1.90")
			.field("altura", "3.89")
			.field("cubagem", "2")
			.expect(201)

		await request(app)
			.post("/vehicles/create")
			.field("placa", "1234567")
			.field("rastreado", "false")
			.field("comprimento", "2.75")
			.field("largura", "1.90")
			.field("altura", "3.89")
			.field("cubagem", "2")
			.expect(201)

		const res = await request(app)
			.get("/vehicles")
			.expect(200)

		expect(res.body).toHaveLength(3)
	})

	test("should get vehicle picture", async () => {
		const res = await request(app)
			.post("/vehicles/create")
			.field("placa", "1234567")
			.field("rastreado", "false")
			.field("comprimento", "2.75")
			.field("largura", "1.90")
			.field("altura", "3.89")
			.field("cubagem", "2")
			.attach("fotos", Buffer.from("foo"), {
				filename: "test.png",
				contentType: "image/png"
			})
			.expect(201)

		const res2 = await request(app)
			.get(`/vehicles/${res.body.id}/pictures/${res.body.fotos[0].id}`)
			.expect(200)

		expect(res2.text).toBe("foo")
	})

	test("should create vehicle picture", async () => {
		const res = await request(app)
			.post("/vehicles/create")
			.field("placa", "1234567")
			.field("rastreado", "false")
			.field("comprimento", "2.75")
			.field("largura", "1.90")
			.field("altura", "3.89")
			.field("cubagem", "2")
			.attach("fotos", Buffer.from("foo"), {
				filename: "test.png",
				contentType: "image/png"
			})
			.expect(201)

		await request(app)
			.post(`/vehicles/${res.body.id}/pictures/create`)
			.attach("foto", Buffer.from("bar"), {
				filename: "test.png",
				contentType: "image/png"
			})
			.expect(200)

		const res2 = await request(app)
			.get(`/vehicles/${res.body.id}`)
			.expect(200)

		expect(res2.body.fotos).toHaveLength(2)
	})

	test("should update a vehicle picture", async () => {
		const res = await request(app)
			.post("/vehicles/create")
			.field("placa", "1234567")
			.field("rastreado", "false")
			.field("comprimento", "2.75")
			.field("largura", "1.90")
			.field("altura", "3.89")
			.field("cubagem", "2")
			.attach("fotos", Buffer.from("foo"), {
				filename: "test.png",
				contentType: "image/png"
			})
			.expect(201)

		await request(app)
			.put(`/vehicles/${res.body.id}/pictures/update/${res.body.fotos[0].id}`)
			.attach("foto", Buffer.from("bar"), {
				filename: "test.png",
				contentType: "image/png"
			})
			.expect(200)
    
		const res2 = await request(app)
			.get(`/vehicles/${res.body.id}/pictures/${res.body.fotos[0].id}`)
			.expect(200)

		expect(res2.text).toBe("bar")
	})

	test("should delete a vehicle picture", async () => {
		const res = await request(app)
			.post("/vehicles/create")
			.field("placa", "1234567")
			.field("rastreado", "false")
			.field("comprimento", "2.75")
			.field("largura", "1.90")
			.field("altura", "3.89")
			.field("cubagem", "2")
			.attach("fotos", Buffer.from("foo"), {
				filename: "test.png",
				contentType: "image/png"
			})
			.expect(201)

		await request(app)
			.delete(`/vehicles/${res.body.id}/pictures/delete/${res.body.fotos[0].id}`)
			.expect(200)
    
		await request(app)
			.get(`/vehicles/${res.body.id}/pictures/${res.body.fotos[0].id}`)
			.expect(404)
	})
})