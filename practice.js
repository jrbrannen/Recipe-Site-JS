/******************************
 *  Default recipe object
 ******************************/
// let recipeObject = {    
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

/*********************************
 * Global variables
**********************************/
// Array for storing server files to load page via AJAX
let recipeManagerArray = [
    { 
        recipe_name: "Crockpot Chili",
        recipe_file: "json/crockpotChili.json"
    },
    {
        recipe_name: "Dipped Gingersnaps",
        recipe_file: "json/DippedGingersnaps.json"
    },
    {
        recipe_name: "Chicken Noodle Casserole",
        recipe_file: "json/chickenNoodle.json"
    }];

// Default ingredient object
let ingredientObject = {  
    ingredient_name: "",
    ingredient_unit:  "",
    ingredient_quantity: 0
}

let recipeObject = {};
// Array of recipe objects     
let recipeObjectArray = [];   
let recipeObjectArrayJSON = [];
let quantity = "";
let quantityArray = [];

/*************************************************************************
 * Page loading will start AJAX call and load server recipe files followed
 * by checking local storage for any user uploaded recipes and then load 
 * them.  After recipes have been loaded a static form for recipe input is
 * built.
 ************************************************************************/

/********************************
 * Functions in alphabetic order
 *******************************/

/* This is a generic function to add a http cookie.
*/
function addCookie(tag, value){
    let expireDate = new Date();
    let expireString = "";
    expireDate.setTime(expireDate.getTime() + (1000 * 60 * 60 * 24 * 365));
    expireString = "expires=" + expireDate.toGMTString();
    document.cookie = tag + "=" + escape(value) + ";" + expireString + ";";
}

/**
 * function dynamically builds text input fields for ingredients 
 * on the insert recipe form based on how many the user selected
 */  
                                    
function buildIngredientsInput(){
    // get the parent div element
    let divObj = document.querySelector(".ingredient-input");
    // remove it if it exsist
    if(typeof(divObj) != "undefined" && divObj != null){
        divObj.remove();
    }

    // build or rebuild the div element and append it
    divObj = document.createElement("div");
    divObj.setAttribute("class", "ingredient-input");
    document.querySelector(".inputs").appendChild(divObj);
    // get the value from number input field for how many containers to build
    let totalIngredients = document.querySelector("#num_ingredients").value;
    
    // run loop to build each element and append it to the parent div element
    for( let i = 0; i < totalIngredients; i++){
        let grpDivObj = document.createElement("div");
        grpDivObj.setAttribute("class", "input-group grpDivObj");

        let prependDivObj = document.createElement("div");
        prependDivObj.setAttribute("class", "input-group-prepend");

        let spanObj = document.createElement("span");
        spanObj.setAttribute("class", "input-group-text mr-2");
        spanObj.innerHTML = "Ingredient:";

        let numInputObj = document.createElement("input");
        numInputObj.setAttribute("type", "number");
        numInputObj.setAttribute("class", "form-control");
        numInputObj.setAttribute("id", "quantity" + i);
        numInputObj.setAttribute("name", "quantity");
        numInputObj.setAttribute("placeholder", "1");

        let unitInputObj = document.createElement("input");
        unitInputObj.setAttribute("type", "text");
        unitInputObj.setAttribute("class", "form-control");
        unitInputObj.setAttribute("id", "unit" + i);
        unitInputObj.setAttribute("name", "unit");
        unitInputObj.setAttribute("placeholder", "cup");

        let nameInputObj = document.createElement("input");
        nameInputObj.setAttribute("type", "text");
        nameInputObj.setAttribute("class", "form-control");
        nameInputObj.setAttribute("id", "ingredient" + i);
        nameInputObj.setAttribute("name", "ingredient");
        nameInputObj.setAttribute("placeholder", "sugar");

        prependDivObj.appendChild(spanObj);
        grpDivObj.appendChild(prependDivObj);
        grpDivObj.appendChild(numInputObj);
        grpDivObj.appendChild(unitInputObj);
        grpDivObj.appendChild(nameInputObj);
        document.querySelector(".ingredient-input").appendChild(grpDivObj);
    }
} // end buildIngredientsInput()

/**
 * Dynamically builds input boxes for recipe instructions for the 
 * input form based on the number inputed by user
 */
