import express from 'express';
import cors from 'cors';
const app = express();

app.listen(8000, () => console.log("Listening to app at 3000"));
app.use(express.static('src'));
app.use(express.json());
app.use(cors());

app.get('/', (req, resp) => {
    resp.send("Hello world");
})