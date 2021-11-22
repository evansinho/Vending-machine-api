import express from 'express';
import cors from 'cors'

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