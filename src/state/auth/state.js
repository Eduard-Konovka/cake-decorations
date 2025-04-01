export const initialUser = {
  uid: null,
  avatar: '',
  firstName: '',
  lastName: '',
  phone: '',
  locality: '',
  address: '',
  delivery: 'branch',
  email: '',
};

export const auth = {
  user: JSON.parse(localStorage.getItem('user')) || { ...initialUser },
};
