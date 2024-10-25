import { Router } from 'express';
import Paths from '../common/Paths';
import RecetteRoutes from './RecetteRoute';
// **** Variables **** //

const apiRouter = Router();

const recetteRouter = new RecetteRoutes();

// ** Add UserRouter ** //

// Init router
const RecetteRouter = Router();

// Add Recette Router
RecetteRouter.get(Paths.Recette.Get, recetteRouter.getAll);
RecetteRouter.get(Paths.Recette.GetOne, recetteRouter.getOne)
RecetteRouter.get(Paths.Recette.GetTitle, recetteRouter.getByTitle);
RecetteRouter.post(Paths.Recette.Add, recetteRouter.add)
RecetteRouter.delete(Paths.Recette.Delete, recetteRouter.deleteOne)
RecetteRouter.put(Paths.Recette.Update, recetteRouter.ModifierRecette)
apiRouter.use(Paths.Recette.Base, RecetteRouter);

// **** Export default **** //

export default apiRouter;
