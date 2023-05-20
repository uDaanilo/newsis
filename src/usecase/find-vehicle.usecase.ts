import { VehicleRepository } from "../domain/vehicle.repository"
import { InputFindVehicleUseCaseDto, OutputFindVehicleDto } from "./find-vehicle.dto"

export class FindVehicleUseCase {
	constructor(private vehicleRepo: VehicleRepository) {}

	public async execute(input: InputFindVehicleUseCaseDto): Promise<OutputFindVehicleDto | null> {
		const vehicle = await this.vehicleRepo.findById(input.id)
    
		return vehicle ? vehicle?.toJSON() : null
	}
}