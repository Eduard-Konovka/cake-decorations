import { getLanguage } from 'functions';

export const initialUser = {
  firstName: '',
  lastName: '',
  fullName: '',
  phone: '',
  locality: '',
  address: '',
  delivery: '',
  email: '',
  password: '',
};

export const global = {
  mainHeight: null,
  language: getLanguage(),
  user: JSON.parse(localStorage.getItem('user')) || initialUser,
  categories: [],
  products: [],
  tagsDictionary: null,
  linksDictionary: null,
  cart: JSON.parse(localStorage.getItem('cart')) || [],
};
