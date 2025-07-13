import express from 'express'
import cors from 'cors' 
import 'dotenv/config'

// App Config
const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(express.json());
app.use(cors());``

// Api endpoints
app.get("/", (req,res) => {
    res.send("API Working");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});