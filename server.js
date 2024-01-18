const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");

const dbUri =
  "mongodb+srv://lobatoabrahan:SUNkGh60OXGRGwwR@cluster0.le0ojg0.mongodb.net/prueba?retryWrites=true&w=majority";

mongoose
  .connect(dbUri)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use(cors());

// ...

// Leer datos de una colección
app.get('/api/:collection', async (req, res) => {
    const collectionName = req.params.collection;
    const data = await mongoose.connection.db.collection(collectionName).find().toArray();
    res.json(data);
});

app.get('/api/:collection/:id', async (req, res) => {
    const collectionName = req.params.collection;
    const id = req.params.id;
    const data = await mongoose.connection.db.collection(collectionName).findOne({_id: new mongoose.Types.ObjectId(id)});
    res.json(data);
});

// Ingresar datos a una colección
app.post('/api/:collection', express.json(), async (req, res) => {
    const collectionName = req.params.collection;
    const newData = req.body;
    const result = await mongoose.connection.db.collection(collectionName).insertOne(newData);
    res.json(result);
});

// Actualizar datos en una colección
app.put('/api/:collection/:id', express.json(), async (req, res) => {
    const collectionName = req.params.collection;
    const id = req.params.id;
    const newData = req.body;
    const result = await mongoose.connection.db.collection(collectionName).updateOne({ _id: new mongoose.Types.ObjectId(id) }, { $set: newData });
    res.json(result);
});

// Eliminar datos de una colección
app.delete('/api/:collection/:id', async (req, res) => {
    const collectionName = req.params.collection;
    const id = req.params.id;
    const result = await mongoose.connection.db.collection(collectionName).deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    res.json(result);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
