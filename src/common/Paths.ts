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
} as const;
