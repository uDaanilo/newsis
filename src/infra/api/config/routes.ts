import { Router } from "express"
const router = Router()

router.use("*", (_, res) => res.sendStatus(404))

export default router