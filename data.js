const IMG_PATH = "assets/images/";
const ingredientImg = (key) => `${IMG_PATH}ingredients/${key}.png`;
const bunImg = (key) => `${IMG_PATH}buns/${key}.png`;

const CURRENCY = "R$";
const BURGER_BASE_PRICE = 18;
const INGREDIENTS = [
  { id: "carne",     price: 10, w: 210, h: 34, ph: 70 },
  { id: "cheddar",   price: 4,  w: 205, h: 14, ph: 58 },
  { id: "frango",    price: 8,  w: 210, h: 26, ph: 64 },
  { id: "bacon",     price: 6,  w: 210, h: 18, ph: 80 },
  { id: "carameliz", price: 3,  w: 185, h: 18, ph: 70 },
  { id: "onion",     price: 5,  w: 175, h: 26, ph: 80 },
  { id: "picles",    price: 2,  w: 190, h: 20, ph: 60 },
  { id: "jalap",     price: 2,  w: 180, h: 20, ph: 56 },
  { id: "tomate",    price: 2,  w: 185, h: 18, ph: 66 },
  { id: "alface",    price: 2,  w: 220, h: 20, ph: 70 },
  { id: "molho",     price: 2,  w: 180, h: 12, ph: 54 },
  { id: "mozz",      price: 4,  w: 190, h: 16, ph: 66 },
  { id: "maio",      price: 2,  w: 200, h: 12, ph: 56 },
  { id: "ketchup",   price: 1,  w: 195, h: 12, ph: 60 },
  { id: "mostarda",  price: 1,  w: 200, h: 12, ph: 50 },
];
const BUNS = [
  { id: "wheat", top: "wt", bottom: "wb", price: 0, topW: 215, topH: 97,  botW: 210, botH: 52 },
  { id: "whole", top: "gt", bottom: "gb", price: 3, topW: 205, topH: 109, botW: 198, botH: 67 },
];
const SIZES = [
  { id: "small",  price: 12, width: 190 },
  { id: "medium", price: 18, width: 225 },
  { id: "large",  price: 24, width: 260 },
];

const FRIES_IMG = "batata";
const FRIES_RATIO = 1.71;
const SETS = {
  burger: INGREDIENTS.map((i) => i.id),
  fries: ["cheddar", "bacon", "mozz", "jalap", "onion", "carameliz",
          "picles", "frango", "molho", "maio", "ketchup", "mostarda"],
};