function buildInstructionInput(){
    // get parent div element
    let divObj = document.querySelector(".instruction-input");
    // remove it if it exsist
    if(typeof(divObj) != "undefined" && divObj != null){
        divObj.remove();
    }
    // build or rebuild the div element and append it
    divObj = document.createElement("div");
    divObj.setAttribute("class", "instruction-input");
    document.querySelector(".second-inputs").appendChild(divObj);
    // get the value from number input field for how many containers to build
    let totalIngredients = document.querySelector("#num_instructions").value;
    // run loop to build each element and append it to the parent div element
    for( let i = 0; i < totalIngredients; i++){
        let grpDivObj = document.createElement("div");
        grpDivObj.setAttribute("class", "input-group grpDivObj");

        let prependDivObj = document.createElement("div");
        prependDivObj.setAttribute("class", "input-group-prepend");

        let spanObj = document.createElement("span");
        spanObj.setAttribute("class", "input-group-text mr-2");
        spanObj.innerHTML = "Instructions:";

        let inputObj = document.createElement("input");
        inputObj.setAttribute("type", "text");
        inputObj.setAttribute("class", "form-control");
        inputObj.setAttribute("id", "instructions" + i);
        inputObj.setAttribute("name", "instructions");
        inputObj.setAttribute("placeholder", "Tell us what to do.");

        prependDivObj.appendChild(spanObj);
        grpDivObj.appendChild(prependDivObj);
        grpDivObj.appendChild(inputObj);
       
        document.querySelector(".instruction-input").appendChild(grpDivObj);
    }
} // end buildInstructionInput()

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
    headH1Obj.setAttribute("class", "mt-5");
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
    halfButtonObj.addEventListener("click", function(){halfServings(quantityArray)});
    // normal quantity button object (button)
    let normButtonObj = document.createElement("button");
    normButtonObj.innerHTML = "Normal Serving";
    normButtonObj.setAttribute("class", "btn btn-outline-primary m-2");
    normButtonObj.addEventListener("click", function(){normalServings(quantityArray)});
    // double quantity button object (button)
    let dblButtonObj = document.createElement("button");
    dblButtonObj.innerHTML = "Double Serving";
    dblButtonObj.setAttribute("class", "btn btn-outline-primary");
    dblButtonObj.addEventListener("click", function(){doubleServings(quantityArray)});
    // p object (prep time)
    let prepPObj = document.createElement("p");
    prepPObj.innerHTML = "Preparation time ~ " + inRecipeObj.recipe_prep;
    prepPObj.setAttribute("class", "mt-3");
    // p object (cook time)
    let cookPObj = document.createElement("p");
    cookPObj.innerHTML = "Cooking time ~ " + inRecipeObj.recipe_cooking_time;
    // p object (difficulty)
    let difficultyPObj = document.createElement("p");
    difficultyPObj.innerHTML = "Difficulty ~ " + inRecipeObj.recipe_difficulty

    // append
    divObj.appendChild(headH1Obj);
    divObj.appendChild(headImageObj);
    divObj.appendChild(halfButtonObj);
    divObj.appendChild(normButtonObj);
    divObj.appendChild(dblButtonObj);
    divObj.appendChild(prepPObj);
    divObj.appendChild(cookPObj);
    divObj.appendChild(difficultyPObj);
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
        let spanObj = document.createElement("span");
        spanObj.setAttribute("id", "spanQuantity" + i)
        let pObj = document.createElement("p");
        quantityArray.push(inRecipeObj.recipe_ingredients_list[i].ingredient_quantity)
        spanObj.innerHTML = inRecipeObj.recipe_ingredients_list[i].ingredient_quantity;
        pObj.innerHTML = " " + inRecipeObj.recipe_ingredients_list[i].ingredient_unit + " " +  
            inRecipeObj.recipe_ingredients_list[i].ingredient_name;
        pObj.insertAdjacentElement("afterbegin", spanObj);
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
    aObj.innerHTML = "Instructions";
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

