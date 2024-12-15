const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Define the fixed start date
const START_DATE = new Date('2024-12-01T00:00:00Z'); // Beispiel: 1. Dezember 2024, UTC
const END_DATE = new Date(START_DATE.getTime() + 14 * 24 * 60 * 60 * 1000); // 14 Tage später

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// API to send start and end time
app.get('/timer-data', (req, res) => {
    res.json({ startDate: START_DATE, endDate: END_DATE });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
