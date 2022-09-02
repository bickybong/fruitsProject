const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/fruitsDB");

const fruitSchema = new mongoose.Schema({
  //create schema
  name: {
    //requirements
    type: String,
    required: [true, "Fruit needs a name"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema); //new collection

const mango = new Fruit({
  //add new fruit
  name: "mango",
  rating: 10,
  review: "yellows",
});
// mango.save();
//save fruit

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favFruit: fruitSchema
  //create relationship with fruit
});

const Person = mongoose.model("Person", personSchema);

// const person = new Person({
//   name: "Amy",
//   age: 22,
//   favFruit: pineapple
// });
// person.save();

// const kiwi = new Fruit({
//   name: "kiwi",
//   rating: 3,
//   review: "too sour",
// });

// const orange = new Fruit({
//   name: "orange",
//   rating: 8,
//   review: "good sheesh",
// });

// const banana = new Fruit({
//   name: "banana",
//   rating: 9,
//   review: "average jojo fan",
// });

//insert multiple entries
// Fruit.insertMany([kiwi, orange, banana], function (err) {
//   if (err) {
//     //error message
//     console.log(err);
//   } else {
//     console.log("Successfully saved all fruits!");
//   }
// });

Person.updateOne(
  //updates an entry
  { name: "John" },
  { favFruit: mango },
  function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully updated the document");
    }
  }
);

// Person.deleteMany({ name: "John" }, function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted the fruit");
//   }
// });

Fruit.find(function (err, fruits) {
  //finds the fruits
  if (err) {
    //if there is error
    console.log(err);
  } else {
    //no error
    //closes the connection
    fruits.forEach(function (fruit) {
      console.log(fruit.name);
    });
    //   mongoose.connection.close();
  }
});
