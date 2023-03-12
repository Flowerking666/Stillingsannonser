import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"stillingsannonser"

});

app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>{
    res.json("hello this is the backend");
});

app.get("/annonser", (req, res)=>{
    const q = "SELECT * FROM annonser"
    db.query(q, (err, data)=>{
        if (err) return res.json(err)
        return res.json(data)
    });
});

app.post("/annonser", (req, res)=>{
    const q = "INSERT INTO annonser (`arbeidsplass`, `fagbrev`) VALUES (?)"
    const values = [
        req.body.arbeidsplass,
        req.body.fagbrev,
    ];

    db.query(q, [values], (err,data)=>{
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.delete("/annonser/:id", (req, res)=>{
    const annonseId = req.params.id;
    const q = "DELETE FROM annonser WHERE id = ?";

    db.query(q, [annonseId], (err,data)=>{
        if (err) return res.json(err);
        return res.json("Annonse har blitt slettet");
    });
});

app.put("/annonser/:id", (req, res)=>{
    const annonseId = req.params.id;
    const q = "UPDATE annonser SET `arbeidsplass` = ?, `fagbrev` = ? WHERE id = ?";

    const values=[
        req.body.arbeidsplass,
        req.body.fagbrev,
    ];

    db.query(q, [...values, annonseId], (err,data)=>{
        if (err) return res.json(err);
        return res.json("Annonse har blitt oppdatert");
    });
});

app.listen(8800, ()=>{
    console.log("Connected to backend!");
});