import {Recipe} from "./recipe.model";
import {EventEmitter, Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";
@Injectable()
export class RecipeService {
  // recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Chicken Biryani', 'This is a test receipe',
      'https://p0.pxfuel.com/preview/995/747/603/recipe-dish-lunch-nutrition.jpg',
      [new Ingredient('Chicken', 1), new Ingredient('Apple', 20)]),
    new Recipe('Ulwacharu Biryani', 'This is a test receipe', 'https://p0.pxfuel.com/preview/995/747/603/recipe-dish-lunch-nutrition.jpg',[new Ingredient('Fish', 1), new Ingredient('Apple', 20)]),
    new Recipe('Raju Gari Kodi Pulav', 'This is a test receipe', 'https://p0.pxfuel.com/preview/995/747/603/recipe-dish-lunch-nutrition.jpg',[new Ingredient('Mutton', 1), new Ingredient('Apple', 20)]),
    new Recipe('Vijayawada Gangora Biryani', 'This is a test receipe', 'https://p0.pxfuel.com/preview/995/747/603/recipe-dish-lunch-nutrition.jpg',[new Ingredient('Spinach', 1), new Ingredient('Apple', 20)]),
    new Recipe('Hyderabad Dum Biryani', 'This is a test receipe', 'https://p0.pxfuel.com/preview/995/747/603/recipe-dish-lunch-nutrition.jpg',[new Ingredient('Milk', 1), new Ingredient('Apple', 20)]),
  ];

  constructor(private slService: ShoppingListService) {

  }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes.slice()[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }


}
