let recipeObject = {    // Default recipe object
    recipe_name: "Dipped Gingersnaps",  
    recipe_image: "image.jpg",  
    recipe_servings: 14,
    recipe_prep: "20 minutes",
    recipe_cooking_time: "10 minutes per batch",
    recipe_difficulty: "moderate",
    recipe_ingredients_list: [
      {
        ingredient_name: "sugar",
        ingredient_unit: "cups",
        ingredient_quantity: 2
      },
      {
        ingredient_name: "canola oil",
        ingredient_unit: "cups",
        ingredient_quantity: 1.5
      },
      {
        ingredient_name: "large eggs",
        ingredient_unit: "room tempeture",
        ingredient_quantity: 2
      },
      {
        ingredient_name: "molasses",
        ingredient_unit: "cup",
        ingredient_quantity: .5
      },
      {
        ingredient_name: "all-purpose flour",
        ingredient_unit: "cups",
        ingredient_quantity: 4
      },
      {
        ingredient_name: "baking soda",
        ingredient_unit: "tsp.",
        ingredient_quantity: 4
      },
      {
        ingredient_name: "ground ginger",
        ingredient_unit: "tsp.",
        ingredient_quantity: 3
      },
      {
        ingredient_name: "ground cinnamon",
        ingredient_unit: "tsp.",
        ingredient_quantity: 2
      },
      {
        ingredient_name: "salt",
        ingredient_unit: "tsp.",
        ingredient_quantity: 1
      },
      {
        ingredient_name: "white baking chips",
        ingredient_unit: "ounces",
        ingredient_quantity: 20
      },
      {
        ingredient_name: "shortening",
        ingredient_unit: "cup",
        ingredient_quantity: .25
      }],
    recipe_instructions: [
        "In a large bowl, combine sugar and oil.",
        "Beat in eggs. Stir in molasses.",
        "Combine the flour, baking soda, ginger, cinnamon and salt; gradually add to creamed mixture and mix well.",
        "Shape into 3/4-in. balls and roll in sugar.",
        "Place 2 in. apart on ungreased baking sheets.",
        "Bake at 350° until cookies spring back when touched lightly, 10-12 minutes",
        "Remove to wire racks to cool.",
        "In a microwave, melt chips and shortening; stir until smooth",
        "Dip cookies halfway into the melted chips or drizzle with mixture; allow excess to drip off.",
        "Place on waxed paper; let stand until set."
    ]
  };

  let dippedGingerJSON = JSON.stringify(recipeObject);