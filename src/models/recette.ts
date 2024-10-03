import mongoose, { Document, Schema } from 'mongoose';

interface Ingredient {
  nom: string;
  quantite: string;
}

interface Etape {
  description: string;
  ordre: number;
}

export interface Recette extends Document {
  titre: string;
  ingredients: Ingredient[];
  etapes: Etape[];
  tempsPreparation: number; // en minutes
  tempsCuisson: number; // en minutes
  portions: number;
}

const ingredientSchema = new Schema<Ingredient>({
  nom: { type: String, required: true },
  quantite: { type: String, required: true },
});

const etapeSchema = new Schema<Etape>({
  description: { type: String, required: true },
  ordre: { type: Number, required: true },
});

const recetteSchema = new Schema<Recette>({
  titre: { type: String, required: true },
  ingredients: { type: [ingredientSchema], required: true },
  etapes: { type: [etapeSchema], required: true },
  tempsPreparation: { type: Number, required: true },
  tempsCuisson: { type: Number, required: true },
  portions: { type: Number, required: true },
});

const RecetteModel = mongoose.model<Recette>('Recette', recetteSchema);

export default RecetteModel;
