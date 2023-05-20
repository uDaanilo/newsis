import { VehiclePicture } from "../domain/vehicle.entity"

export interface OutputListAllVehiclesDto {
  id: number
  plate: string
  tracked: boolean
  width: number
  height: number
  length: number
  cubage: number
  pictures: VehiclePicture[]
}