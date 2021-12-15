let recipeObject = {};      
let recipeObjectArray = [];   // Array of recipe objects
let recipeObjectArrayJSON = [];
// let recipeObject = {    // Default recipe object
//   recipe_name: "",  
//   recipe_image: "",  
//   recipe_servings: 0,
//   recipe_prep: "",
//   recipe_cooking_time: "",
//   recipe_difficulty: "",
//   recipe_ingredients_list: [
//     {
//       ingredient_name: "",
//       ingredient_unit: "",
//       ingredient_quantity: 0
//     }],
//   recipe_instructions: [""]
// };

let ingredientObject = {  // Default ingredient object
  ingredient_name: "",
  ingredient_unit:  "",
  ingredient_quantity: 0
}
function getPrepRadioValue(){
    let value = document.getElementsByName("prep_hours");
    for( let i =0; i < value.length; i++){
        if(value[i].checked){
            value = value[i].value;
            return value;
        }
    }
}

function getCookRadioValue(){
    let value = document.getElementsByName("cook_hours");
    for( let i =0; i < value.length; i++){
        if(value[i].checked){
            value = value[i].value;
            return value;
        }
    }
}

function buildRecipeObject(){
    let prepRadioValue = getPrepRadioValue();
    let cookTimeValue = getCookRadioValue();
    let numOfIngredients = document.querySelector("#num_ingredients").value;
    let numOfInstructions = document.querySelector("#num_instructions").value;
    let ingredientObjArray = [];
    let instructionsArray = [];
    for(let i = 0; i < numOfIngredients; i++){
        let ingredientObj = {
            ingredient_quantity: document.querySelector("#quantity" + i).value,
            ingredient_unit: document.querySelector("#unit" + i).value,
            ingredient_name: document.querySelector("#ingredient" + i).value
        }   
        ingredientObjArray.push(ingredientObj);    
    } 
    for(let i = 0; i < numOfInstructions; i++){
        let instructionString = document.querySelector("#instructions" + i).value;
        instructionsArray.push(instructionString); 
    }  
    recipeObject = {
        // name
        recipe_name: document.querySelector("#recipe_name").value,

        // image
        // recipeObject.recipe_image = document.querySelector("#recipe_image").value;

        // servings
        recipe_servings: document.querySelector("#servings").value,
        
        // prep time
        recipe_prep: document.querySelector("#prep_time").value + " " + prepRadioValue,
        
        // cook time 
        recipe_cooking_time: document.querySelector("#cook_time").value + " " + cookTimeValue,
        
        // difficulty
        
        recipe_difficulty: document.querySelector("#difficulty").value,
        // ingredent list
        recipe_ingredients_list: ingredientObjArray,

        // instruction list
        recipe_instructions: instructionsArray
    }
    console.log(recipeObject);  

    recipeObjectJSON = JSON.stringify(recipeObject);
    console.log(recipeObjectJSON);

    recipeObjectArrayJSON = localStorage.getItem("recipes");

    recipeObjectArrayJSON.push(recipeObjectJSON);

    localStorage.setItem("recipes", recipeObjectArrayJSON);
}