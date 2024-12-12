import { Router } from 'express';
import Paths from '../common/Paths';
import RecetteRoutes from './RecetteRoute';
import UtilisateurRoutes from './UtilisateursRoutes'; 
import tokenController from './TokenRoute';
import authenticateToken from '../middleware/tokenMiddleWare'; // Importer le middleware

// **** Variables **** //
const apiRouter = Router();

// Initialiser les routeurs
const recetteRouter = new RecetteRoutes();
const utilisateurRouter = new UtilisateurRoutes(); 
const tokenRouter = new tokenController();

// ** Ajouter les routes Recette ** //
const RecetteRouter = Router();
// La route getAll ne nécessite pas de jeton, mais les autres oui
RecetteRouter.get(Paths.Recette.Get, recetteRouter.getAll);
RecetteRouter.get(Paths.Recette.GetOne, authenticateToken, recetteRouter.getOne); // Protection par jeton
RecetteRouter.get(Paths.Recette.GetTitle, authenticateToken, recetteRouter.getByTitle); // Protection par jeton
RecetteRouter.post(Paths.Recette.Add, authenticateToken, recetteRouter.add); // Protection par jeton
RecetteRouter.delete(Paths.Recette.Delete, authenticateToken, recetteRouter.deleteOne); // Protection par jeton
RecetteRouter.put(Paths.Recette.Update, authenticateToken, recetteRouter.ModifierRecette); // Protection par jeton
apiRouter.use(Paths.Recette.Base, RecetteRouter);

// ** Ajouter les routes Utilisateur ** //
const UtilisateurRouter = Router();
UtilisateurRouter.post(Paths.Utilisateur.Add, utilisateurRouter.ajouterUser); // Pas besoin de jeton ici
UtilisateurRouter.get(Paths.Utilisateur.GetOne, authenticateToken, utilisateurRouter.trouverParIdUser); // Protection par jeton
UtilisateurRouter.get(Paths.Utilisateur.GetEmail, authenticateToken, utilisateurRouter.TrouverParEmailUser); // Protection par jeton
apiRouter.use(Paths.Utilisateur.Base, UtilisateurRouter);

// ** Ajouter les routes token ** //
const TokenRouter= Router();
TokenRouter.post(Paths.GenerateToken.Get, tokenRouter.generateToken); 
apiRouter.use(Paths.GenerateToken.Base, TokenRouter);

// **** Exporter le routeur par défaut **** //
export default apiRouter;
