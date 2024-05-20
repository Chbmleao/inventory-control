import "./Exceptions.js"

// Unities enum:
const Unity = Object.freeze({
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
    id,
    description,
    quantity,
    unity,
    priceBought,
    supplierId,
  ){
    try {
      this.constructorTypesAreValid(id, description, quantity, priceBought, supplierId);
      this.constructorConstrainsAreValid(quantity, priceBought, supplierId, unity);
      
      this.id = id
      this.description = description
      this.quantity = quantity
      this.unity = unity
      this.priceBought = priceBought
      this.supplierId = supplierId
    
    } catch (error) {
      throw error
    }
  }

  increase(amount) {
      
    if (typeof(amount) != "number")
      throw ValidationError("Amount must be a number")
    if (this.unity in Product.discreteUnities && typeof(this.amount) != "integer")
      throw ValidationError("Discrete unities must be increased by integer amounts")
    
    if (amount < 0)
      throw ValidationError("Amount cannot be negative")

    this.quantity += amount
  }

  decrease(amount) {

    if (typeof(amount) != "number")
      throw ValidationError("Amount must be a number")
    if (this.unity in Product.discreteUnities && typeof(this.amount) != "integer")
      throw ValidationError("Discrete unities must be decreased by integer amounts")
    
    if (amount < 0)
      throw ValidationError("Amount cannot be negative")
    if (this.quantity - amount < 0)
      throw ValidationError("Quantity cannot be negative")

    this.quantity -= amount
  }
  
  validateSupplier(supplierId) { // TODO: Implement this method
    if (supplierId) return true
    return false
  }

  constructorTypesAreValid(id, description, quantity, priceBought, supplierId) {
    if (typeof(id) != "number")
      throw ValidationError("Id must be a number")
    if (typeof(description) != "string")
      throw ValidationError("Description must be a string")
    if (typeof(quantity) != "number")
      throw ValidationError("Quantity must be a number")
    if (typeof(priceBought) != "number")
      throw ValidationError("Price bought must be a number")
    if (typeof(supplierId) != "number")
      throw ValidationError("Supplier Id must be a number")
    return true
  }

  constructorConstrainsAreValid(quantity, priceBought, supplierId, unity) {
    if (quantity < 0)
      throw ValidationError("Quantity cannot be negative")
    if (priceBought < 0)
      throw ValidationError("Price bought cannot be negative")
    if (false == this.validateSupplier(supplierId))
      throw ValidationError("Supplier Id does not exist")
    if ( ! (unity in Unity) )
      throw ValidationError("Unity is not a valid Unity value")
    if (this.unity in Product.discreteUnities && typeof(this.quantity) != "integer")
      throw ValidationError("Discrete unities must come in integer amounts")
    return true
  }
}