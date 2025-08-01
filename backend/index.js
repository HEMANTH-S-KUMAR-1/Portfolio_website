// --- Server Setup ---
// Loads environment variables from a .env file into process.env
require('dotenv').config();
// Imports the Express framework for building the web server.
const express = require('express');
// Imports the CORS middleware to allow cross-origin requests from your frontend.
const cors = require('cors');

// Creates an instance of the Express application.
const app = express();
// Sets the port for the server, using the environment variable or defaulting to 3000.
const port = process.env.PORT || 3000;

// --- Middleware ---
// Enables CORS for all routes, allowing your frontend to communicate with this server.
app.use(cors());
// Enables the server to parse incoming JSON payloads from requests.
app.use(express.json());

// --- API Endpoints ---

/**
 * A protected endpoint for performing a simple calculation.
 * This is for demonstration purposes.
 * @route POST /calculate
 */
app.post('/calculate', (req, res) => {
    try {
        const { input } = req.body;
        
        // Validates that the input from the request body is a number.
        if (typeof input !== 'number') {
            return res.status(400).json({ error: 'Input must be a number' });
        }

        // Performs a simple, protected calculation on the server side.
        const result = input * 42 + 99;

        // Sends the result back as a JSON response.
        res.json({ result });
    } catch (error) {
        // Catches any unexpected errors during the process.
        console.error('Calculation error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * A health check endpoint to verify that the server is running.
 * @route GET /health
 */
app.get('/health', (req, res) => {
    // Responds with a simple status message.
    res.json({ status: 'ok' });
});

// --- Start Server ---
// Starts the server and listens for incoming connections on the specified port.
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
