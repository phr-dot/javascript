// https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=20

const APP_ID = "7e856bb8";
const APP_KEY = "2a6ca8ec870e022704923956ccb01999";

const input = document.querySelector("#search input");
const btn = document.getElementById("btn");
const recipe_container = document.getElementById("recipe_container");

let foodName = "chicken";
// async function 함수명() {
//   await 비동기_처리_메서드_명();
// }

async function getRecipe() {
  const response = await fetch(`https://api.edamam.com/search?q=${foodName}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=20`);
  const data = await response.json();
  const recipes = data.hits;
  console.log(recipes);

  let paintRecipe = recipes.map((item) => {
    const ingredient = item.recipe.ingredients;

    return `<div class="recipe">
    <img id='photo' src="${item.recipe.image}" alt="">
    <h2 id='label'>${item.recipe.label}</h2>
    <ul class="list">
    ${ingredient.map((item) => `<li>${item.text}</li>`).join("")}    
    </ul>        
  </div>`;
  });

  paintRecipe = paintRecipe.join("");
  recipe_container.innerHTML = paintRecipe;
}

getRecipe();

btn.addEventListener("click", (e) => {
  e.preventDefault();
  foodName = input.value;
  if (foodName === "") return;
  getRecipe();
  input.value = "";
});
