import { PrismaClient } from "@prisma/client"
import { Vehicle } from "../../../domain/vehicle.entity"
import { VehicleMySqlRepository } from "./vehicle-mysql.repository"

describe("Vehicle mysql repository tests suite", () => {
	let prisma: PrismaClient
	beforeAll(() => {
		prisma = new PrismaClient()
	})

	afterEach(async () => {
		await prisma.veiculo.deleteMany()
		prisma.$disconnect()
	})
  
	test("should list all vehicles", async () => {
		const vehicle1 = new Vehicle({
			id: 3,
			cubage: 1,
			height: 1,
			length: 1,
			pictures: [],
			plate: "1234567",
			tracked: true,
			width: 1
		})
		const vehicle2 = new Vehicle({
			id: 4,
			cubage: 2,
			height: 2,
			length: 2,
			pictures: [],
			plate: "2234567",
			tracked: true,
			width: 2
		})

		await prisma.veiculo.createMany({
			data: [
				{
					id: vehicle1.id,
					altura: vehicle1.height,
					comprimento: vehicle1.length,
					cubagem: vehicle1.cubage,
					largura: vehicle1.width,
					placa: vehicle1.plate,
					rastreado: vehicle1.tracked
				},
				{
					id: vehicle2.id,
					altura: vehicle2.height,
					comprimento: vehicle2.length,
					cubagem: vehicle2.cubage,
					largura: vehicle2.width,
					placa: vehicle2.plate,
					rastreado: vehicle2.tracked
				},
			]
		})

		const vehicleRepository = new VehicleMySqlRepository(prisma)
		const vehicles = await vehicleRepository.findAll()

		expect(vehicles).toHaveLength(2)
		expect(vehicles[0].plate).toBe(vehicle1.plate)
		expect(vehicles[1].plate).toBe(vehicle2.plate)
	})

	test("should create a new vehicle", async () => {
		const vehicle = new Vehicle({
			id: 1,
			cubage: 1,
			height: 1,
			length: 1,
			pictures: [],
			plate: "1234567",
			tracked: true,
			width: 1
		})
    
		const vehicleRepository = new VehicleMySqlRepository(prisma)
		await vehicleRepository.create(vehicle)
		const newVehicle = await vehicleRepository.findById(vehicle.id)

		expect(newVehicle?.id).toBe(vehicle.id)
	})

	test("should update a vehicle", async () => {
		const vehicle = new Vehicle({
			id: 1,
			cubage: 1,
			height: 1,
			length: 1,
			pictures: [],
			plate: "1234567",
			tracked: true,
			width: 1
		})

		const vehicleRepository = new VehicleMySqlRepository(prisma)
		await vehicleRepository.create(vehicle)
		const newVehicle = await vehicleRepository.findById(vehicle.id)

		expect(newVehicle?.id).toBe(vehicle.id)
		expect(newVehicle?.plate).toBe(vehicle.plate)

		const newPlate = "2234567"
		newVehicle?.updatePlate(newPlate)

		await vehicleRepository.update(newVehicle as Vehicle)
		const updatedVehicle = await vehicleRepository.findById(vehicle.id)

		expect(updatedVehicle?.plate).toBe(newPlate)
	})

	test("should delete a vehicle", async () => {
		const vehicle = new Vehicle({
			id: 1,
			cubage: 1,
			height: 1,
			length: 1,
			pictures: [],
			plate: "1234567",
			tracked: true,
			width: 1
		})

		const vehicleRepository = new VehicleMySqlRepository(prisma)
		await vehicleRepository.create(vehicle)
		const newVehicle = await vehicleRepository.findById(vehicle.id)

		expect(newVehicle?.id).toBe(vehicle.id)

		await vehicleRepository.deleteById(vehicle.id)

		const deletedVehicle = await vehicleRepository.findById(vehicle.id)

		expect(deletedVehicle).toBeNull()
	})

	test("should create a vehicle with pictures", async () => {
		const vehicle = new Vehicle({
			id: 1,
			cubage: 1,
			width: 1,
			height: 1,
			length: 1,
			pictures: [
				{
					id: 1,
					file: Buffer.from("foo")
				},
				{
					id: 2,
					file: Buffer.from("bar")
				},
			],
			plate: "1234567",
			tracked: false,
		})

		const vehicleRepository = new VehicleMySqlRepository(prisma)
		await vehicleRepository.create(vehicle)
		const newVehicle = await vehicleRepository.findById(vehicle.id)

		expect(newVehicle?.pictures).toHaveLength(2)
		expect(newVehicle?.pictures[0].file.toString()).toBe("foo")
		expect(newVehicle?.pictures[1].file.toString()).toBe("bar")
	})

	test("should delete all vehicle pictures when delete vehicle", async () => {
		const vehicle = new Vehicle({
			id: 1,
			cubage: 1,
			width: 1,
			height: 1,
			length: 1,
			pictures: [
				{
					id: 1,
					file: Buffer.from("foo")
				},
				{
					id: 2,
					file: Buffer.from("bar")
				},
			],
			plate: "1234567",
			tracked: false,
		})

		const vehicleRepository = new VehicleMySqlRepository(prisma)
		await vehicleRepository.create(vehicle)
		const newVehicle = await vehicleRepository.findById(vehicle.id)

		expect(newVehicle?.pictures).toHaveLength(2)
		expect(newVehicle?.pictures[0].file.toString()).toBe("foo")
		expect(newVehicle?.pictures[1].file.toString()).toBe("bar")

		await vehicleRepository.deleteById(vehicle.id)

		const vehiclePictures = await vehicleRepository.findPicturesByVehicleId(vehicle.id)

		expect(vehiclePictures).toHaveLength(0)
	})

	test("should find a vehicle picture by id", async () => {
		const vehicle = new Vehicle({
			id: 1,
			cubage: 1,
			width: 1,
			height: 1,
			length: 1,
			pictures: [
				{
					id: 1,
					file: Buffer.from("foo")
				},
			],
			plate: "1234567",
			tracked: false,
		})

		const vehicleRepository = new VehicleMySqlRepository(prisma)
		await vehicleRepository.create(vehicle)
		await vehicleRepository.findById(vehicle.id)

		const vehiclePicture = await vehicleRepository.findVehiclePictureById(vehicle.id)

		expect(vehiclePicture?.id).toBe(vehicle.pictures[0].id)
		expect(vehiclePicture?.file.toString()).toBe("foo")
	})

	test("should add a new picture on a vehicle", async () => {
		const vehicle = new Vehicle({
			id: 1,
			cubage: 1,
			width: 1,
			height: 1,
			length: 1,
			pictures: [
				{
					id: 1,
					file: Buffer.from("foo")
				},
			],
			plate: "1234567",
			tracked: false,
		})

		const vehicleRepository = new VehicleMySqlRepository(prisma)
		await vehicleRepository.create(vehicle)

		expect(vehicle.pictures).toHaveLength(1)

		vehicle.addPicture(2, Buffer.from("bar"))
		await vehicleRepository.update(vehicle)

		const updatedVehicle = await vehicleRepository.findById(vehicle.id)

		expect(updatedVehicle?.pictures).toHaveLength(2)
		expect(updatedVehicle?.pictures[1].id).toBe(2)
		expect(updatedVehicle?.pictures[1].file.toString()).toBe("bar")
	})

	test("should remove a vehicle picture", async () => {
		const vehicle = new Vehicle({
			id: 1,
			cubage: 1,
			width: 1,
			height: 1,
			length: 1,
			pictures: [
				{
					id: 1,
					file: Buffer.from("foo")
				},
				{
					id: 2,
					file: Buffer.from("bar")
				},
				{
					id: 3,
					file: Buffer.from("baz")
				},
			],
			plate: "1234567",
			tracked: false,
		})

		const vehicleRepository = new VehicleMySqlRepository(prisma)
		await vehicleRepository.create(vehicle)

		vehicle.removePicture(1)
		vehicle.removePicture(2)
		await vehicleRepository.update(vehicle)

		const updatedVehicle = await vehicleRepository.findById(vehicle.id)

		expect(updatedVehicle?.pictures).toHaveLength(1)
		expect(updatedVehicle?.pictures[0].id).toBe(3)
		expect(updatedVehicle?.pictures[0].file.toString()).toBe("baz")
	})

	test("should return next vehicle id", async () => {
		const vehicleRepository = new VehicleMySqlRepository(prisma)

		let nextId = await vehicleRepository.getNextVehicleId()

		expect(nextId).toBe(1)

		const vehicle = new Vehicle({
			id: 1,
			cubage: 1,
			width: 1,
			height: 1,
			length: 1,
			pictures: [],
			plate: "1234567",
			tracked: false,
		})

		await vehicleRepository.create(vehicle)

		nextId = await vehicleRepository.getNextVehicleId()
    
		expect(nextId).toBe(2)
	})

	test("should return next picture id", async () => {
		const vehicleRepository = new VehicleMySqlRepository(prisma)

		let nextId = await vehicleRepository.getNextPictureId()

		expect(nextId).toBe(1)

		const vehicle = new Vehicle({
			id: 1,
			cubage: 1,
			width: 1,
			height: 1,
			length: 1,
			pictures: [
				{
					id: 1,
					file: Buffer.from("foo")
				},
				{
					id: 2,
					file: Buffer.from("bar")
				},
			],
			plate: "1234567",
			tracked: false,
		})

		await vehicleRepository.create(vehicle)

		nextId = await vehicleRepository.getNextPictureId()

		expect(nextId).toBe(3)
	})
})