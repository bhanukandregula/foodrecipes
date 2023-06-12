import {Component, ElementRef, EventEmitter, OnInit, OnDestroy ,Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import { NgForm } from '@angular/forms';
import {Subscription} from "rxjs";
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  // ingredientAdded = new EventEmitter<{name:string, amount: number}>();
  // @Output() ingredientAdded: any = new EventEmitter<Ingredient>();
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  constructor(private slService: ShoppingListService) {
  }
  ngOnInit(): void {
   this.subscription = this.slService.startedEditing.subscribe(
     (index: number) => {
       this.editedItemIndex = index;
       this.editMode = true;
       this.editedItem = this.slService.getIngredient(index);
       this.slForm.setValue({
         name: this.editedItem.name,
         amount: this.editedItem.amount
       })
     }
   );
  }

  onSubmit( form: NgForm ){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    }else{
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
    // this.slService.addIngredient(newIngredient);
  }

  onClear(){
    console.log("Clear button was clicked!")
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    console.log("Delete button was clicked!");
    this.slService.deleteIngredients(this.editedItemIndex);
    this.onClear();

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
