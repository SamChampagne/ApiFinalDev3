import UtilisateurRepos from '../repos/utilisateursRepos'; // Chemin vers le fichier utilisateursRepos
import { IUtilisateur } from '../models/utilisateur';

const utilisateurRepos = new UtilisateurRepos();

class UtilisateurService {

    async getAll(): Promise<IUtilisateur[]>{
        return await utilisateurRepos.getAll()
    }
    // Méthode pour trouver un utilisateur par son ID
    async trouverParIdUser(id: string): Promise<IUtilisateur | null> {
        return await utilisateurRepos.trouverParIdUser(id);
    }

    // Méthode pour ajouter un nouvel utilisateur
    async ajouterUser(user: IUtilisateur): Promise<IUtilisateur> {
        return await utilisateurRepos.ajouterUser(user);
    }

    // Méthode pour supprimer un utilisateur par son ID
    async supprimerUser(id: string): Promise<boolean> {
        return await utilisateurRepos.supprimerUser(id);
    }

    // Méthode pour vérifier si un utilisateur existe
    async persists(id: string): Promise<boolean> {
        return await utilisateurRepos.persists(id);
    }
    async trouverParEmailUser(email: string): Promise<IUtilisateur | null>{
        return await utilisateurRepos.trouverParEmail(email);
    }
}

export default UtilisateurService;
