import { Router } from "express"
import { VehicleController } from "../controllers/vehicle.controller"
import { Joi, celebrate } from "celebrate"
import { upload } from "./multer"

const router = Router()
const vehicleRouter = Router()

vehicleRouter.get("/", VehicleController.index)
vehicleRouter.get("/:id",
	celebrate({
		params: Joi.object({
			id: Joi.number().required()
		})
	}),
	VehicleController.getById
)
vehicleRouter.post("/create",
	upload.array("fotos"),
	celebrate({
		body: Joi.object({
			placa: Joi.string().max(7).required(),
			rastreado: Joi.bool().required(),
			comprimento: Joi.number().required(),
			largura: Joi.number().required(),
			altura: Joi.number().required(),
			cubagem: Joi.number().required(),
			fotos: Joi.binary(),
		}),
	}),
	VehicleController.create
)
vehicleRouter.put("/update/:id",
	upload.array("fotos"),
	celebrate({
		params: Joi.object({
			id: Joi.number().required()
		}),
		body: Joi.object({
			placa: Joi.string().max(7),
			rastreado: Joi.bool(),
			comprimento: Joi.number(),
			largura: Joi.number(),
			altura: Joi.number(),
			cubagem: Joi.number(),
		}),
	}),
	VehicleController.update
)
vehicleRouter.delete("/delete/:id",
	celebrate({
		params: Joi.object({
			id: Joi.number().required()
		})
	}),
	VehicleController.delete
)
vehicleRouter.get("/:vehicleId/pictures/:pictureId",
	celebrate({
		params: Joi.object({
			vehicleId: Joi.number().required(),
			pictureId: Joi.number().required(),
		}),
	}),
	VehicleController.getVehiclePictureById
)
vehicleRouter.post("/:vehicleId/pictures/create",
	celebrate({
		params: Joi.object({
			vehicleId: Joi.number().required(),
		}),
	}),
	upload.single("foto"),
	VehicleController.createVehiclePicture
)
vehicleRouter.put("/:vehicleId/pictures/update/:pictureId",
	celebrate({
		params: Joi.object({
			vehicleId: Joi.number().required(),
			pictureId: Joi.number().required(),
		}),
	}),
	upload.single("foto"),
	VehicleController.updatePictureById
)
vehicleRouter.delete("/:vehicleId/pictures/delete/:pictureId",
	celebrate({
		params: Joi.object({
			vehicleId: Joi.number().required(),
			pictureId: Joi.number().required(),
		}),
	}),
	VehicleController.deletePictureById
)

router.use("/vehicles", vehicleRouter)
router.use("*", (_, res) => res.sendStatus(404))

export default router