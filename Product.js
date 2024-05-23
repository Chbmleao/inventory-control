import {ValidationError} from "./Exceptions.js"

// Unities enum:
export const Unity = Object.freeze({
  KG: "Kg",
  G: "g",
  L: "L",
  ML: "ml",
  UN: "Un",
})


export class Product {
  
  static contiguousUnities = [Unity.KG, Unity.G, Unity.L, Unity.ML]
  static discreteUnities = [Unity.UN]

  constructor(
    description,
    quantity,
    unity,
    priceBought,
    supplier,
  ){
    try {
      this.constructorTypesAreValid(description, quantity, priceBought, supplier);
      this.constructorConstrainsAreValid(quantity, priceBought, unity);
      
      this.id = 4433 // Random insignificant number, won't be used
      this.description = description
      this.quantity = quantity
      this.unity = unity
      this.priceBought = priceBought
      this.supplier = supplier
    
    } catch (error) {
      throw error
    }
  }

  increase(amount) {
      
    if (typeof(amount) != "number")
      throw new ValidationError("Amount must be a number")
    if (this.unity in Product.discreteUnities && typeof(this.amount) != "integer")
      throw new ValidationError("Discrete unities must be increased by integer amounts")
    
    if (amount < 0)
      throw new ValidationError("Amount cannot be negative")

    this.quantity += amount
  }

  decrease(amount) {

    if (typeof(amount) != "number")
      throw new ValidationError("Amount must be a number")
    if (this.unity in Product.discreteUnities && typeof(this.amount) != "integer")
      throw new ValidationError("Discrete unities must be decreased by integer amounts")
    
    if (amount < 0)
      throw new ValidationError("Amount cannot be negative")
    if (this.quantity - amount < 0)
      throw new ValidationError("Quantity cannot be negative")

    this.quantity -= amount
  }

  toInsertDocument() {

    this.constructorTypesAreValid(this.description, this.quantity, this.priceBought, this.supplier)
    this.constructorConstrainsAreValid(this.quantity, this.priceBought, this.unity)
    
    return {
      "description": this.description,
      "quantity": this.quantity,
      "unity": this.unity,
      "priceBought": this.priceBought,
      "supplier": this.supplier,
    }
  }
  
  validateSupplier(supplier) { // TODO: Implement this method
    if (supplier) return true
    return false
  }

  constructorTypesAreValid(description, quantity, priceBought, supplier) {
    if (typeof(description) != "string")
      throw new ValidationError("Description must be a string")
    if (typeof(quantity) != "number")
      throw new ValidationError("Quantity must be a number")
    if (typeof(priceBought) != "number")
      throw new ValidationError("Price bought must be a number")
    if (typeof(supplier) != "string")
      throw new ValidationError("Supplier Id must be a number")
    return true
  }

  constructorConstrainsAreValid(quantity, priceBought, unity) {
    if (quantity < 0)
      throw new ValidationError("Quantity cannot be negative")
    if (priceBought < 0)
      throw new ValidationError("Price bought cannot be negative")
    // if ( (unity in Unity) )
      // throw new ValidationError("Unity is not a valid Unity value")
    if (this.unity in Product.discreteUnities && typeof(this.quantity) != "integer")
      throw new ValidationError("Discrete unities must come in integer amounts")
    return true
  }
}