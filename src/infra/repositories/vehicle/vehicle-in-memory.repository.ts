import { Vehicle, VehiclePicture } from "../../../domain/vehicle.entity"
import { VehicleRepository } from "../../../domain/vehicle.repository"

export class VehicleInMemoryRepository implements VehicleRepository {
	public items = new Map<number, Vehicle>()

	async findById(id: number): Promise<Vehicle | null> {
		return this.items.get(id) || null
	}

	async findAll(): Promise<Vehicle[]> {
		const vehicles: Vehicle[] = []

		this.items.forEach(vehicle => vehicles.push(vehicle))

		return vehicles
	}

	async create(vehicle: Vehicle): Promise<void> {
		this.items.set(vehicle.id, vehicle)
	}

	async update(vehicle: Vehicle): Promise<void> {
		this.items.set(vehicle.id, vehicle)
	}

	async deleteById(id: number): Promise<void> {
		this.items.delete(id)
	}

	async findPicturesByVehicleId(id: number): Promise<VehiclePicture[]> {
		const vehicle = this.items.get(id)

		return vehicle?.pictures || []
	}

	async findVehiclePictureById(id: number): Promise<VehiclePicture | null> {
		let picture: VehiclePicture | null = null

		this.items.forEach(vehicle => {
			picture = vehicle.pictures.find(pic => pic.id === id) || null
		})

		return picture
	}

	async getNextVehicleId(): Promise<number> {
		return this.items.size + 1
	}

	async getNextPictureId(): Promise<number> {
		let pictures: VehiclePicture[] = []

		this.items.forEach(vehicle => {
			pictures.push(...vehicle.pictures)
		})

		pictures = pictures.sort((a, b) => {
			return a.id > b.id ? 1 : -1
		})

		return (pictures.at(-1)?.id || 0) + 1
	}
}