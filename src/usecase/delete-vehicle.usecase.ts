import { VehicleRepository } from "../domain/vehicle.repository"
import { InputDeleteVehicleDto } from "./delete-vehicle.dto"

export class DeleteVehicleUseCase {
	constructor(private vehicleRepo: VehicleRepository) {}
  
	async execute(input: InputDeleteVehicleDto): Promise<void> {
		await this.vehicleRepo.deleteById(input.id)
	}
}