import mongoose, { Schema } from 'mongoose';

// Mon modèle
interface Ingredient {
  nom: string;
  quantite: string;
}

interface Etape {
  description: string;
  ordre: number;
}

export interface IRecette {
  _id?: string; 
  titre: string;
  ingredients: Ingredient[];
  etapes: Etape[];
  tempsPreparation: number; 
  tempsCuisson: number; 
  portions: number;
  auteur?: string;            
  dateCreation?: Date;        
}

// Création du schéma pour mongoose
const ingredientSchema = new Schema<Ingredient>({
  nom: { type: String, required: true },
  quantite: { type: String, required: true },
});

const etapeSchema = new Schema<Etape>({
  description: { type: String, required: true },
  ordre: { type: Number, required: true },
});

// Validation
const recetteSchema = new Schema<IRecette>({
  titre: { type: String, required: true },
  ingredients: { 
    type: [ingredientSchema], 
    required: true,
    validate: {
      validator: function(ingredients: Ingredient[]) {
        return ingredients.every(ingredient => 
          ingredient.nom.length > 1 && 
          ingredient.nom.length <= 50 &&
          ingredient.quantite.length > 0
        );
      },
      message: 'Chaque ingrédient doit avoir un nom entre 2 et 50 caractères et une quantité non vide.'
    }
  },
  etapes: { type: [etapeSchema], required: true },
  tempsPreparation: { type: Number, required: true },
  tempsCuisson: { type: Number, required: true },
  portions: { 
    type: Number, 
    required: true, 
    min: [1, 'Il doit y avoir au moins 1 portion.'],
    max: [12, 'Le nombre de portions ne doit pas dépasser 12.'],
    validate: {
      validator: Number.isInteger,
      message: 'Le nombre de portions doit être un entier.'
    }
  },
  auteur: { type: String, required: false },            
  dateCreation: { type: Date, required: false },  
});

// Validation d'une recette
export function from(param: object): IRecette {
  console.log("Paramètre reçu :", param);
  console.log("isRecette(param) :", isRecette(param));

  if (!isRecette(param)) {
    throw new Error("Les paramètres de l'objet ne sont pas conformes");
  }

  const p = param as IRecette;
  return new_(
    p._id,
    p.titre,
    p.ingredients,
    p.etapes,
    p.tempsPreparation,
    p.tempsCuisson,
    p.portions,
    p.auteur,
    p.dateCreation,
  );
}

function isRecette(param: any): param is IRecette {
  return (
    typeof param.titre === "string" &&
    Array.isArray(param.ingredients) &&
    param.ingredients.every(
      (ingredient: any) =>
        typeof ingredient.nom === "string" && typeof ingredient.quantite === "string"
    ) &&
    Array.isArray(param.etapes) &&
    param.etapes.every(
      (etape: any) =>
        typeof etape.description === "string" && typeof etape.ordre === "number"
    ) &&
    typeof param.tempsPreparation === "number" &&
    typeof param.tempsCuisson === "number" &&
    typeof param.portions === "number" &&
    (param.auteur === undefined || typeof param.auteur === "string") &&
    (param.dateCreation === undefined || param.dateCreation instanceof Date || typeof param.dateCreation === "string")
  );
}

export function new_(
  _id?: string,
  titre?: string,
  ingredients?: Ingredient[],
  etapes?: Etape[],
  tempsCuisson?: number,
  tempsPreparation?: number,
  portions?: number,
  auteur?: string,            
  dateCreation?: Date,        
): IRecette {
  return {
    _id: _id, 
    titre: titre ?? '',
    ingredients: ingredients ?? [],
    etapes: etapes ?? [],
    tempsCuisson: tempsCuisson ?? 0,
    tempsPreparation: tempsPreparation ?? 0,
    portions: portions ?? 0,
    auteur: auteur,            
    dateCreation: dateCreation 
  };
}

// Validation de l'id
function isId(arg: unknown): boolean {
  return !!arg && typeof arg === 'string';
}

export function fromId(param: unknown): string {
  if (!isId(param)) {
    throw new Error("Le paramètre d'id n'est pas conformes");
  }
  const p = param as string;
  return p;
}

// Validation de titre
function isTitle(arg: unknown): boolean {
  return !!arg && typeof arg === 'string';
}

export function fromTitle(param: unknown): string {
  if (!isTitle(param)) {
    throw new Error("Les paramètres du titre ne sont pas conformes");
  }
  const p = param as string;
  return p;
}

mongoose.pluralize(null);
const RecetteModel = mongoose.model<IRecette>('recettes', recetteSchema);

export default RecetteModel;
