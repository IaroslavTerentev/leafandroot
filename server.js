const express = require("express");
const path = require("path");
const db = require("./db");

const app = express();

app.use(express.static(path.join(__dirname, "Pages")));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "Pages", "Home.html"));
});

// CREATE
app.post("/comments", (req, res) => {

    const { customer_name, email, message } = req.body;

    db.query(
        "INSERT INTO comments (customer_name, email, message) VALUES (?, ?, ?)",
        [customer_name, email, message],
        (err, result) => {

            if (err) {
                res.status(500).json(err);
            } else {
                res.json({
                    success: true,
                    id: result.insertId
                });
            }
        }
    );
});

// READ
app.get("/comments", (req, res) => {

    db.query(
        "SELECT * FROM comments",
        (err, results) => {

            if (err) {
                res.status(500).json(err);
            } else {
                res.json(results);
            }
        }
    );
});

// UPDATE
app.put("/comments/:id", (req, res) => {

    const id = req.params.id;
    const { customer_name, email, message } = req.body;

    db.query(
        "UPDATE comments SET customer_name=?, email=?, message=? WHERE comment_id=?",
        [customer_name, email, message, id],
        (err, result) => {

            if (err) {
                res.status(500).json(err);
            } else {
                res.json({
                    success: true
                });
            }
        }
    );
});

// DELETE
app.delete("/comments/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        "DELETE FROM comments WHERE comment_id=?",
        [id],
        (err, result) => {

            if (err) {
                res.status(500).json(err);
            } else {
                res.json({
                    success: true
                });
            }
        }
    );
});




app.listen(3000, () => {
    console.log("Server running on port 3000");
});