import { Vehicle, VehiclePicture } from "../domain/vehicle.entity"
import { VehicleRepository } from "../domain/vehicle.repository"
import { InputCreatevehicleDto, OutputCreateVehicleDto } from "./create-vehicle.dto"

export class CreateVehicleUseCase {
	constructor(private vehicleRepo: VehicleRepository) {}

	public async execute(input: InputCreatevehicleDto): Promise<OutputCreateVehicleDto> {
		const pictures: VehiclePicture[] = []
		if(input.pictures?.length) {
			let nextPictureId = await this.vehicleRepo.getNextPictureId()

			for(const file of input.pictures) {
				pictures.push({
					id: nextPictureId,
					file
				})
				nextPictureId += 1
			}
		}

		const vehicle = new Vehicle({
			id: await this.vehicleRepo.getNextVehicleId(),
			cubage: input.cubage,
			height: input.height,
			length: input.length,
			plate: input.plate,
			tracked: input.tracked,
			width: input.width,
			pictures
		})

		await this.vehicleRepo.create(vehicle)

		return vehicle.toJSON()
	}
}