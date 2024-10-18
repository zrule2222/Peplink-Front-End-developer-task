import React, { useState, useEffect } from 'react';

const JokesPage = () => {
  const [joke, setJoke] = useState('');
  const [lastFetched, setLastFetched] = useState('');

  // Fetches the joke from given API
  const fetchJoke = async () => {
    try {
      const response = await fetch('https://api.chucknorris.io/jokes/random?category=dev');
      const data = await response.json();
      setJoke(data.value);
      const date = new Date;
      const  formattedDate = date.getFullYear() + '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) + '-' + 
      ('0' + date.getDate()).slice(-2) + ' ' +
      ('0' + date.getHours()).slice(-2) + ':' +
      ('0' + date.getMinutes()).slice(-2) + ':' +
      ('0' + date.getSeconds()).slice(-2);
      setLastFetched(formattedDate);
    } catch (error) {
      console.error('Failed to fetch joke', error);
    }
  };

 // On render fetch the joke every 15 seconds
  useEffect(() => {
    fetchJoke();
    const interval = setInterval(fetchJoke, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Chuck Norris Joke</h2>
      <p className="text-lg">{joke}</p>
      <p className="text-sm mt-4">Last fetched: {lastFetched}</p>
    </div>
  );
};

export default JokesPage;
