const express = require('express');
const cors = require('cors');
const pg = require('pg');
const { Pool } = pg; 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 
const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));


const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "fullstack",
    password: "Surya4040@",
    port: 5432
});



pool.connect((err) => {
    if (err) {
        console.log("Error connecting to database:", err.message);
    } else {
        console.log("Connected to database");
    }
});

app.post("/register", async (request, response) => {
    const userDetails = request.body;
    const { username, email, password } = userDetails;
    const hashedPassword = await bcrypt.hash(password, 10);

    const checkUserExists = `
        SELECT * FROM users WHERE username = $1
    `;
    const dbUser = (await pool.query(checkUserExists, [username])).rows[0]; 

    if (!dbUser) {
        const insertUser = `
            INSERT INTO users (username, email, password) 
            VALUES ($1, $2, $3)
        `;
        await pool.query(insertUser, [username, email, hashedPassword]);
        response.status(200).json({ message: "User registered successfully!" });
    } else {
        response.status(400).json({ error: "User already exists" });
    }
});

app.post("/login", async (request, response) => {
    try {
        const { email, password } = request.body;

        const checkUserExists = `SELECT * FROM users WHERE email = $1`;
        const dbUser = (await pool.query(checkUserExists, [email])).rows[0];

        if (!dbUser) {
            return response.status(400).json({ error: "Invalid User. Please register first!" });
        }

        const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
        if (!isPasswordMatched) {
            return response.status(400).json({ error: "Invalid Password. Please try again!" });
        }

        const payload = { email };
        const jwtToken = jwt.sign(payload, "MYTOKEN");

        return response.status(200).json({ message: "Login Successful!", jwtToken });

    } catch (error) {
        console.error("Login Error:", error);
        return response.status(500).json({ error: "Internal Server Error. Please try again later!" });
    }
});

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server Running at http://localhost:${PORT}`); 
});
