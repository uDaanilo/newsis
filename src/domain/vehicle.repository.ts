import { Vehicle } from "./vehicle.entity";

export interface VehicleRepository {
  findById(id: number): Promise<Vehicle>
  findAll(): Promise<Vehicle[]>
  create(vehicle: Vehicle): Promise<void>
  update(vehicle: Vehicle): Promise<void>
  deleteById(id: number): Promise<void>
}