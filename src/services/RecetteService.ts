import RecetteRepos from '../repos/recetteRepos'; 
import { IRecette } from '../models/recette';

const recetteRepos = new RecetteRepos(); 

class RecetteService {
    // Récupérer une recette par ID
    async getOne(id: string): Promise<IRecette | null> {
        const persists = await recetteRepos.persists(id);
        if(!persists){
            throw new Error("(Service, GetOne), Aucune recette avec cette id: " + id)
        }
        return await recetteRepos.GetOne(id);
    }

    // Récupérer toutes les recettes
    async getAll(): Promise<IRecette[]> {
        return await recetteRepos.GetAll();
    }

    // Ajouter une nouvelle recette
    async add(recette: IRecette): Promise<IRecette> {
        return await recetteRepos.add(recette);
    }

    // Supprimer une recette par ID
    async deleteOne(id: string): Promise<void> {
        const persists = await recetteRepos.persists(id)
        if(!persists){
            throw new Error("(Service, delete), Aucune recette avec cette id: " + id)
        }
        return await recetteRepos.deleteOne(id);
    }

    // Récupérer une recette par titre
    async GetByTitle(title: string): Promise<IRecette | null> {
        return await recetteRepos.GetByTitle(title);
    }

    // Modifier une recette
    async ModifierRecette(recette: IRecette): Promise<IRecette | null> {

        const persists = await recetteRepos.persists(recette._id!)
        if(!persists){
            throw new Error("(Service, modifier), Aucune recette avec cette id: " + recette._id!)
        }
        
        return await recetteRepos.ModifierRecette(recette);
    }
}

export default RecetteService;
