import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const Database = process.env.DATABASE;

// db config
mongoose.connect(Database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log( 'Database Connected' ))
  .catch(err => console.log( err ));

// Instantiate the app
const app = express();
// Define our app port.
const port = process.env.PORT || 5000;

// middlewares
app.use(cors())
app.use(express.json({extended: false}));

app.get('/', (req, res) => res.status(200).json({
  status: 200,
  message: 'Welcome To Vending Api',
}));

// listener
app.listen(port, () => console.log(`Server is listening on port ${port}`));