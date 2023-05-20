import { VehicleRepository } from "../domain/vehicle.repository"
import { OutputListAllVehiclesDto } from "./list-all-vehicles.dto"

export class ListAllVehiclesUseCase {
	constructor(private vehicleRepo: VehicleRepository) {}
  
	async execute(): Promise<OutputListAllVehiclesDto[]> {
		return (await this.vehicleRepo.findAll()).map(vehicle => vehicle.toJSON())
	}
}