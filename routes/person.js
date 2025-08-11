const express = require("express");
const router = express.Router();
const Person = require('./../models/person')

//  to add person 
router.post("/",async (req,res)=>{
 try {
     const data = req.body; // assuming that request body contains person data

    //create a new person document using the mongoose model
    const newPerson = new Person(data); //directly pass dataa in this
    const response = await newPerson.save()
    console.log('data saved')
    res.status(200).json(response);
 } catch (error) {
    console.log(error);
 }
    })


    //  to get all person
router.get('/',async (req,res)=>{
try {
    const data = await Person.find();
    // const data = await Person.find().select('name age');  // to display only some field
    //  const data = await Person.find({}, { name: 1, age: 1, _id: 0 });    // to display only some field
    console.log('data fetched')
    res.status(200).json(data);
} catch (error) {
    console.log(error);
}
})

//its behave like search button for person
router.get('/:work', async (req, res) => {
  try {
    const work = req.params.work; // "tea" from /menu/tea

    const data = await Person.find({
      work: { $regex: work, $options: 'i' } // 'i' = case-insensitive
    });
    console.log(`Data fetched for ${work}`);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// to update the person details
router.put('/:id',async(req,res)=>{
  try {
    const id = req.params.id;
    const updateddata = req.body;

    const response = await Person.findByIdAndUpdate(id,updateddata,{
      new : true,
      runValidators : true
      
      
    });
    if(!response){
        res.status(404).json({error:'person data not found'})
      }
    console.log('data updated');
    res.status(200).json(response)
    

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' }); 
  }
})

// route for delete user
router.delete('/:id',async(req,res)=>{
try {
   const id = req.params.id;
   const response = await Person.findByIdAndDelete(id)
   if(!response){
        res.status(404).json({error:'person data not found'})
      }
      console.log('data deleted');
    res.status(200).json({message : 'deleted'})
} catch (error) {
  console.log(error);
    res.status(500).json({ error: 'Internal Server Error' }); 
}
})

module.exports = router