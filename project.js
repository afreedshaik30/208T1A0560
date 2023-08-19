javascript
const express = require('express');
const axios = require('axios');

const app = express();
const port = 8008;

app.get('/numbers', async (req, res) => {
  try {
    const urls = req.query.url || [];
    const combinedNumbers = [];

    const fetchData = async (url) => {
      try {
        const response = await axios.get(url);
        const data = response.data.numbers || [];
        combinedNumbers.push(...data);
      } catch (error) {
        console.error(`Error fetching data from ${url}: ${error.message}`);
      }
    };

    const fetchPromises = urls.map(fetchData);
    await Promise.allSettled(fetchPromises);

    const uniqueSortedNumbers = [...new Set(combinedNumbers)].sort((a, b) => a - b);

    res.json({ numbers: uniqueSortedNumbers });
  } catch (error) {
    console.error('Error processing request:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});