let chickenNoodle = {
    recipe_name: "Chicken Noodle Casserole",
    recipe_image: "chickenNoodle.jpg",  
    recipe_servings: 8,
    recipe_prep: "40 minutes",
    recipe_cooking_time: "30 hours",
    recipe_difficulty: "moderate",
    recipe_ingredients_list: [
      {
        ingredient_name: "skin-on, bone-in chicken breas",
        ingredient_unit: "lb.",
        ingredient_quantity: 2
      },
      {
        ingredient_name: "low sodium chicken broth",
        ingredient_unit:  "cups",
        ingredient_quantity: 4
      },
      {
        ingredient_name: "peppercorns",
        ingredient_unit:  "black",
        ingredient_quantity: 4
      },
      {
        ingredient_name: "salt, divided",
        ingredient_unit:  "tsp.",
        ingredient_quantity: 3.5
      },
      {
        ingredient_name: "leaf",
        ingredient_unit:  "bay",
        ingredient_quantity: 1
      },
      {
        ingredient_name: "parsley sprigs",
        ingredient_unit:  "divided",
        ingredient_quantity: 2
      },
      {
        ingredient_name: "extra-wide egg noodles",
        ingredient_unit:  "oz",
        ingredient_quantity: 12
      },
      {
        ingredient_name: "stalks celery",
        ingredient_unit:  "finely chopped",
        ingredient_quantity: 0.5
      },
      {
        ingredient_name: "ground black pepper",
        ingredient_unit:  "pinch",
        ingredient_quantity: 1
      },
      {
        ingredient_name: "unsalted butter, at room temperature",
        ingredient_unit:  "sticks",
        ingredient_quantity: 2
      },
      {
        ingredient_name: "all-purpose flour",
        ingredient_unit:  "tbsp.",
        ingredient_quantity: 6
      },
      {
        ingredient_name: "whole milk",
        ingredient_unit:  "cup",
        ingredient_quantity: 0.5
      },
      {
        ingredient_name: "sour cream",
        ingredient_unit:  "cup",
        ingredient_quantity: 0.33
      },
      {
        ingredient_name: "jar chopped pimentos, drained",
        ingredient_unit:  "4 oz. jar",
        ingredient_quantity: 1
      },
      {
        ingredient_name: "grated sharp cheddar cheese",
        ingredient_unit:  "cup",
        ingredient_quantity: 2
      }  
    ],
    recipe_instructions: [
      "Preheat the oven to 375??F. Brush or spray a 4-quart (9x13-inch) shallow baking dish with oil.",
      "Cook the chicken.",
      "While the chicken cooks, boil the noodles.",
      "Make the beurre manie: In a small bowl, stir the softened butter and flour together until well combined. It will look a little like paste.",
      "Cook the vegetables and make the sauce.",
      "Pour the sauce over the noodles and stir to coat. Add the shredded chicken and drained pimentos. Transfer to the baking dish and top with the grated cheese.",
      "Bake for 20 to 25 minutes, or until the sauce bubbles and the cheese melts. If you like a slightly crunchy top, run the casserole under the broiler for 3 to 5 minutes, or until the cheese is golden. If desired, chop the remaining sprig of parsley and sprinkle it over the top."
    ]
  };
  
  let chickenNoodleJSON = JSON.stringify(chickenNoodle);
  console.log(chickenNoodleJSON);