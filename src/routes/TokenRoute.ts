import JetonService from '../services/TokenUserService';
import User, { IUtilisateur, from } from '../models/utilisateur';
import { IReq, IRes } from './common/types';
import check from './common/check';

class TokenController {
  
  /**
   * Générer un jeton pour un utilisateur.
   *
   * @param {IReq} req - La requête au serveur
   * @param {IRes} res - La réponse du serveur
   */
  async generateToken(req: IReq, res: IRes) {
    const userLogin = from(req.body)
    const token = await JetonService.generateToken(userLogin);
    return res.send({ token: token });
  }
  
}

export default TokenController;
