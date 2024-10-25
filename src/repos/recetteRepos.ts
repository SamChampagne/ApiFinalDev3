import RecetteBd, { IRecette, from } from "../models/recette"; // Importation du modèle Recette
import mongoose from "mongoose";

class RecetteRepos {

    // Fonction qui récupére toutes les recettes
    async GetAll(): Promise<IRecette[]> {
        const recettes = await RecetteBd.find();
        return recettes;
    }

    async persists(id: string): Promise<boolean> {
        const recette = await RecetteBd.findById(id);
        return recette !== null;
    }

    // Fonction qui cherche une recette par son id
    async GetOne(id: string): Promise<IRecette | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('ID invalide');
        }

        const recetteRecuperer = await RecetteBd.findById(id);

        if (!recetteRecuperer) {
            console.log("Recette non trouvée avec cet ID :", id);
            return null;
        }

        return recetteRecuperer;
    }

    // Fonction qui ajoute une nouvelle recette
    async add(recette: IRecette): Promise<IRecette> {
        const nouvelleRecette = await RecetteBd.create(recette);
        return nouvelleRecette;
    }

    // Fonction qui supprime une recette
    async deleteOne(id: string): Promise<void> {
        await RecetteBd.findByIdAndDelete(id);
    }

    // Fonction qui cherche une recette par son titre
    async GetByTitle(titre: string): Promise<IRecette | null> {
        const recetteTrouver = await RecetteBd.findOne({ title: titre });

        if (!recetteTrouver) {
            console.log("Recette non trouvée avec ce titre: ", titre);
            return null;
        }

        return recetteTrouver;
    }
    async GetByAuteur(auteur: string): Promise<IRecette[] | null> {

        const recetteTrouver = await RecetteBd.find({auteur: auteur})

        if (!recetteTrouver) {
            console.log("Recette non trouvée avec l'auteur: ", auteur);
            return null;
        }
        return recetteTrouver;
    }

    // Fonction qui modifie une recette
    async ModifierRecette(recette: IRecette): Promise<IRecette | null> {
        if (!recette._id || !mongoose.Types.ObjectId.isValid(recette._id)) {
            throw new Error("ID invalide dans l'objet recette");
        }

        const recetteModifier = await RecetteBd.findById(recette._id);

        if (!recetteModifier) {
            console.log("Recette non trouvée avec cet ID :", recette._id);
            return null;
        }

        if (!from(recetteModifier)) {
            throw new Error("L'objet récupéré n'est pas une recette valide");
        }

        recetteModifier.titre = recette.titre;
        recetteModifier.ingredients = recette.ingredients;
        recetteModifier.etapes = recette.etapes;
        recetteModifier.tempsPreparation = recette.tempsPreparation;
        recetteModifier.tempsCuisson = recette.tempsCuisson;
        recetteModifier.portions = recette.portions;

        const recetteSave = await recetteModifier.save();

        if (recetteSave) {
            console.log("Recette modifiée avec succès");
        }

        return recetteModifier;
    }
}

// Exporter la classe RecetteRepos par défaut
export default RecetteRepos;
