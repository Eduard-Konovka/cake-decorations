const aaa = {
  _id: '63f32b10d7d918cfc440a229',
  title: 'JavaScript: The Definitive Guide, 7th Edition',
  description:
    'JavaScript is the programming language of the web and is used by more software developers today than any other programming language. For nearly 25 years this best seller has been the go-to guide for JavaScript programmers. The seventh edition is fully updated to cover the 2020 version of JavaScript, and new chapters cover classes, modules, iterators, generators, Promises, async/await, and metaprogramming. You’ll find illuminating and engaging example code throughout. This product is for programmers who want to learn JavaScript and for web developers who want to take their understanding and mastery to the next level. It begins by explaining the JavaScript language itself, in detail, from the bottom up. It then builds on that foundation to cover the web platform and Node.js.',
  images: [
    'https://courses.prometheus.org.ua/asset-v1:Ciklum+FEB101+2022_T3+type@asset+block@javascript_the_definitive_guide.jpg',
  ],
  price: 10.99,
  availability: 'out of stock',
  product_type:
    'продукти харчування, напої > бакалія > харчові інгредієнти > харчові барвники',
  link: null,
  ads_redirect: null,
  identifier_exists: null,
  condition: null,
  //
  barcode: 1,
  author: 'David Flanagan',
  shortDescription:
    'JavaScript is the programming language of the web and is used by more software developers today than any other programming language.',
};

const bbb = {
  _id: '1798969377',
  title: 'Барвник харчовий натуральний сухий "Помаранчевий" (Кармін 0301) 2г',
  description:
    'Slado - по праву є одним з кращих харчових барвників. Виготовляється виключно в Україні. Ці барвники ідеально підходять для фарбування мастики, глазурі, кремів, тіста, марципану та багато іншого. Головною особливістю цієї фарби є його економічність у використанні, невеликої кількості достатньо для фарбування мастики, тіста, крему. Колір, як правило, збігається з палітрою, виходить насичений колір, а найголовніше - це один із найбезпечніших барвників, тому що походження його повністю натуральне з рослинної сировини. Барвник не токсичний, можливе використання у виробництві дитячих десертів. Купити барвник у містах України дуже просто і все це за прийнятною ціною від Інтернет магазину "Затишний дім". Увага! Залежно від складу мастики (особливо промислового виробництва) колір може незначно змінюватись. Це пов’язано із взаємодією барвника та компонентів цукрової пасти. Насиченість відтінку залежить від кількості барвника.',
  images: [
    'https://images.prom.ua/MX8wKsD0Nk9Y1PRv8lEwjsQQqie17sRBAi_tbk0WDP4=/4364217838_barvnik-harchovij-naturalnij.jpg',
  ],
  price: 45.0,
  product_type:
    'продукти харчування, напої > бакалія > харчові інгредієнти > харчові барвники',
  availability: 'out of stock',
  //
  link: 'https://zatyshno.prom.ua/ua/p1798969377-barvnik-harchovij-pomaranchevij.html?source=merchant_center',
  ads_redirect:
    'https://zatyshno.prom.ua/ua/p1798969377-barvnik-harchovij-pomaranchevij.html?source=merchant_center',
  identifier_exists: 'no',
  condition: 'new',
};

const db = [
  '_id',
  'title',
  'description',
  'link',
  'ads_redirect',
  'images',
  'availability',
  'price',
  'product_type',
  'identifier_exists',
  'condition',
  'brand',
  'color',
  'product_details',
];

const added_to_db = [
  'ruTitle',
  'uaTitle',
  'ruDescription',
  'uaDescription',
  'category',
  'wholesalePrice',
  'minimumWholesaleOrder',
];

const db_ = [
  'ruTitle',
  'uaTitle',
  'Пошукові_запити',
  'ruDescription',
  'uaDescription',
  'Тип_товару',
  'price',
  'Валюта',
  'Одиниця_виміру',
  'Посилання_зображення',
  'Наявність',
  'category',
  'categoryName',
  'Посилання_підрозділу',
  '_id',
  'Ідентифікатор_підрозділу',
  'Продукт_на_сайті',
  'Ціна_від',
  'Особисті_нотатки',
  'Виробник',
  'Кількість',
  'Ярлик',
  'Назва_Характеристики',
  'Значення_Характеристики',
  'Пошукові_запити_укр',
  'Вага,кг',
  'Ширина,см',
  'Висота,см',
  'Довжина,см',
  'wholesalePrice',
  'minimumWholesaleOrder',
  'Де_знаходиться_товар',
  'Назва_Характеристики_1',
  'Значення_Характеристики_1',
  'Назва_Характеристики_2',
  'Значення_Характеристики_2',
  'Країна_виробник',
  'Одиниця_виміру_Характеристики',
  'Назва_Характеристики_3',
  'Значення_Характеристики_3',
  'Одиниця_виміру_Характеристики_1',
  'Назва_Характеристики_4',
  'Значення_Характеристики_4',
  'Назва_Характеристики_5',
  'Одиниця_виміру_Характеристики_5',
  'Значення_Характеристики_5',
  'Одиниця_виміру_Характеристики_4',
  'Одиниця_виміру_Характеристики_2',
  'Назва_Характеристики_6',
  'Одиниця_виміру_Характеристики_6',
  'Значення_Характеристики_6',
  'Одиниця_виміру_Характеристики_3',
];

const dbKeys = new Set();
db.forEach(obj => {
  const objKeys = Object.keys(obj);
  objKeys.forEach(key => dbKeys.add(key));
});
console.log('dbKeys --->', dbKeys);
