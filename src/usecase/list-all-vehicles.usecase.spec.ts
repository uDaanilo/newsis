import { CreateVehicleUseCase } from "./create-vehicle.usecase"
import { VehicleInMemoryRepository } from "../infra/repositories/vehicle/vehicle-in-memory.repository"
import { ListAllVehiclesUseCase } from "./list-all-vehicles.usecase"

describe("list all vehicles use case suite tests", () => {
	test("should list all vehicles", async () => {
		const vehicleRepository = new VehicleInMemoryRepository()
		const createUseCase = new CreateVehicleUseCase(vehicleRepository)
		const listAllUseCase = new ListAllVehiclesUseCase(vehicleRepository)

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

		const vehicles = await listAllUseCase.execute()
		
		expect(vehicles).toHaveLength(1)
		expect(vehicles[0].plate).toBe(input.plate)
	})
})