const state = {
  lang: "ar",
  mode: "burger",
  bun: 0,                   // index في BUNS
  size: 1,                  // index في SIZES
  layers: { burger: [], fries: [] }, // ids المكونات بالترتيب اللي اتضافت بيه
};

const isFries = () => state.mode === "fries";
const currentLayers = () => state.layers[state.mode];
const getIngredient = (id) => INGREDIENTS.find((i) => i.id === id);

function totalPrice() {
  const base = isFries()
    ? SIZES[state.size].price
    : BURGER_BASE_PRICE + BUNS[state.bun].price;
  return base + currentLayers().reduce((sum, id) => sum + getIngredient(id).price, 0);
}

function countByIngredient() {
  const counts = {};
  currentLayers().forEach((id) => { counts[id] = (counts[id] || 0) + 1; });
  return counts;
}
