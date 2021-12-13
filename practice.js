let recipeManagerArray = [
    { 
        recipe_name: "Crockpot Chili",
        recipe_file: "json/crockpotChili.json"
    },
    {
        recipe_name: "Dipped Gingersnaps",
        recipe_file: "json/DippedGingersnaps.json"
    }];
let quantity = "";
/**
 * Builds a name for each avaiable recipe under the page header
 */
function buildRecipeTitles(){
    for(i = 0; i < recipeManagerArray.length; i++){

        let file = recipeManagerArray[i].recipe_file;
        let titleH2Obj = document.createElement("h2");
        titleH2Obj.innerHTML = recipeManagerArray[i].recipe_name;
        titleH2Obj.addEventListener("click", function(){ getRecipeObjJSON(file);});
        document.querySelector(".titles").appendChild(titleH2Obj);
    }// end buildTitles()
}
/**
 * AJAX call to get Recipe JSON object from the server
 * to dynamically display a selected recipe to the page
 * @param {} inJSONFile 
 */
function getRecipeObjJSON(inJSONFile){

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {          
            let recipeObjJSON = xmlhttp.responseText;  
            recipeObj = JSON.parse(recipeObjJSON);
            displayRecipeOnPage(recipeObj); 
        }// end if
    }// end function
    xmlhttp.open("GET",inJSONFile,true);
    xmlhttp.send();
}// end getJSONObject()

/**
 * Builds the heading for the recipe display
 * @param {} inRecipeObj 
 */
function buildRecipeHeading(inRecipeObj){
    
    // div object 
    let divObj = document.createElement("div");
    divObj.setAttribute("class", "recipe-heading text-center");
    // h1 object (Name)
    let headH1Obj = document.createElement("h1");
    headH1Obj.innerHTML = inRecipeObj.recipe_name;
    // image object (Image)
    let headImageObj = document.createElement("img");
    headImageObj.setAttribute("src", "images/" + inRecipeObj.recipe_image);
    headImageObj.setAttribute("alt", "Picture of: " + inRecipeObj.recipe_name);
    headImageObj.setAttribute("class", "img-fluid img-thumbnail mx-auto d-block");
    // 1/2 quantity button object (button)
    let halfButtonObj = document.createElement("button");
    halfButtonObj.innerHTML = "Half Serving";
    halfButtonObj.setAttribute("class", "btn btn-outline-primary");
    halfButtonObj.addEventListener("click", function(){adjustQuantity(.5)});
    // normal quantity button object (button)
    let normButtonObj = document.createElement("button");
    normButtonObj.innerHTML = "Normal Serving";
    normButtonObj.setAttribute("class", "btn btn-outline-primary m-2");
    // double quantity button object (button)
    let dblButtonObj = document.createElement("button");
    dblButtonObj.innerHTML = "Double Serving";
    dblButtonObj.setAttribute("class", "btn btn-outline-primary");
    // p object (prep time)
    let prepPObj = document.createElement("p");
    prepPObj.innerHTML = "Preparation time ~ " + inRecipeObj.recipe_prep;
    // p object (cook time)
    let cookPObj = document.createElement("p");
    cookPObj.innerHTML = "Cooking time ~ " + inRecipeObj.recipe_cooking_time;

    // append
    divObj.appendChild(headH1Obj);
    divObj.appendChild(headImageObj);
    divObj.appendChild(halfButtonObj);
    divObj.appendChild(normButtonObj);
    divObj.appendChild(dblButtonObj);
    divObj.appendChild(prepPObj);
    divObj.appendChild(cookPObj);
    document.querySelector(".recipe-display").appendChild(divObj);
   

}// end buildRecipeHeading()

/**
 * Builds the ingredient list section of recipe
 * in an accordion 
 */
