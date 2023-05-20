import { PrismaClient } from "@prisma/client"
import { Vehicle, VehiclePicture } from "../../../domain/vehicle.entity"
import { VehicleRepository } from "../../../domain/vehicle.repository"

export class VehicleMySqlRepository implements VehicleRepository {
	private prisma = new PrismaClient()
  
	async findVehiclePictureById(id: number): Promise<VehiclePicture | null> {
		const picture = await this.prisma.fotoVeiculo.findFirst({
			where: {
				id
			}
		})

		if(!picture) return null

		return {
			id: picture.id,
			file: picture.foto
		}
	}

	async findPicturesByVehicleId(id: number): Promise<VehiclePicture[]> {
		const pictures = await this.prisma.fotoVeiculo.findMany({
			where: {
				veiculo_id: id
			}
		})

		return pictures.map<VehiclePicture>(pic => ({
			id: pic.id,
			file: pic.foto
		}))
	}
  
	async findById(id: number): Promise<Vehicle | null> {
		const data = await this.prisma.veiculo.findFirst({
			where: {
				id
			},
			include: {
				fotos: true
			}
		})

		if(!data) return null

		const vehicle = new Vehicle({
			id: data.id,
			cubage: data.cubagem,
			height: data.altura,
			length: data.comprimento,
			pictures: data.fotos.map(f => ({
				id: f.id,
				file: f.foto
			})),
			plate: data.placa,
			tracked: data.rastreado,
			width: data.largura
		})

		return vehicle
	}

	async findAll(): Promise<Vehicle[]> {
		const vehicles = await this.prisma.veiculo.findMany({
			include: {
				fotos: true
			}
		})

		return vehicles.map(vehicle => {
			return new Vehicle({
				id: vehicle.id,
				cubage: vehicle.cubagem,
				height: vehicle.altura,
				length: vehicle.comprimento,
				pictures: vehicle.fotos.map(f => ({
					id: f.id,
					file: f.foto
				})),
				plate: vehicle.placa,
				tracked: vehicle.rastreado,
				width: vehicle.largura
			})
		})
	}

	async create(vehicle: Vehicle): Promise<void> {
		await this.prisma.veiculo.create({
			data: {
				id: vehicle.id,
				cubagem: vehicle.cubage,
				altura: vehicle.height,
				comprimento: vehicle.length,
				placa: vehicle.plate,
				rastreado: vehicle.tracked,
				largura: vehicle.width
			}
		})

		if(vehicle.pictures?.length) {
			for(const picture of vehicle.pictures) {
				await this.prisma.fotoVeiculo.create({
					data: {
						id: picture.id,
						foto: picture.file,
						veiculo_id: vehicle.id,
					}
				})
			}
		}
	}

	async update(vehicle: Vehicle): Promise<void> {
		const oldVehicle = await this.findById(vehicle.id)

		await this.prisma.veiculo.update({
			where: {
				id: vehicle.id
			},
			data: {
				cubagem: vehicle.cubage,
				altura: vehicle.height,
				comprimento: vehicle.length,
				placa: vehicle.plate,
				rastreado: vehicle.tracked,
				largura: vehicle.width,
			}
		})
    
		for(const picture of vehicle.pictures) {
			await this.prisma.fotoVeiculo.upsert({
				where: {
					id: picture.id,
				},
				create: {
					id: picture.id,
					foto: picture.file,
					veiculo_id: vehicle.id,
				},
				update: {
					foto: picture.file
				}
			})
		}

		const picturesToRemove = oldVehicle?.pictures.filter(pic => {
			return !vehicle.pictures.find(p => pic.id == p.id)
		})

		for(const picToRemove of picturesToRemove || []) {
			await this.prisma.fotoVeiculo.delete({
				where: {
					id: picToRemove.id
				}
			})
		}
	}

	async deleteById(id: number): Promise<void> {
		await this.prisma.veiculo.delete({
			where: {
				id
			}
		})
	}
}