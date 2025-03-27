const ENTER_KEY_CODE = 13;

export const GLOBAL = {
  inputs: {
    common: {
      minLength: 4,
      maxLength: 200,
      pattern: `^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$`,
    },

    phone: {
      minLength: 7,
      maxLength: 15,
      // eslint-disable-next-line no-useless-escape
      pattern: `\+?[0-9\s\-\(\)]{7,15}`,
    },

    email: {
      // eslint-disable-next-line no-useless-escape
      pattern: `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`,
    },

    password: {
      minLength: 8,
      maxLength: 128,
      // eslint-disable-next-line no-useless-escape
      pattern: `^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,128}$`,
    },
  },

  keyСodes: {
    enter: ENTER_KEY_CODE,
    zero: 48,
    prohibited: [
      ENTER_KEY_CODE, // Enter
      44, // ,
      46, // .
      101, // e (scientific notaion, 1e2 === 100)
    ],
  },

  productCount: {
    min: 1,
    max: 42,
  },

  pricesBreakPoint: {
    min: 0,
    first: 15,
    second: 30,
  },

  productView: {
    titleLength: 60,
    descriptionMultiplier: 3,
  },

  sending: 3000,

  dozen: 12,
};
