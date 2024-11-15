/**
 * Express router paths go here.
 */


export default {
  Base: '/api',
  Recette: {
    Base: '/recette',
    Get: '/',
    Add: '/',
    Update: '/',
    Delete: '/delete/:id',
    GetOne:'/:id',
    GetTitle:'/title/:title',
  },
  Utilisateur: {
    Base: '/utilisateur',
    Add: '/ajouter', 
    GetOne: '/:id',
    Delete: '/delete/:id', 
    GetEmail: '/email/:email'
  },
  GenerateToken: {
    Base: '/generatetoken',
    Get: '/',
  },
} as const;
