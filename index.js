const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

//hridoyadhikari368
//IgMLE8dfmRKO3GQG



const uri = "mongodb+srv://hridoyadhikari368:IgMLE8dfmRKO3GQG@cluster0.fcmyfrv.mongodb.net/?retryWrites=true&w=majority";

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
    await client.connect();
    
    const userCollection = client.db("userDB").collection("users");
    
    app.post('/users', async(req,res)=>{
        const user = req.body;
        const result = await userCollection.insertOne(user);
        res.send(result);
    })

    app.get('/users', async(req,res)=>{
        const cursor = userCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    app.delete('/users/:id', async(req,res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await userCollection.deleteOne(query);
        res.send(result);
    })

    app.get('/users/:id', async(req,res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await userCollection.findOne(query);
        res.send(result);
    })

    app.put("/users/:id", async (req, res) => {
        const id = req.params.id;
        const data = req.body;
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const updatedUSer = {
          $set: {
            name: data.name,
            password: data.password,
          },
        };
        const result = await userCollection.updateOne(
          filter,
          updatedUSer,
          options
        );
        res.send(result);
      });



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get("/", (req, res) => {
  res.send("Crud is running ....");
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
