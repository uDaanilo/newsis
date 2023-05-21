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

		let nextPictureId = await this.vehicleRepo.getNextPictureId()
		for(const picture of input.pictures) {
			if(picture instanceof Buffer) {
				vehicle.addPicture(nextPictureId, picture)
				nextPictureId += 1
			} else {
				if(!picture.file)
					vehicle.removePicture(picture.id)
				else
					vehicle.updatePicture(picture.id, picture.file)
			}
		}

		await this.vehicleRepo.update(vehicle)
	}
}