function buildRecipeIngredientList(inRecipeObj){
    // create elements with attributes
    let mainDivObj = document.createElement("div");
    mainDivObj.setAttribute("id", "accordion");
    mainDivObj.setAttribute("class", "col-md-8 mx-auto recipe-list");
    let cardDivObj = document.createElement("div");
    cardDivObj.setAttribute("class", "card");
    let cardHeadDivObj = document.createElement("div");
    cardHeadDivObj.setAttribute("class", "card-header text-center");
    let aObj = document.createElement("a");
    aObj.setAttribute("data-toggle", "collapse");
    aObj.setAttribute("class", "card-link");
    aObj.setAttribute("href", "#collapseList");
    aObj.innerHTML = "Ingredient List";
    let subDivObj = document.createElement("div");
    subDivObj.setAttribute("class", "collapse");
    subDivObj.setAttribute("id", "collapseList");
    subDivObj.setAttribute("data-parent", "#accordion");
    let cardBodyDivObj = document.createElement("div");
    cardBodyDivObj.setAttribute("class", "card-body");
    for( let i = 0; i < inRecipeObj.recipe_ingredients_list.length; i++){
        let pObj = document.createElement("p");
        pObj.innerHTML = 
            inRecipeObj.recipe_ingredients_list[i].ingredient_quantity + " " +
            inRecipeObj.recipe_ingredients_list[i].ingredient_unit + " " +
            inRecipeObj.recipe_ingredients_list[i].ingredient_name;
        cardBodyDivObj.appendChild(pObj);
    }

    // append
    subDivObj.appendChild(cardBodyDivObj);
    cardHeadDivObj.appendChild(aObj);
    cardDivObj.appendChild(cardHeadDivObj);
    cardDivObj.appendChild(subDivObj);
    mainDivObj.appendChild(cardDivObj);
    document.querySelector(".recipe-display").appendChild(mainDivObj);
}// end buildRecipeIngredientList()

/**
 * Builds the recipe instructions in an accordion
 * @param {} inRecipObject 
 */
function buildRecipeInstructions(inRecipeObj){
    // create elements with attributes
    let mainDivObj = document.createElement("div");
    mainDivObj.setAttribute("id", "accordion2");
    mainDivObj.setAttribute("class", "col-md-8 mx-auto recipe-instruct");
    let cardDivObj = document.createElement("div");
    cardDivObj.setAttribute("class", "card");
    let cardHeadDivObj = document.createElement("div");
    cardHeadDivObj.setAttribute("class", "card-header text-center");
    let aObj = document.createElement("a");
    aObj.setAttribute("data-toggle", "collapse");
    aObj.setAttribute("class", "card-link");
    aObj.setAttribute("href", "#collapseInstructions");
    aObj.innerHTML = "Instuctions";
    let subDivObj = document.createElement("div");
    subDivObj.setAttribute("class", "collapse");
    subDivObj.setAttribute("id", "collapseInstructions");
    subDivObj.setAttribute("data-parent", "#accordion2");
    let cardBodyDivObj = document.createElement("div");
    cardBodyDivObj.setAttribute("class", "card-body");
    for( let i = 0; i < inRecipeObj.recipe_instructions.length; i++){
        let pObj = document.createElement("p");
        pObj.innerHTML = inRecipeObj.recipe_instructions[i];
        cardBodyDivObj.appendChild(pObj);
    }

    // append
    subDivObj.appendChild(cardBodyDivObj);
    cardHeadDivObj.appendChild(aObj);
    cardDivObj.appendChild(cardHeadDivObj);
    cardDivObj.appendChild(subDivObj);
    mainDivObj.appendChild(cardDivObj);
    document.querySelector(".recipe-display").appendChild(mainDivObj);
}// end buildRecipteInstructions()

function deleteRecipe(){
    let headingElement = document.querySelector(".recipe-heading");
    let listElement = document.querySelector(".recipe-list");
    let instructionElement = document.querySelector(".recipe-instruct")
    if(typeof(headingElement) != "undefined" && headingElement != null){
        headingElement.remove();
    }// end if
    if(typeof(listElement) != "undefined" && listElement != null){
        listElement.remove();
    }
    if(typeof(instructionElement) !="undefined" && instructionElement != null){
        instructionElement.remove();
    }
}// end deleteRecipe()

function displayRecipeOnPage(inRecipeObj){
    console.log(inRecipeObj);
    deleteRecipe();
    buildRecipeHeading(inRecipeObj);
    buildRecipeIngredientList(inRecipeObj);
    buildRecipeInstructions(inRecipeObj)
}// end displayRecipeOnPage()

function adjustQuantity(inNum){
    quantity = inNum;
}// end adjustQuantity()

