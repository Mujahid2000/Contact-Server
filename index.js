const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5050;


//middleware
app.use(cors());
app.use(express.json());

//Contact_Website
// G4pFA5ufXLRTktS8


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mujahid.frqpuda.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const ContactCollection = client.db("Contact_Website").collection('Contact');


    app.post('/addContact', async (req,res) =>{
        user = req.body
        const result = await ContactCollection.insertOne(user)
        res.send(result)
    })

    app.get('/addContact/:username', async(req, res) =>{
        const username = req.params.username;
        const filter = {username : username}
        const result = await ContactCollection.find(filter).toArray();
        res.send(result);
     })

     app.delete('/addContact/:id', async(req, res) =>{
        const id = req.params.id;
        const filter = {_id : new ObjectId (id)}
        const result = await ContactCollection.deleteOne(filter)
        res.send(result)
      })

      app.get('/addContact/:id/:username', async(req, res) =>{
        const username = req.params.username;
        const filter = {username : username , _id: new ObjectId(req.params.id)}
        const result = await ContactCollection.findOne(filter);
        res.send(result);
    })

    app.patch('/addContact/:id', async (req, res) => {
        try {
          const body = req.body;
          const result = await ContactCollection.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: {
              name: body.name,
              email: body.email,
              phone: body.phone,
              address: body.address,
              profilePicture: body.profilePicture,
            }}
          );
      
          res.send(result);
        } catch (error) {
          console.log(error);
          res.status(500).send('Internal Server Error');
        }
      });



    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req,res) =>{
    res.send('running server')
})

app.listen(port, () =>{
    console.log(`server is running on port ${port}`);
})