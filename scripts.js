// All variables 
const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  allMeals = document.getElementById('meals'),
  showResult = document.getElementById('show-result'),
  singleMeal = document.getElementById('single-meal');

// Find meal and fetch meal by API
function findMeal(e) {
  e.preventDefault();

  // Clear single meal
  singleMeal.innerHTML = '';

  // Get search Term
  const searchTerm = search.value;

  // Check for empty
  if (searchTerm.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        showResult.innerHTML = `<h3>Search results for '${searchTerm}':</h3>`;

        if (data.meals === null) {
          showResult.innerHTML = `<p>There are no search results. Try again!<p>`;
        } else {
          allMeals.innerHTML = data.meals
            .map(
              meal => `
              <div class="meal">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                <h5>${meal.strMeal}</h5>
                <div class="meal-info" data-mealID="${meal.idMeal}">
                </div>
              </div>
            `
            )
            .join('');
        }
      });
    search.value = ''; // clear search value
  } else {
    alert('Please enter a search Term');
  }
}

//fetch meal by ID
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];
      mealToSingle(meal);
    })
}

// Show meal to Single
function mealToSingle(meal) {
  const ingredients = [];
  for (let i = 1; 1 <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    } else {
      break
    }
  }
  singleMeal.innerHTML = `
    <div class="single-meal">  
     <img src="${meal.strMealThumb}" alt="${meal.strMeal}" 
      <div class="main">
      <h1>${meal.strMeal}</h1>
      <h4>Ingredients</h4>
      <ul>
      ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
      </ul>
      </div>
    </div>
    `}

// click event listeners
submit.addEventListener('submit', findMeal);
meals.addEventListener('click', e => {
  const mealInfo = e.path.find(item => {
    if (item.classList) {
      return item.classList.contains('meal-info')
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid');
    getMealById(mealID);
  }
})