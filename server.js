const express = require("express");
const path = require("path");
const db = require("./db");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "Pages")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "Pages", "index.html"));
});

// CREATE
app.post("/comments", (req, res) => {

    const { customer_name, customer_query, message } = req.body;

    db.query(
        "INSERT INTO comments (customer_name, customer_query, message) VALUES (?, ?, ?)",
        [customer_name, customer_query, message],
        (err, result) => {

            if (err) {
                console.log(err);
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
        "SELECT * FROM comments ORDER BY comment_id ASC",
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


app.get("/services", (req, res) => {

    db.query(
        "SELECT * FROM services",
        (err, result) => {

            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        }
    );

});

app.get("/staff", (req, res) => {

    db.query(
        "SELECT * FROM staff",
        (err, result) => {

            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        }
    );

});

app.get("/testimonials", (req, res) => {

    db.query(
        "SELECT * FROM testimonials",
        (err, result) => {

            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        }
    );

});

app.get("/company", (req, res) => {

    db.query(
        "SELECT * FROM company_details",
        (err, result) => {

            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        }
    );

});

app.get("/awards", (req, res) => {

    db.query(
        "SELECT * FROM awards",
        (err, result) => {

            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        }
    );

});

app.post("/consultations", (req, res) => {

    const {
    customer_name,
    contact,
    plant_problem,
    service_need
} = req.body;

    db.query(
        `INSERT INTO consultations
(customer_name, contact, plant_problem, service_need)
VALUES (?, ?, ?, ?)`,
        [
            customer_name,
            contact,
            plant_problem,
            service_need
        ],
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

app.use('/Images', express.static(path.join(__dirname, 'Pages', 'Images')));


app.listen(3000, () => {
    console.log("Server running on port 3000");
});