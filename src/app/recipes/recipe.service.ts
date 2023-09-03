import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

    constructor(private slService: ShoppingListService) { }

    private recipes: Recipe[] = [
        new Recipe(0,
          'A Test Recipe', 
          'This is a simple test', 
          'https://shewearsmanyhats.com/wp-content/uploads/2018/10/chicken-breasts-with-creamy-mushroom-sauce-recipe-2-480x360.jpg',
          [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 20)
          ]
        ),
        new Recipe(1,
          'Another Test Recipe', 
          'This is a simple test', 
          'https://shewearsmanyhats.com/wp-content/uploads/2018/10/chicken-breasts-with-creamy-mushroom-sauce-recipe-2-480x360.jpg',
          [
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 1)
          ]
        ),
      ];
    
    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id: number): Recipe {
      return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
      this.slService.addIngredients(ingredients);
      this.recipesChanged.next(this.recipes.slice());
    }

    addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
      this.recipes[index] = newRecipe;
      console.log(newRecipe)
      this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
    }
}