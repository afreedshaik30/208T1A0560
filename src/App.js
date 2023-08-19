import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [combinedNumbers, setCombinedNumbers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCombinedNumbers = async () => {
      try {
        const response = await fetch('http://localhost:8008/numbers?url=http://20.244.56.144/numbers');
        const data = await response.json();
        setCombinedNumbers(data.numbers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchCombinedNumbers();
  }, []);

  return (
    <div className="App">
      <h1>Combined Numbers</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {combinedNumbers.map((number, index) => (
            <li key={index}>{number}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
