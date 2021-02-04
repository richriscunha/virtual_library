import express, { Router } from "express";

import BookController from "../controllers/index";

const router: Router = express.Router();

router.post("/", BookController.store);
router.delete("/:title", BookController.destroy);
router.patch("/", BookController.update);
router.get("/", BookController.index);
router.put("/", BookController.persist);

export default router;
