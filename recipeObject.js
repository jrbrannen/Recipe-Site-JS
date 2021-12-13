let recipeObjectArray = [];   // Array of recipe objects

let recipeObject = {    // Default recipe object
  recipe_name: "",  
  recipe_image: "",  
  recipe_servings: 0,
  recipe_prep: "",
  recipe_cooking_time: "",
  recipe_difficulty: "",
  recipe_ingredients_list: [
    {
      ingredient_name: "",
      ingredient_unit: "",
      ingredient_quantity: 0
    }],
  recipe_instructions: [""]
};

let ingredientObject = {  // Default ingredient object
  ingredient_name: "",
  ingredient_unit:  "",
  ingredient_quantity: 0
}