const express = require("express");
const router = express.Router();
const Item = require('./../models/items')


//  to add new item
router.post("/",async (req,res)=>{
 try {
     const data = req.body; // assuming that request body contains person data

    //create a new person document using the mongoose model
    const newItem = new Item(data); //directly pass dataa in this
    const response = await newItem.save()
    console.log('data saved')
    res.status(200).json(response);
 } catch (error) {
    console.log(error);
 }
    })

// to get item but only name,price,taste
    router.get('/-',async (req,res)=>{
try {
    const data = await Item.find().select('name price taste');
    // const data = await Person.find().select('name age');  // to display only some field
    //  const data = await Person.find({}, { name: 1, age: 1, _id: 0 });    // to display only some field
    console.log('data fetched')
    res.status(200).json(data);
} catch (error) {
    console.log(error);
}
})

//  to get all items
router.get('/',async (req,res)=>{
try {
    const data = await Item.find();
    // const data = await Person.find().select('name age');  // to display only some field
    //  const data = await Person.find({}, { name: 1, age: 1, _id: 0 });    // to display only some field
    console.log('data fetched')
    res.status(200).json(data);
} catch (error) {
    console.log(error);
}
})

//its behave like search button for menu
router.get('/:name', async (req, res) => {
  try {
    const name = req.params.name; // "tea" from /menu/tea

    const data = await Item.find({
      name: { $regex: name, $options: 'i' } // 'i' = case-insensitive
    });
    console.log(`Data fetched for ${name}`);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET items by ingredient name
router.get("/ingredients/:name", async (req, res) => {
    try {
        const ingredientName = req.params.name;

        // Find all items that have the given ingredient
        const items = await Item.find({ ingredients: { $in: [ingredientName] } });

        if (items.length === 0) {
            return res.status(404).json({ message: "No items found with this ingredient" });
        }

        res.status(200).json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// to get item according to taste
router.get("/taste/:name", async (req, res) => {
    try {
        const tasteName = req.params.name;

        // Find all items that have the given ingredient
        const items = await Item.find({ taste: { $in: tasteName } });

        if (items.length === 0) {
            return res.status(404).json({ message: "No items found with this ingredient" });
        }

        res.status(200).json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = router;
