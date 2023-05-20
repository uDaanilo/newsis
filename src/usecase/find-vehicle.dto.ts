import { VehiclePicture } from "../domain/vehicle.entity"

export interface InputFindVehicleUseCaseDto {
  id: number
}

export interface OutputFindVehicleDto {
  id: number
  plate: string
  tracked: boolean
  width: number
  height: number
  length: number
  cubage: number
  pictures: VehiclePicture[]
}