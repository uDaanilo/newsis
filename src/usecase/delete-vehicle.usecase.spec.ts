import { CreateVehicleUseCase } from "./create-vehicle.usecase"
import { VehicleInMemoryRepository } from "../infra/repositories/vehicle/vehicle-in-memory.repository"
import { FindVehicleUseCase } from "./find-vehicle.usecase"
import { DeleteVehicleUseCase } from "./delete-vehicle.usecase"

describe("create vehicle use case suite tests", () => {
	test("should delete a vehicle", async () => {
		const vehicleRepository = new VehicleInMemoryRepository()
		const createUseCase = new CreateVehicleUseCase(vehicleRepository)
		const deleteUseCase = new DeleteVehicleUseCase(vehicleRepository)
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

		await deleteUseCase.execute({ id: 1 })
		const vehicle = await findUseCase.execute({ id: 1 })

		expect(vehicle).toBeNull()
	})
})