import UtilisateursBd, { IUtilisateur } from "../models/utilisateur"; // Importation du modèle Utilisateur

class UtilisateurRepos {

    // Récupérer tout les utilisateurs disponible
    async getAll(): Promise<IUtilisateur[]> {
        const utilisateurs = await UtilisateursBd.find();
        return utilisateurs;
    }
    // Trouver un utilisateur par son ID
    async trouverParIdUser(id: string): Promise<IUtilisateur | null> {
        const utilisateur = await UtilisateursBd.findById(id);
        return utilisateur;
    }

    // Ajouter un nouvel utilisateur
    async ajouterUser(user: IUtilisateur): Promise<IUtilisateur> {
        console.log('Nom de la collection :', UtilisateursBd.collection.name)
        const nouveauUtilisateur = await UtilisateursBd.create(user);
        return nouveauUtilisateur;
    }

    // Supprimer un utilisateur par son ID
    async supprimerUser(id: string): Promise<boolean> {
        const result = await UtilisateursBd.findByIdAndDelete(id);
        return result !== null;
    }

    // Trouver un utilisateur par son email
    async trouverParEmail(email: string): Promise<IUtilisateur | null> {
        const utilisateur = await UtilisateursBd.findOne({ email: email });
        return utilisateur;
    }
    // Vérifier si un utilisateur existe dans la base de données
    async persists(id: string): Promise<boolean> {
        const utilisateur = await UtilisateursBd.findById(id);
        return utilisateur !== null;
    }
    
}

export default UtilisateurRepos;
