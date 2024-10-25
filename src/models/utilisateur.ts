import mongoose, { Document, Schema } from 'mongoose';
import { IRecette } from './recette'; 

    export interface IUtilisateur {
        nom: string,
        prenom: string,
        email: string,
        cle_api: string,
        mot_de_passe: string,
        liste_Favoris: IRecette[]
    }

    
    const UtilisateurSchema = new Schema<IUtilisateur> ({
        nom: {
            type: String,
            required: true
        },
        prenom: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        cle_api: {
            type: String,
            required: true
        },
        mot_de_passe: {
            type: String,
            required: true
        },
        liste_Favoris: [
            { 
            type: Schema.Types.ObjectId, 
            ref: 'recettes',
            required: false
        }],

    })
    mongoose.pluralize(null);
    const utilisateurModel = mongoose.model<IUtilisateur>("utilisateurs", UtilisateurSchema)

    export default utilisateurModel;