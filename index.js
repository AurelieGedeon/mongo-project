const mongodb = require("mongodb");

const client = new mongodb.MongoClient("mongodb://localhost:27017");

const connectClient = async () => {
  await client.connect();
  console.log("Client Connected");
};

const getUserCollection = () => {
  const db = client.db("aurelies-db");
  const uCol = db.collection("users");

  return uCol;
};

const getProductCollection = () => {
  const db = client.db("aurelies-db");
  const pCol = db.collection("product");

  return pCol;
};

const insertUser = async () => {
  const uCol = getUserCollection();
  await uCol.insertOne({
    first: "Aurelie",
    last: "Gedeon",
    job: "unemployed lol",
  });
  console.log("User Inserted");
};

const insertProduct = async () => {
  const pCol = getProductCollection();
  await pCol.insertOne({
    item: "backpack",
    brand: "Adida",
    color: "grey",
    price: 49.99,
  });
  console.log("Product Inserted");
};

const getUsers = async () => {
  const uCol = getUserCollection();
  const users = await uCol.find({}).toArray();

  return users;
};
const getProduct = async () => {
  const pCol = getProductCollection();
  const product = await pCol.find({}).toArray();

  return product;
};

connectClient()
  .then(() => insertUser())
  .then(() => getUsers())
  .then((users) => console.log(users))
  .then(() => insertProduct())
  .then(() => getProduct())
  .then((product) => console.log(product))

  .then(() => client.close());
