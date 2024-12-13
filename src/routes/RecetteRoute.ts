
import RecetteModel, { IRecette, from, fromId , fromTitle} from '../models/recette'; 
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

    async getByTitle(req: IReq, res: IRes) {
        // Utilise req.params.title pour récupérer le paramètre d'URL
        const title = req.params.title;
        
        // Valide directement le paramètre en passant title à fromTitle
        const validerTitle = fromTitle(title);
        validerTitle.trim();
        console.log("Title:",validerTitle);
        
        const messageErreur = "Aucune recette trouvée avec ce titre";
        const recetteTrouver = await RecetteServices.GetByTitle(validerTitle);
        
        if (recetteTrouver == null) {
            return res.status(HttpStatusCodes.EXPECTATION_FAILED).json({ messageErreur });
        }
        
        return res.status(HttpStatusCodes.OK).json({ recetteTrouver });
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
