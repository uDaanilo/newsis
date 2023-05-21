import { Vehicle, VehicleData } from "./vehicle.entity"

function createVehicle(props?: Partial<VehicleData>) {
	props = {
		id: 1,
		cubage: 1,
		height: 1,
		length: 1,
		pictures: [],
		plate: "1234567",
		tracked: true,
		width: 1,
		...props
	}

	return new Vehicle(props as VehicleData)
}

describe("Vehicle entity test suite", () => {
	test("should instance a new vehicle", () => {
		const vehicle = createVehicle()

		expect(vehicle instanceof Vehicle).toBeTruthy()
	})

	test("should throw when instance a new vehicle with 6 pictures", () => {
		const vehicle = () => createVehicle({
			pictures: new Array(6),
		})

		expect(vehicle).toThrowError("Pictures must have max 5 items")
	})

	test("should throw when instance a new vehicle with 8 length plate", () => {
		const vehicle = () => createVehicle({
			plate: "12345678"
		})

		expect(vehicle).toThrowError("Plate must not be greater than 7 chars")
	})

	test("should update plate", () => {
		const vehicle = createVehicle()

		const newPlate = "7654321"
		vehicle.updatePlate(newPlate)

		expect(vehicle.plate).toBe(newPlate)
	})

	test("should update tracked", () => {
		const vehicle = createVehicle()

		vehicle.updateTracked(false)

		expect(vehicle.tracked).toBeFalsy()
	})

	test("should update width", () => {
		const vehicle = createVehicle()

		const newWidth = 2
		vehicle.updateWitdh(newWidth)

		expect(vehicle.width).toBe(newWidth)
	})

	test("should update height", () => {
		const vehicle = createVehicle()

		const newHeight = 2
		vehicle.updateHeight(newHeight)

		expect(vehicle.height).toBe(newHeight)
	})

	test("should update length", () => {
		const vehicle = createVehicle()

		const newLength = 2
		vehicle.updateLength(newLength)

		expect(vehicle.length).toBe(newLength)
	})

	test("should update cubage", () => {
		const vehicle = createVehicle()

		const newCubage = 2
		vehicle.updateCubage(newCubage)

		expect(vehicle.cubage).toBe(newCubage)
	})

	test("should add a new picture", () => {
		const vehicle = createVehicle()

		expect(vehicle.pictures).toHaveLength(0)

		vehicle.addPicture(1, Buffer.from(""))

		expect(vehicle.pictures).toHaveLength(1)
	})

	test("should remove a picture", () => {
		const vehicle = createVehicle({
			pictures: [
				{
					id: 1,
					file: Buffer.from("")
				},
				{
					id: 2,
					file: Buffer.from("")
				}
			]
		})

		expect(vehicle.pictures).toHaveLength(2)

		vehicle.removePicture(1)

		expect(vehicle.pictures).toHaveLength(1)
	})
  
	test("should update a picture by id", () => {
		const vehicle = createVehicle({
			pictures: [
				{
					id: 1,
					file: Buffer.from("foo")
				},
				{
					id: 2,
					file: Buffer.from("bar")
				}
			]
		})

		expect(vehicle.pictures).toHaveLength(2)

		vehicle.updatePicture(2, Buffer.from("baz"))

		expect(vehicle.pictures[1].file.toString()).toBe("baz")
	})

	test("should throw when updating picture with invalid id", () => {
		const vehicle = createVehicle({
			pictures: [
				{
					id: 1,
					file: Buffer.from("foo")
				},
				{
					id: 2,
					file: Buffer.from("bar")
				}
			]
		})

		expect(vehicle.pictures).toHaveLength(2)

		expect(() => vehicle.updatePicture(3, Buffer.from("baz")))
			.toThrow("Picture not found")
	})
})