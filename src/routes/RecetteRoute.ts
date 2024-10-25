
import RecetteModel, { IRecette, isRecette, from, fromId , fromTitle} from '../models/recette'; 
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import RecetteService from '@src/services/RecetteService';
import { IReq, IRes } from './common/types';



const RecetteServices = new RecetteService()
class RecetteRouter {
    async getAll(_: IReq, res: IRes) {
        const recettes = await RecetteServices.getAll();
        return res.status(HttpStatusCodes.OK).json({ recettes });
    }
    async add(req: IReq, res: IRes) {
        
        const recette: IRecette = from(req.body); 
        const nouvelleRecette = await RecetteServices.add(recette); // Ajouter la recette via le service
        return res.status(HttpStatusCodes.CREATED).json({ recette: nouvelleRecette }); // Retourner la nouvelle recette
    }
    async getOne(req: IReq, res: IRes){
        const id = fromId(req.params.id);
        console.log("Router Id", id);
        const recetteTrouver = await RecetteServices.getOne(id);
        const messageErreur = "Aucune recette trouver"

        if(recetteTrouver == null){
            return res.status(HttpStatusCodes.EXPECTATION_FAILED).json({messageErreur})
        }
        return res.status(HttpStatusCodes.OK).json({ recetteTrouver });
    }
    async deleteOne(req: IReq, res: IRes) {
        const id = fromId(req.params.id);
        console.log("Router id :", id)
        await RecetteServices.deleteOne(id)
        const messageSuppression = "Élément supprimer parfaitement"
        return res.status(HttpStatusCodes.OK).json({messageSuppression})
    }
    async getByTitle(req: IReq, res: IRes){
        const title = fromTitle(req.query.title);
        console.log("Title: ", title)
        const messageErreur = "Aucune recette trouvé avec ce titre"
        const recetteTrouver = await RecetteServices.GetByTitle(title);
        if(recetteTrouver == null){
            return res.status(HttpStatusCodes.EXPECTATION_FAILED).json({messageErreur})
        }
        return res.status(HttpStatusCodes.OK).json({recetteTrouver})
    }
    async ModifierRecette(req: IReq, res: IRes){
        const recette: IRecette = from(req.body);
        console.log("(Route): ",recette.titre) 
        const messageModification = "Erreur lors de la modification"
        const recetteModifier = await await RecetteServices.ModifierRecette(recette)
        if(recetteModifier == null){
            return res.status(HttpStatusCodes.EXPECTATION_FAILED).json({messageModification})
        }
        return res.status(HttpStatusCodes.OK).json({recetteModifier})
    }
}

// Exporter le routeur
export default RecetteRouter;
