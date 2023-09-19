const express = require("express");
const connection = require("./connection");
const postModel = require("./postModel.js");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
try {
    const posts = await postModel.find();
    res.json(posts);
    let sumaNumeros = 0;
    
    posts.forEach(post => {
    if (postModel.find("numero")) {
        sumaNumeros += post.numero;
    }
});

    console.log("La suma de los campos 'numero' es:", sumaNumeros); // Mover el console.log aquí
    
} catch (e) {
    console.log(e);
    res.status(500).json({ error: "Hubo un error en el servidor." });
}
});


app.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
    const post = await postModel.findById(id);



    res.json(post);
} catch (e) {
    res.status(500).send(e);
}
});

app.delete("/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const post = await postModel.findByIdAndDelete(id);
        res.json("deleted");
    } catch (e) {
    console.log(e);
    res.status(500).send(e);
    }
});

app.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, numero,content } = req.body;
    try {
        const post = await postModel.findByIdAndUpdate(id, { title, numero, content });
        res.json(post);
    } catch (e) {
    res.status(500).send(e);
    }
});

app.post("/", async (req, res) => {
    const { title, numero, content } = req.body;
    try {
        const newPost = await postModel.create({
        title,
        numero,
        content,
});
    res.json(newPost);
} catch (e) {
    console.log(e);
    res.status(500).send(e);
}
});

app.listen(3000, () => {
    console.log("Listening at port 3000");
});