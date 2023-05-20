import { VehicleRepository } from "../domain/vehicle.repository"
import { InputUpdateVehicleUseCase } from "./update-vehicle.dto"

export class UpdateVehicleUseCase {
	constructor(private vehicleRepo: VehicleRepository) {}

	public async execute(input: InputUpdateVehicleUseCase): Promise<void> {
		const vehicle = await this.vehicleRepo.findById(input.id)

		if(!vehicle) return

		input.pictures = input.pictures || []
		vehicle.updateCubage(input.cubage ?? vehicle.cubage)
		vehicle.updateHeight(input.height ?? vehicle.height)
		vehicle.updateLength(input.length ?? vehicle.length)
		vehicle.updatePlate(input.plate ?? vehicle.plate)
		vehicle.updateTracked(input.tracked ?? vehicle.tracked)
		vehicle.updateWitdh(input.width ?? vehicle.width)

		for(const picture of input.pictures) {
			vehicle.addPicture(await this.vehicleRepo.getNextPictureId(), picture)
		}

		await this.vehicleRepo.update(vehicle)
	}
}