/**
 * Uses form values to create and recipe object and store it in local storage
 */
 function buildRecipeObject(){
    let prepRadioValue = getPrepRadioValue();
    let cookTimeValue = getCookRadioValue();
    let numOfIngredients = document.querySelector("#num_ingredients").value;
    let numOfInstructions = document.querySelector("#num_instructions").value;
    let ingredientObjArray = [];
    let instructionsArray = [];
    let imagePath = document.querySelector("#fileupload").value;
    imagePath = imagePath.replace(/^C:\\fakepath\\/, "");
    
    for(let i = 0; i < numOfIngredients; i++){
        let ingredientObj = {
            ingredient_quantity: document.querySelector("#quantity" + i).value,
            ingredient_unit: document.querySelector("#unit" + i).value,
            ingredient_name: document.querySelector("#ingredient" + i).value
        }   
        ingredientObjArray.push(ingredientObj);
        console.log("build" + document.querySelector("#quantity" + i).value);
    } 
    for(let i = 0; i < numOfInstructions; i++){
        let instructionString = document.querySelector("#instructions" + i).value;
        instructionsArray.push(instructionString); 
    }  
    recipeObject = {
        // name
        recipe_name: document.querySelector("#recipe_name").value,

        // image
        recipe_image: imagePath,
        
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
   // check to see if local storage key is already set
    if(localStorage.getItem("recipes") != null){
        // get local storage items & store in variable
        recipeObjectArrayJSON = localStorage.getItem("recipes");
        // parse from json format
        recipeObjectArray = JSON.parse(recipeObjectArrayJSON);
    }
    // push recipe object to the array
    recipeObjectArray.push(recipeObject);

    // convert array to json format
    recipeObjectArrayJSON = JSON.stringify(recipeObjectArray);

    // store in local storage
    localStorage.setItem("recipes", recipeObjectArrayJSON);

}// end buildRecipeObject()

/**
 * Builds a name for each avaiable recipe under the page header
 */
 function buildRecipeTitles(){
    
    for(i = 0; i < recipeManagerArray.length; i++){

        let file = recipeManagerArray[i].recipe_file;
        let titleH4Obj = document.createElement("h4");
        titleH4Obj.setAttribute("class", "text-capitalize");
        titleH4Obj.innerHTML = recipeManagerArray[i].recipe_name;
        titleH4Obj.addEventListener("click", function(){ getRecipeObjJSON(file);});
        // titleH2Obj.addEventListener("click", clearQuantityArray);
        document.querySelector(".titles").appendChild(titleH4Obj);
    }
    // check to see if local storage key is already set
    if(localStorage.getItem("recipes") != null){
        // get local storage items & store in variable
        recipeObjectArrayJSON = localStorage.getItem("recipes");
        // parse from json format
        recipeObjectArray = JSON.parse(recipeObjectArrayJSON);
        // build a title for each recipe in the array
        
        for(let i = 0; i < recipeObjectArray.length; i++){
            let titleH4Obj = document.createElement("h4");
            titleH4Obj.setAttribute("class", "text-capitalize");
            titleH4Obj.innerHTML = recipeObjectArray[i].recipe_name;
            // displayRecipeOnPage(recipeObjectArray[i]);
            titleH4Obj.addEventListener("click", function(){displayRecipeOnPage(recipeObjectArray[i])});
            // titleH2Obj.addEventListener("click", clearQuantityArray);
            document.querySelector(".titles").appendChild(titleH4Obj);
        }
    }
}// end buildTitles()

/**
 *Clears array that holds current recipes quantity data in an
 * array. 
 */
 function clearQuantityArray(){
    quantityArray.splice(0, quantityArray.length);
}// end clearQuantityArray(
function displayRecipeOnPage(inRecipeObj){
    console.log(inRecipeObj);
    deleteRecipe();
    clearQuantityArray();
    buildRecipeHeading(inRecipeObj);
    buildRecipeIngredientList(inRecipeObj);
    buildRecipeInstructions(inRecipeObj)
}// end displayRecipeOnPage()

/* Function creates a new date object, converts it to the local time in a string,
converts the date to a local date string and stores them in a variable.  It then
call the addCookie().
*/
function dateAndTimeCookie(){
    let date = new Date();
    let time = date.toLocaleTimeString();
    date = date.toLocaleDateString("en-US");       
    let dateAndTime = date + " " + time;
    addCookie("LastVisit", dateAndTime);        
}// end dateAndTimeCookie()

/**
 * Deletes the current recipe that is display before a new recipe
 * is built and displayed
 */
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

/**
 * Displays Home Access count cookie
 */
function displayNumOfHomeAccessCount(){
    document.querySelector(".showNumOfHomeAccess").innerHTML = getCookie("Access");
}

/**
 * Displays Date and Time cookie
 */
function displayDateAndTimeCookie(){
    document.querySelector(".showDateAndTimeCookie").innerHTML = getCookie("LastVisit");
}

/**
 * gets quantity from array and displays double current quantity
 * @param {*} inArray 
 */
function doubleServings(inArray){
    for( let i = 0; i < inArray.length; i++){
        let quantity = inArray[i] * 2;
        document.querySelector("#spanQuantity" + i).innerHTML = quantity;
    }
}// end doubleServings()

/* Generic function to get the value of a cookie and return that value.
If there is no cookie with a matching value of "cname" it will return a null value.
*/
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}   

