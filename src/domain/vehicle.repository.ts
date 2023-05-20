import { Vehicle, VehiclePicture } from "./vehicle.entity"

export interface VehicleRepository {
  findById(id: number): Promise<Vehicle | null>
  findAll(): Promise<Vehicle[]>
  create(vehicle: Vehicle): Promise<void>
  update(vehicle: Vehicle): Promise<void>
  deleteById(id: number): Promise<void>
  findPicturesByVehicleId(id: number): Promise<VehiclePicture[]>
  findVehiclePictureById(id: number): Promise<VehiclePicture | null>
  getNextVehicleId(): Promise<number>
  getNextPictureId(): Promise<number>
}