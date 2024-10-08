import express from "express";
import { save, saveinBulk, getCat, getCatlist, deleteCat } from "../controller/category.controller.js";
import { body } from "express-validator";
const router = express.Router();

router.post("/save-in-bulk", saveinBulk);
router.post("/save", 
    body("slug", "Slug is required").notEmpty(),
    body("name", "Name is required").notEmpty(),
    body("url").notEmpty(), save);

router.get("/list", getCatlist);

router.get("/:id", getCat);
router.delete("/:id", deleteCat);
export default router;



