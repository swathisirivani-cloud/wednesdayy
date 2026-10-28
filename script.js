const menu = [
  { name: "Masala Dosa", category: "breakfast", price: 80, veg: true, emoji: "🥞", desc: "Crispy dosa with spiced potato filling, chutney and sambar." },
  { name: "Idli Vada Combo", category: "breakfast", price: 60, veg: true, emoji: "🍚", desc: "Two soft idlis and one crispy vada with chutney." },
  { name: "Ven Pongal", category: "breakfast", price: 70, veg: true, emoji: "🥣", desc: "Rice and moong dal cooked with pepper, cumin and ghee." },
  { name: "Veg Meals", category: "main", price: 150, veg: true, emoji: "🍛", desc: "Rice, sambar, rasam, two curries, curd and papad." },
  { name: "Chicken Biryani", category: "main", price: 220, veg: false, emoji: "🍗", desc: "Fragrant basmati rice cooked with spiced chicken." },
  { name: "Paneer Butter Masala", category: "main", price: 180, veg: true, emoji: "🧀", desc: "Soft paneer cubes in a rich, creamy tomato gravy." },
  { name: "Fish Curry Meals", category: "main", price: 240, veg: false, emoji: "🐟", desc: "Rice with tangy fish curry and sides." },
  { name: "Samosa (2 pcs)", category: "snacks", price: 40, veg: true, emoji: "🥟", desc: "Crispy pastry stuffed with spiced potatoes and peas." },
  { name: "Chicken 65", category: "snacks", price: 160, veg: false, emoji: "🍖", desc: "Spicy, deep-fried chicken bites." },
  { name: "Veg Puff", category: "snacks", price: 30, veg: true, emoji: "🥐", desc: "Flaky puff pastry with a mixed vegetable filling." },
  { name: "Gulab Jamun", category: "desserts", price: 50, veg: true, emoji: "🍡", desc: "Soft milk dumplings soaked in sugar syrup." },
  { name: "Ice Cream Sundae", category: "desserts", price: 90, veg: true, emoji: "🍨", desc: "Vanilla ice cream with chocolate sauce and nuts." },
  { name: "Filter Coffee", category: "drinks", price: 30, veg: true, emoji: "☕", desc: "Strong South Indian coffee with frothy milk." },
  { name: "Mango Lassi", category: "drinks", price: 70, veg: true, emoji: "🥭", desc: "Chilled yogurt drink blended with sweet mango." },
  { name: "Fresh Lime Soda", category: "drinks", price: 50, veg: true, emoji: "🍋", desc: "Sweet or salted, fizzy and refreshing." }
];

const grid = document.querySelector("#menuGrid");
const searchInput = document.querySelector("#search");
const noResults = document.querySelector("#noResults");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentCategory = "all";
let orderCount = 0;
let orderTotal = 0;

function showMenu() {
  const searchText = searchInput.value.trim().toLowerCase();
  grid.innerHTML = "";
  let shown = 0;

  menu.forEach((item) => {
    const matchesCategory = currentCategory === "all" || item.category === currentCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchText);
    if (!matchesCategory || !matchesSearch) return;

    const card = document.createElement("div");
    card.className = "card";

    const emoji = document.createElement("div");
    emoji.className = "emoji";
    emoji.textContent = item.emoji;

    const title = document.createElement("h3");
    const tag = document.createElement("span");
    tag.className = "tag " + (item.veg ? "veg" : "nonveg");
    tag.title = item.veg ? "Vegetarian" : "Non-vegetarian";
    const name = document.createElement("span");
    name.textContent = item.name;
    title.appendChild(tag);
    title.appendChild(name);

    const desc = document.createElement("p");
    desc.className = "desc";
    desc.textContent = item.desc;

    const footer = document.createElement("div");
    footer.className = "card-footer";

    const price = document.createElement("span");
    price.className = "price";
    price.textContent = "₹" + item.price;

    const addBtn = document.createElement("button");
    addBtn.className = "add-btn";
    addBtn.textContent = "Add +";
    addBtn.addEventListener("click", () => addToOrder(item));

    footer.appendChild(price);
    footer.appendChild(addBtn);

    card.appendChild(emoji);
    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(footer);
    grid.appendChild(card);

    shown++;
  });

  noResults.hidden = shown !== 0;
}

function addToOrder(item) {
  orderCount++;
  orderTotal += item.price;
  updateOrderBar();
}

function updateOrderBar() {
  document.querySelector("#orderCount").textContent = orderCount;
  document.querySelector("#orderTotal").textContent = orderTotal;
}

document.querySelector("#clearOrder").addEventListener("click", () => {
  orderCount = 0;
  orderTotal = 0;
  updateOrderBar();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    button.classList.add("active");
    currentCategory = button.dataset.category;
    showMenu();
  });
});

searchInput.addEventListener("input", showMenu);

showMenu();
