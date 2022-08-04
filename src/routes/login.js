import { Router } from "express"

const router = Router()

router.get("/", (req, res) => {
    res.render("login")
})

router.post("/", (req, res) => {
    const { nombre } = req.body
    req.session.nombre = nombre
    res.redirect("/")
})

export default router