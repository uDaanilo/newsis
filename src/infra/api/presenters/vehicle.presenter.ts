import { OutputCreateVehicleDto } from "../../../usecase/create-vehicle.dto"
import { OutputListAllVehiclesDto } from "../../../usecase/list-all-vehicles.dto"

export class VehiclePresenter {
	static toJSON(vehicle: OutputCreateVehicleDto | OutputListAllVehiclesDto[]) {
		function formatVehicle(v: OutputCreateVehicleDto) {
			const pictures = v.pictures.map(pic => ({
				id: pic.id,
				source: `${process.env.APPLICATION_BASE_URL}/vehicles/${v.id}/pictures/${pic.id}`
			}))

			return {
				id: v.id,
				placa: v.plate,
				rastreado: v.tracked,
				comprimento: v.length,
				largura: v.width,
				altura: v.height,
				cubagem: v.cubage,
				fotos: pictures
			}
		}

		if(Array.isArray(vehicle))
			return vehicle.map(v => formatVehicle(v))

		return formatVehicle(vehicle)
	}
}
