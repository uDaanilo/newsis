import { CreateVehicleUseCase } from "./create-vehicle.usecase"
import { VehicleInMemoryRepository } from "../infra/repositories/vehicle/vehicle-in-memory.repository"
import { FindVehicleUseCase } from "./find-vehicle.usecase"

describe("find vehicle use case suite tests", () => {
	test("should find a vehicle by id", async () => {
		const vehicleRepository = new VehicleInMemoryRepository()
		const createUseCase = new CreateVehicleUseCase(vehicleRepository)
		const finduseCase = new FindVehicleUseCase(vehicleRepository)

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

		const vehicle = await finduseCase.execute({ id: 1 })
		
		expect(vehicle).toBeDefined()
		expect(vehicle?.id).toBe(1)
	})
})