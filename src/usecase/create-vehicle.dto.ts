export interface InputCreatevehicleDto {
  plate: string
  tracked: boolean
  width: number
  height: number
  length: number
  cubage: number
  pictures?: Buffer[]
}

export interface OutputCreateVehicleDto {
  id: number
  plate: string
  tracked: boolean
  width: number
  height: number
  length: number
  cubage: number
  pictures: {
    id: number
    file: Buffer
  }[]
}