import { Router } from "express";
import { validateBody } from "../middleware/validate-body.js";
import { validateIdParam } from "../middleware/validate-id.js";
import {
  createUserSchema,
  updateUserSchema,
} from "../validators/user.schema.js";

// A factory: the router is built around whatever controller it is given.
export function createUsersRouter(controller) {
  const router = Router();

  router.param("id", validateIdParam); // every '/:id' route gets UUID validation

  router.get("/", controller.list);
  router.get("/:id", controller.getById);
  router.post("/", validateBody(createUserSchema), controller.create);
  router.patch(
    "/:id",
    validateBody(updateUserSchema, { partial: true }),
    controller.update,
  );
  router.delete("/:id", controller.remove);

  return router;
}
