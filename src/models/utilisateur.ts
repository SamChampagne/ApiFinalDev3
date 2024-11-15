import mongoose, { Schema } from 'mongoose';

export interface IUtilisateur {
    _id?: string; 
    nom: string,
    email: string,
}

const UtilisateurSchema = new Schema<IUtilisateur> ({
    nom: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
})

export function from(param: object): IUtilisateur {
    if (!isUtilisateur(param)) {
        throw new Error("Les paramètres de l'objet ne sont pas conformes");
    }
    const p = param as IUtilisateur;
    return new_(
        p._id,
        p.nom,
        p.email
    );
}

export function isUtilisateur(arg: unknown): boolean {
    return (
        !!arg &&
        typeof arg === 'object' &&
        'nom' in arg &&
        'email' in arg &&
        (!('_id' in arg) || typeof (arg as any)._id === 'string')
    );
}

export function new_(
    _id?: string,
    nom?: string,
    email?: string
): IUtilisateur {
    return {
        _id: _id, 
        nom: nom ?? '',
        email: email ?? ''
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
function isEmail(arg: unknown): boolean {
    return !!arg && typeof arg === 'string';
}

export function fromEmail(param: unknown): string {
    if (!isEmail(param)) {
        throw new Error("Le paramètre d'email n'est pas conformes");
    }
    const p = param as string;
    return p;
}
mongoose.pluralize(null);
const utilisateurModel = mongoose.model<IUtilisateur>("utilisateurs", UtilisateurSchema)

export default utilisateurModel;
