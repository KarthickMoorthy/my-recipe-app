import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.modal';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.modal';

@Injectable()
export class RecipeService {
  recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  constructor(private shoppinglistService: ShoppingListService) {}

  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is Test',
      'https://www.wholesomeyum.com/wp-content/uploads/2020/06/wholesomeyum-recipe-index.jpg',
      [new Ingredient('Meat', 1), new Ingredient('French fries', 2)]
    ),
    new Recipe(
      'A Another Recipe',
      'This is Test',
      'https://www.wholesomeyum.com/wp-content/uploads/2020/06/wholesomeyum-recipe-index.jpg',
      [new Ingredient('Cheese', 1), new Ingredient('Avacado', 2)]
    ),
  ];

  setRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  addIngredientsToShoppinglist(ingredients: Ingredient[]): void {
    this.shoppinglistService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe): void {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
