import {ValidationError} from "./Exceptions.js"
import {Product, Unity} from "./Product.js"
import {insertProduct} from "./api.js"

let productA = new Product("Blusa", 10, Unity.UN, 200, "Palmeiras")
let productB = new Product("Leite", 50, Unity.L, 85.59, "Parmalat")
let productC = new Product("Ouro", 4.521, Unity.KG, 30500, "Banco do Brasil")
let productD = new Product("Café", 1, Unity.KG, 15.99, "Pilão")
let productE = new Product("Arroz", 5, Unity.KG, 10.99, "Tio João")
let productF = new Product("Feijão", 2, Unity.KG, 5.99, "Camil")
let productG = new Product("Açúcar", 1, Unity.KG, 3.99, "União")
let productH = new Product("Óleo", 1, Unity.L, 4.99, "Liza")
let productI = new Product("Sal", 1, Unity.KG, 1.99, "Cisne")
let productJ = new Product("Macarrão", 1, Unity.KG, 2.99, "Renata")
let productK = new Product("Farinha", 1, Unity.KG, 2.99, "Dona Benta")
let productL = new Product("Cerveja", 1, Unity.L, 4.99, "Skol")
let productM = new Product("Refrigerante", 2, Unity.L, 6.99, "Coca-Cola")

await insertProduct(productA)
await insertProduct(productB)
await insertProduct(productC)
await insertProduct(productD)
await insertProduct(productE)
await insertProduct(productF)
await insertProduct(productG)
await insertProduct(productH)
await insertProduct(productI)
await insertProduct(productJ)
await insertProduct(productK)
await insertProduct(productL)
await insertProduct(productM)

console.log("Products inserted successfully")
