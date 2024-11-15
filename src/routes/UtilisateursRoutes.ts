import UtilisateurService from '@src/services/UtilisateurService'; // Importer le service Utilisateur
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { IReq, IRes } from './common/types';
import { IUtilisateur, from, fromId, fromEmail } from '../models/utilisateur'; // Assurez-vous que la méthode 'from' est définie pour l'utilisateur

const utilisateurServices = new UtilisateurService();

class UtilisateurRouter {
    

    // Ajouter un nouvel utilisateur
    async ajouterUser(req: IReq, res: IRes) {
        const utilisateur: IUtilisateur = from(req.body); 
        const nouvelUtilisateur = await utilisateurServices.ajouterUser(utilisateur); 
        return res.status(HttpStatusCodes.CREATED).json({ utilisateur: nouvelUtilisateur }); 
    }

    // Récupérer un utilisateur par son ID
    async trouverParIdUser(req: IReq, res: IRes) {
        const id = fromId(req.params.id);  
        console.log("Router Id", id);
        const utilisateurTrouver = await utilisateurServices.trouverParIdUser(id);
        const messageErreur = "Aucun utilisateur trouvé";

        if (utilisateurTrouver == null) {
            return res.status(HttpStatusCodes.EXPECTATION_FAILED).json({ messageErreur });
        }

        return res.status(HttpStatusCodes.OK).json({ utilisateurTrouver });
    }

    // Supprimer un utilisateur par son ID
    async SupprimerUser(req: IReq, res: IRes) {
        const id = fromId(req.params.id);  // Récupérer l'ID depuis les paramètres
        console.log("Router id :", id);
        const utilisateurSupprime = await utilisateurServices.supprimerUser(id);
        const messageSuppression = "Utilisateur supprimé avec succès";

        if (!utilisateurSupprime) {
            return res.status(HttpStatusCodes.EXPECTATION_FAILED).json({ message: "Erreur lors de la suppression" });
        }

        return res.status(HttpStatusCodes.OK).json({ messageSuppression });
    }
    // trouver un utilisateur par email
    async TrouverParEmailUser(req: IReq, res: IRes) {
        const email = fromEmail(req.params.email);
        const utilisateur = await utilisateurServices.trouverParEmailUser(email);
        const messageErreur = "Aucun utilisateur trouvé avec ce email";
        if (utilisateur == null) {
            return res.status(HttpStatusCodes.EXPECTATION_FAILED).json({ messageErreur });
        } 
        return res.status(HttpStatusCodes.OK).json({ utilisateur });
    }
    

}

export default UtilisateurRouter;