/**
 * Gets which radio button was selected
 * @returns value
 */
 function getCookRadioValue(){
    let value = document.getElementsByName("cook_hours");
    for( let i =0; i < value.length; i++){
        if(value[i].checked){
            value = value[i].value;
            return value; 
        }
    }
}// end getCookRadioValue()

/**
 * Gets which radio button was selected
 * @returns value
 */
 function getPrepRadioValue(){
    let value = document.getElementsByName("prep_hours");
    for( let i =0; i < value.length; i++){
        if(value[i].checked){
            value = value[i].value;
            return value;
        }
    }
}// end getPrepRadioValue()

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
 * Gets current year to display in copyright
 */
 function getYear(){
    let year = new Date();
    year = year.getFullYear();
    return year;
}

/**
 * dynamically changes the quantity amount to half based on
 * quantity data in the quantity array
 * @param {*} inArray 
 */
function halfServings(inArray){
    for( let i = 0; i < inArray.length; i++){
        let quantity = parseFloat(inArray[i]);
        quantity = quantity * .5;
        document.querySelector("#spanQuantity" + i).innerHTML = quantity;
    }    
}// end halfServings()

/**
 * Dyamically changes quantity amount back to it's original value
 * that was stored in the array
 */
function normalServings(inArray){
    for( let i = 0; i < inArray.length; i++){
        let quantity = inArray[i];
        document.querySelector("#spanQuantity" + i).innerHTML = quantity;
    }
}// end normalServings()

/* Fuction uses a cookie to store a counter value for home page visits.  
It will get the Access cookie value, parse that value to an int,  add a 
counter to the value, and finally create a new cookie Access with the new value.  
If the Access cookie is null the else statement will assign it a value of 1 
to get the counter started on the first home page visit.
*/
function numOfHomeAccessCount(){
    
    if (getCookie("Access") != null)  {
        let value = getCookie("Access");          
        parseInt(value);  
        value++;   
        addCookie("Access", value);
    }
    else{
        addCookie("Access", 1);
    }
} // end numOfHomeAccessCount()

/**
* Functions that run on on page load
*/
 function pageLoad(){
    buildRecipeTitles();
    dateAndTimeCookie();
    numOfHomeAccessCount();
    displayDateAndTimeCookie();
    displayNumOfHomeAccessCount();
}// end pageLoad()

/**
 *  uploads image to file path
 */
async function uploadImage() {
    let formData = new FormData(); 
    formData.append("file", fileupload.files[0]);
    await fetch('/wdv321/Dynamic Recipe Project/Recipe-Site-JS/upload.php', {
      method: "POST", 
      body: formData
    }); 
    alert('The image has been uploaded successfully.');
}

/**
 * Validates input form - kicks back to form if validation fails
 * if it passes it builds the recipe as an object and stores in 
 * local storage
 */
function validateForm(){
    let name = document.forms["input_form"]["recipe_name"].value;
    let servings = document.forms["input_form"]["servings"].value;
    let prepTime = document.forms["input_form"]["prep_time"].value;
    let cookTime = document.forms["input_form"]["cook_time"].value;
    let difficulty = document.forms["input_form"]["difficulty"].value;
    let ingredients = document.forms["input_form"]["num_ingredients"].value;
    let instuctions = document.forms["input_form"]["num_instructions"].value;
    
    if (name == ""){
        alert("Recipe name is required.");
        return false;
    }
    else if (servings == ""){
        alert("Cook time is required.");
        return false;
    }
    else if (prepTime == ""){
        alert("Cook time is required.");
        return false;
    }
    else if (cookTime == ""){
        alert("Cook time is required.");
        return false;
    }
    else if (difficulty == ""){
        alert("Difficulty level is required.");
        return false;
    }
    else if (ingredients == ""){
        alert("At least one ingredient is required.");
        return false;
    }
    else if (instuctions == ""){
        alert("At least one instruction is required.");
        return false;
    }
    // builds the recipe if form is valid
    buildRecipeObject(); 
}
