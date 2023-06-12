// Inject angular http service
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {map, tap} from "rxjs";

@Injectable({
  providedIn: 'root' // optional, else we can add in app.module.ts providers
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {

  }

    storeRecipes(){
      const recipes = this.recipeService.getRecipes();
      this.http.put('https://ng-recipebook-e3957-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json', recipes).subscribe(response => {
        console.log(response);
      });
    }

    fetchRecipes(){
      return this.http.get<Recipe[]>('https://ng-recipebook-e3957-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json')
        .pipe(
          map(recipes => {
          return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
          });
      }), tap(recipes => {
            this.recipeService.setRecipes(recipes);
            console.log("Recipes from Firebase realtime DB: ",recipes);
          })
        )
      //   .subscribe(recipes => {
      //   this.recipeService.setRecipes(recipes);
      //   console.log("Recipes from Firebase realtime DB: ",recipes);
      // })
    }
}
