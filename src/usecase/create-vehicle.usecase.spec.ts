import { CreateVehicleUseCase } from "./create-vehicle.usecase"
import { VehicleInMemoryRepository } from "../infra/repositories/vehicle/vehicle-in-memory.repository"

describe("create vehicle use case suite tests", () => {
	test("should create a new vehicle", async () => {
		const vehicleRepository = new VehicleInMemoryRepository()
		const createUseCase = new CreateVehicleUseCase(vehicleRepository)

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
	})

	test("should throw when creating a invalid vehicle", async () => {
		const vehicleRepository = new VehicleInMemoryRepository()
		const createUseCase = new CreateVehicleUseCase(vehicleRepository)

		const input = {
			cubage: 1,
			height: 1,
			length: 1,
			plate: "12345678",
			tracked: false,
			width: 1,
			pictures: [Buffer.from("foo"), Buffer.from("bar")]
		}

		await expect(createUseCase.execute(input)).rejects.toThrow()
	})
})