export interface VehicleData {
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

export class Vehicle {
  private _id
  private _plate
  private _tracked
  private _width
  private _height
  private _length
  private _cubage
  private _pictures

  constructor(props: VehicleData) {
    Vehicle.validate(props)

    this._id = props.id
    this._plate = props.plate
    this._tracked = props.tracked
    this._width = props.width
    this._height = props.height
    this._length = props.length
    this._cubage = props.cubage
    this._pictures = props.pictures
  }

  get id() {
    return this._id
  }
  
  get plate() {
    return this._plate
  }
  
  get tracked() {
    return this._tracked
  }
  
  get width() {
    return this._width
  }
  
  get height() {
    return this._height
  }
  
  get length() {
    return this._length
  }
  
  get cubage() {
    return this._cubage
  }
  
  get pictures() {
    return this._pictures
  }

  public updatePlate(val: string) {
    Vehicle.validate({
      ...this.toJSON(),
      plate: val
    })

    this._plate = val
  }

  public updateTracked(val: boolean) {
    Vehicle.validate({
      ...this.toJSON(),
      tracked: val
    })

    this._tracked = val
  }

  public updateWitdh(val: number) {
    Vehicle.validate({
      ...this.toJSON(),
      width: val
    })

    this._width = val
  }

  public updateHeight(val: number) {
    Vehicle.validate({
      ...this.toJSON(),
      height: val
    })

    this._height = val
  }

  public updateLength(val: number) {
    Vehicle.validate({
      ...this.toJSON(),
      length: val
    })

    this._length = val
  }

  public updateCubage(val: number) {
    Vehicle.validate({
      ...this.toJSON(),
      cubage: val
    })

    this._cubage = val
  }

  public addPicture(id: number, file: Buffer)
  {
    const pic = {
        id,
        file
    }

    Vehicle.validate({
      ...this.toJSON(),
      pictures: [
        ...this.pictures,
        pic
      ]
    })

    this._pictures.push(pic)
  }

  public removePicture(id: number) {
    this._pictures = this._pictures.filter(p => p.id != id)
  }

  static validate(props: VehicleData) {
    if(props.pictures.length > 5)
      throw new Error("Pictures must have max 5 items")

    if(props.plate.length > 7)
      throw new Error("Plate must not be greater than 7 chars")

    return true
  }

  public toJSON() {
    return {
      id: this.id,
      plate: this.plate,
      tracked: this.tracked,
      width: this.width,
      height: this.height,
      length: this.length,
      cubage: this.cubage,
      pictures: this.pictures,
    }
  }
}