const express = require("express");

const app = express();

const db = [
        {
                id: 3,
                name: "name3"
        },
        {
                id: 4,
                name: "name4"
        },
];

app.get("/users", (req, res) => {
        console.log("express: users");
        res.json(db);
});

app.get("/user/:id", (req, res) => {
        console.log(`express: user`, req.params.id);
        const result = db.find(({ id: userId }) => req.params.id === userId);
        res.json(result ? [result] : []);
});

app.listen(3001);

