import { Request, Response } from "express"
import { VehicleMySqlRepository } from "../../repositories/vehicle/vehicle-mysql.repository"
import { ListAllVehiclesUseCase } from "../../../usecase/list-all-vehicles.usecase"
import { CreateVehicleUseCase } from "../../../usecase/create-vehicle.usecase"
import { VehiclePresenter } from "../presenters/vehicle.presenter"
import { FindVehicleUseCase } from "../../../usecase/find-vehicle.usecase"
import { DeleteVehicleUseCase } from "../../../usecase/delete-vehicle.usecase"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { UpdateVehicleUseCase } from "../../../usecase/update-vehicle.usecase"
import { getMimeType } from "../helpers/getMimeType"
import { prisma } from "../config/prisma"

export class VehicleController {
	static async index(_req: Request, res: Response) {
		const vehicleRepository = new VehicleMySqlRepository(prisma)
		const listAllUseCase = new ListAllVehiclesUseCase(vehicleRepository)

		const vehicles = await listAllUseCase.execute()

		return res.json(VehiclePresenter.toJSON(vehicles))
	}

	static async getById(req: Request, res: Response) {
		const { id } = req.params

		const vehicleRepository = new VehicleMySqlRepository(prisma)
		const findUseCase  = new FindVehicleUseCase(vehicleRepository)
    
		const vehicle = await findUseCase.execute({ id: +id })

		if(!vehicle) return res.status(404).json({ error: "vehicle not found" })

		return res.json(VehiclePresenter.toJSON(vehicle))
	}

	static async create(req: Request, res: Response) {
		const {
			placa,
			rastreado,
			comprimento,
			largura,
			altura,
			cubagem
		} = req.body
		
		if(req.invalidFileType) return res.status(400).json({ error: "fotos must have image mimetype" })
		if((req.files?.length as number) > 5) return res.status(400).json({ error: "fotos must have max 5 items" })

		const vehicleRepository = new VehicleMySqlRepository(prisma)
		const createUseCase = new CreateVehicleUseCase(vehicleRepository)
		const pictures: Buffer[] = []

		if(typeof req.files?.map == "function")
			req.files.map(f => pictures.push(f.buffer))

		const vehicle = await createUseCase.execute({
			cubage: cubagem,
			height: altura,
			length: comprimento,
			plate: placa,
			tracked: rastreado,
			width: largura,
			pictures
		})

		return res.status(201).json(VehiclePresenter.toJSON(vehicle))
	}

	static async update(req: Request, res: Response) {
		const { id } = req.params
		const {
			placa,
			rastreado,
			comprimento,
			largura,
			altura,
			cubagem
		} = req.body
		
		if(req.invalidFileType) return res.status(400).json({ error: "fotos must have image mimetype" })
		if((req.files?.length as number) > 5) return res.status(400).json({ error: "fotos must have max 5 items" })

		const vehicleRepository = new VehicleMySqlRepository(prisma)
		const updateUseCase = new UpdateVehicleUseCase(vehicleRepository)
		const pictures: Buffer[] = []

		if(typeof req.files?.map == "function")
			req.files.map(f => pictures.push(f.buffer))

		try {
			await updateUseCase.execute({
				id: +id,
				cubage: cubagem,
				height: altura,
				length: comprimento,
				plate: placa,
				tracked: rastreado,
				width: largura,
				pictures
			})
		} catch (err: Error | unknown) {
			if(err instanceof Error) {
				if(err?.message === "Pictures must have max 5 items")
					return res.status(400).json({ error: err.message })
			}

			throw err
		}

		return res.status(200).json()
	}

	static async delete(req: Request, res: Response) {
		const { id } = req.params
		
		const vehicleRepository = new VehicleMySqlRepository(prisma)
		const deleteUseCase = new DeleteVehicleUseCase(vehicleRepository)

		try {
			await deleteUseCase.execute({ id: +id })
		} catch (err: PrismaClientKnownRequestError | unknown) {
			if(err instanceof PrismaClientKnownRequestError) {
				if(!err.message?.includes("Record to delete does not exist"))
					throw err
			}
		}

		return res.sendStatus(200)
	}

	static async getVehiclePictureById(req: Request, res: Response) {
		const { vehicleId, pictureId } = req.params

		const vehicleRepository = new VehicleMySqlRepository(prisma)
		const findUseCase  = new FindVehicleUseCase(vehicleRepository)
    
		const vehicle = await findUseCase.execute({ id: +vehicleId })
		if(!vehicle) return res.status(404).json({ error: "vehicle not found" })

		const picture = vehicle.pictures.find(p => p.id === +pictureId)
		if(!picture) return res.status(404).json({ error: "picture not found" })

		/* eslint-disable @typescript-eslint/no-unused-vars */
		const mimeType = await getMimeType(picture.file).catch(_ => null)

		res.setHeader("Content-Type", mimeType || "image/png")
		return res.send(picture?.file)
	}

	static async createVehiclePicture(req: Request, res: Response) {
		const { vehicleId } = req.params
		if(req.invalidFileType) return res.status(400).json({ error: "fotos must have image mimetype" })
		if(!req.file) return

		const vehicleRepository = new VehicleMySqlRepository(prisma)
		const updateUseCase = new UpdateVehicleUseCase(vehicleRepository)

		try {
			await updateUseCase.execute({
				id: +vehicleId,
				pictures: [
					req.file.buffer
				]
			})
		} catch (err: Error | unknown) {
			if(err instanceof Error) {
				if(err?.message === "Pictures must have max 5 items")
					return res.status(400).json({ error: err.message })
			}

			throw err
		}

		return res.status(200).json()
	}

	static async updatePictureById(req: Request, res: Response) {
		const { vehicleId, pictureId } = req.params
		
		if(req.invalidFileType) return res.status(400).json({ error: "fotos must have image mimetype" })
		if((req.files?.length as number) > 5) return res.status(400).json({ error: "fotos must have max 5 items" })

		const vehicleRepository = new VehicleMySqlRepository(prisma)
		const updateUseCase = new UpdateVehicleUseCase(vehicleRepository)

		await updateUseCase.execute({
			id: +vehicleId,
			pictures: [
				{
					id: +pictureId,
					file: req.file?.buffer as Buffer
				}
			]
		})

		return res.status(200).json()
	}

	static async deletePictureById(req: Request, res: Response) {
		const { vehicleId, pictureId } = req.params
		
		const vehicleRepository = new VehicleMySqlRepository(prisma)
		const findUseCase  = new FindVehicleUseCase(vehicleRepository)
		const updateUseCase = new UpdateVehicleUseCase(vehicleRepository)
    
		const vehicle = await findUseCase.execute({ id: +vehicleId })

		if(!vehicle) return res.status(404).json({ error: "vehicle not found" })

		await updateUseCase.execute({
			id: +vehicleId,
			pictures: [
				{
					id: +pictureId,
					file: null
				}
			]
		})

		return res.status(200).json()
	}
}