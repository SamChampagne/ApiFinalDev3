// **** Variables **** //

import { IUtilisateur } from '../models/utilisateur';
import UtilisateurService from './UtilisateurService';
import jwt from 'jsonwebtoken';

const UtilisateurServ = new UtilisateurService();

// **** Functions **** //

/**
 * Générer un jeton pour un utilisateur
 *
 * @param {IUtilisateur} utilisateur - L'utilisateur demandant le jeton
 * @returns {Promise} - Le jeton signé
 */
async function generateToken(utilisateur: IUtilisateur): Promise<string> {
  const utilisateurBD = (await UtilisateurServ.getAll()).find(
    (user) => user.email === utilisateur.email
  );
  
  if (utilisateurBD) {
    return jwt.sign({ email: utilisateur.email }, process.env.JWT_SECRET as string);
  } else {
    return ''; 
  }
}

// **** Export default **** //
export default {
  generateToken,
} as const;
