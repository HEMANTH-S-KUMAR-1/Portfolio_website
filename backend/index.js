require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Protected calculation endpoint
app.post('/calculate', (req, res) => {
    try {
        const { input } = req.body;
        
        // Validate input
        if (typeof input !== 'number') {
            return res.status(400).json({ error: 'Input must be a number' });
        }

        // Protected calculation logic
        const result = input * 42 + 99;

        res.json({ result });
    } catch (error) {
        console.error('Calculation error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 