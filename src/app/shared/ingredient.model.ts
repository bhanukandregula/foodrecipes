export class Ingredient {

  // public name: string;
  // public amount: number;
  //
  // constructor(name: string, amount: number) {
  //   this.name = name;
  //   this.amount = amount;
  // }

  // we can have accessors public/private in the costructor irself, which is same as above
  constructor( public name: string, public amount: number) {
  }

}
