const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const { MongoClient, ServerApiVersion } = require("mongodb");

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://robiulislam1806:hmdhdPgnb9XVYFg1@cluster0.o6fzx1r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const All_jobs = client.db("All_jobs");
    const jobs = All_jobs.collection("jobs");

    app.post("/jobs",  async(req, res) => {
        const job = req.body
        
          const result = await jobs.insertOne(job);
          console.log(result);
      });
    

    console.log("You successfully connected to MongoDB!");
  } finally {
    //await client.close();
  }
}
run().catch(console.log);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/jobsstored", async (req, res) => {
    try {
      await client.connect();
      const All_jobs = client.db("All_jobs");
      const jobs = All_jobs.collection("jobs");
  
      const jobList = await jobs.find().toArray();
      res.status(200).json(jobList);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving jobs");
    } finally {
      await client.close();
    }
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
