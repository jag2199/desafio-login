import { Router } from "express"
import ProductosContainer from "../daos/productos.js"

const router = Router()

let container = new ProductosContainer()

router.get("/", (req, res) => {
    if (req.session.nombre) {
        res.render("index", { productos: container.getAll(), nombre: req.session.nombre })
    } else {
        res.redirect("/login");
    }
})

// router.get("/productos", (req, res) => {
//     res.render("productos",)
// })

// router.get("/:id", (req, res) => {
//     res.send(container.getById(req.params.id))
// })

router.post("/", (req, res) => {
    container.save(req.body)
    res.redirect("/")
})

// router.put("/:id", (req, res) => {
//     res.send(container.update(req.params.id, req.body))
// })

// router.delete("/:id", (req, res) => {
//     res.send(container.delete(req.params.id))
// })

export default router