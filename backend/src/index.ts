import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send(' Intern Tracker API is running!');
});


console.log('Connecting to MongoDB Atlas...');

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('MongoDB Atlas Connected Successfully!');
    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(' DB Connection Error:', err.message);
  });