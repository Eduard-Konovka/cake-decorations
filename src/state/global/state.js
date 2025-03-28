import { getLanguage } from 'functions';

export const global = {
  mainHeight: null,
  language: getLanguage(),
  categories: [],
  products: [],
  tagsDictionary: null,
  linksDictionary: null,
  cart: JSON.parse(localStorage.getItem('cart')) || [],
};
