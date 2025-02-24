// bugSolution.js
import {useEffect, useState} from 'react';

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return null; // or handle error appropriately
  }
}

export default function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDataWithTimeout = async () => {
     //Add timeout to each fetch
      const results = await Promise.allSettled(Array.from({length: 10}).map(() => fetchData('https://api.example.com/data')));
      setData(results);
    };
    fetchDataWithTimeout();
  }, []);

  return (
    <div>
      {data ? (
        <ul>
          {data.map((result, index) => (
            <li key={index}>
              {result.status === 'fulfilled' ? JSON.stringify(result.value) : `Request ${index + 1} failed`}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
