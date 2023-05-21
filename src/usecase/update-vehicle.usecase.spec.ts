import { CreateVehicleUseCase } from "./create-vehicle.usecase"
import { VehicleInMemoryRepository } from "../infra/repositories/vehicle/vehicle-in-memory.repository"
import { UpdateVehicleUseCase } from "./update-vehicle.usecase"
import { FindVehicleUseCase } from "./find-vehicle.usecase"

describe("create vehicle use case suite tests", () => {
	test("should update a vehicle", async () => {
		const vehicleRepository = new VehicleInMemoryRepository()
		const createUseCase = new CreateVehicleUseCase(vehicleRepository)
		const updateUseCase = new UpdateVehicleUseCase(vehicleRepository)
		const findUseCase = new FindVehicleUseCase(vehicleRepository)

		const input = {
			cubage: 1,
			height: 1,
			length: 1,
			plate: "1234567",
			tracked: false,
			width: 1,
			pictures: [Buffer.from("foo"), Buffer.from("bar")]
		}

		await createUseCase.execute(input)

		expect(vehicleRepository.items.size).toBe(1)
		expect(vehicleRepository.items.get(1)).toBeDefined()

		await updateUseCase.execute({
			id: 1,
			cubage: 2,
			height: 2,
			length: 2,
			plate: "7777777",
			tracked: false,
			width: 2,
		})

		const vehicle = await findUseCase.execute({ id: 1 })

		expect(vehicle?.plate).toBe("7777777")
	})

	test("should update a vehicle pictures", async () => {
		const vehicleRepository = new VehicleInMemoryRepository()
		const createUseCase = new CreateVehicleUseCase(vehicleRepository)
		const updateUseCase = new UpdateVehicleUseCase(vehicleRepository)
		const findUseCase = new FindVehicleUseCase(vehicleRepository)

		const input = {
			cubage: 1,
			height: 1,
			length: 1,
			plate: "1234567",
			tracked: false,
			width: 1,
			pictures: [Buffer.from("foo"), Buffer.from("bar")]
		}

		await createUseCase.execute(input)

		expect(vehicleRepository.items.size).toBe(1)
		expect(vehicleRepository.items.get(1)).toBeDefined()

		await updateUseCase.execute({
			id: 1,
			pictures: [Buffer.from("baz")]
		})

		const vehicle = await findUseCase.execute({ id: 1 })

		expect(vehicle?.pictures).toHaveLength(3)
		expect(vehicle?.pictures[2].file.toString()).toBe("baz")
	})

	test("should update a vehicle picture by id", async () => {
		const vehicleRepository = new VehicleInMemoryRepository()
		const createUseCase = new CreateVehicleUseCase(vehicleRepository)
		const updateUseCase = new UpdateVehicleUseCase(vehicleRepository)
		const findUseCase = new FindVehicleUseCase(vehicleRepository)

		const input = {
			cubage: 1,
			height: 1,
			length: 1,
			plate: "1234567",
			tracked: false,
			width: 1,
			pictures: [Buffer.from("foo")]
		}

		await createUseCase.execute(input)

		expect(vehicleRepository.items.size).toBe(1)
		expect(vehicleRepository.items.get(1)).toBeDefined()

		await updateUseCase.execute({
			id: 1,
			pictures: [
				{
					id: 1,
					file: Buffer.from("bar")
				}
			]
		})

		const vehicle = await findUseCase.execute({ id: 1 })

		expect(vehicle?.pictures).toHaveLength(1)
		expect(vehicle?.pictures[0].file.toString()).toBe("bar")
	})

	test("should throw when updating a picture with invalid id", async () => {
		const vehicleRepository = new VehicleInMemoryRepository()
		const createUseCase = new CreateVehicleUseCase(vehicleRepository)
		const updateUseCase = new UpdateVehicleUseCase(vehicleRepository)

		const input = {
			cubage: 1,
			height: 1,
			length: 1,
			plate: "1234567",
			tracked: false,
			width: 1,
			pictures: [Buffer.from("foo")]
		}

		await createUseCase.execute(input)

		expect(vehicleRepository.items.size).toBe(1)
		expect(vehicleRepository.items.get(1)).toBeDefined()

		await expect(
			updateUseCase.execute({
				id: 1,
				pictures: [
					{
						id: 2,
						file: Buffer.from("bar")
					}
				]
			})
		)
			.rejects
			.toThrow("Picture not found")
	})

	test("should remove a vehicle picture", async () => {
		const vehicleRepository = new VehicleInMemoryRepository()
		const createUseCase = new CreateVehicleUseCase(vehicleRepository)
		const updateUseCase = new UpdateVehicleUseCase(vehicleRepository)
		const findUseCase = new FindVehicleUseCase(vehicleRepository)

		const input = {
			cubage: 1,
			height: 1,
			length: 1,
			plate: "1234567",
			tracked: false,
			width: 1,
			pictures: [Buffer.from("foo")]
		}

		await createUseCase.execute(input)

		expect(vehicleRepository.items.size).toBe(1)
		expect(vehicleRepository.items.get(1)).toBeDefined()

		await updateUseCase.execute({
			id: 1,
			pictures: [
				{
					id: 1,
					file: null
				}
			]
		})

		const vehicle = await findUseCase.execute({ id: 1 })

		expect(vehicle?.pictures).toHaveLength(0)
	})
})