import { MongoClient, ServerApiVersion } from 'mongodb'
import { ValidationError } from './Exceptions.js';
import { Product } from './Product.js';

const uri = "mongodb+srv://gabriel:VOPZEsNVXJXzIFM9@inventory.7slwdpp.mongodb.net/?retryWrites=true&w=majority&appName=inventory"

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function insertProduct(product) {
  
  if (! product instanceof Product)
    throw new ValidationError("The object must be an instance of Product")

  product = product.toInsertDocument()
  let response;

  try {
    await client.connect()

    console.log(product)

    response = await client.db("inventory")
      .collection("products")
      .insertOne(product)

  } catch(err) {
    console.error(err)
  }  finally {
    await client.close()
  }

  return response
}

export async function getProductByid(id) {
  let response;
  
  try {
    await client.connect()
    
    response = await client.db("inventory")
      .collections("products")
      .findOne({ id: id })
  
  } catch(err) {
    console.error(err)
  } finally {
    await client.close()
  }

  return response;
}

export async function getProductByDescription(description) {
  let response;
  
  try {
    await client.connect()
    
    const collection = await client.db("inventory").collections("products")
    response = collection.findOne({ description: description })
  
  } catch(err) {
    console.error(err)
  } finally {
    await client.close()
  }

  return response;
}