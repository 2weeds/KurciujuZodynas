import express from 'express';
import cors from 'cors';
const app = express();

app.listen(8000, () => console.log("Listening to app at 8000"));
app.use(cors());
app.use(express.static('src'));
app.use(express.json());

app.get('/', (req, resp) => {
    resp.send("Hello world");
})