require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const morgan = require("morgan");
const app = express();

app.use(cors());
app.use(express.json());

//Get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    try {
        const results = await db.query("select * from restaurants");

        res.status(200).json({
            status: "succes",
            results: results.rows.length,
            data: {
                restaurant: results.rows,
            },
        });
    } catch (error) {
        console.log(error);
    }
});

//Get a Restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
    console.log(req.params.id);

    try {
        const restaurant = await db.query(
            "select * from restaurants where id = $1",
            [req.params.id]
        );

        const reviews = await db.query(
            "select * from reviews where restaurant_id = $1",
            [req.params.id]
        );
            console.log("rows:", reviews.rows)
        res.status(200).json({
            status: "succes",
            data: {
                restaurant: restaurant.rows[0],
                reviews: reviews.rows
            },
        });
    } catch (error) {
        console.log(error);
    }
});

//Create a Restaurant

app.post("/api/v1/restaurants", async (req, res) => {
    

    try {
        const results = await db.query(
            "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *",
            [req.body.name, req.body.location, req.body.price_range]
        );
        res.status(201).json({
            status: "succes",
            data: {
                restaurant: results.rows[0],
            },
        });
    } catch (error) {
        console.log(error);
    }
});

//Update Restaurants

app.put("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query(
            "UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
            [
                req.body.name,
                req.body.location,
                req.body.price_range,
                req.params.id,
            ]
        );

        res.status(200).json({
            status: "succes",
            data: {
                restaurant: results.rows[0],
            },
        });
    } catch (error) {
        console.log(error);
    }

    
});

// Delete restaurant

app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query(
            "DELETE FROM restaurants WHERE id = $1",
            [req.params.id]
        );
        res.status(204).json({
            status: "succes",
        });
    } catch (error) {
        console.log(error);
    }
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`server is up on ${port}`);
});
