export interface InputUpdateVehicleUseCase {
  id: number
  plate?: string
  tracked?: boolean
  width?: number
  height?: number
  length?: number
  cubage?: number
  pictures?: Buffer[] | {
    id: number
    file: Buffer
  }[]
}