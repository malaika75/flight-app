"use client"
import { useEffect, useState } from 'react';
import React from 'react'
import Image from 'next/image'

export default function Results() {
  const [flights, setFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlights = async () => {
      const origin = new URLSearchParams(window.location.search).get('origin');
      const destination = new URLSearchParams(window.location.search).get('destination');
      const date = new URLSearchParams(window.location.search).get('date');
      const passengers = new URLSearchParams(window.location.search).get('passengers');
      const roundtrip = new URLSearchParams(window.location.search).get('roundtrip');
      const classType = new URLSearchParams(window.location.search).get('classType');

      try {
        const response = await fetch(`https://${process.env.NEXT_PUBLIC_RAPIDAPI_URL}/flights/search?origin=${origin}&destination=${destination}&date=${date}&passengers=${passengers}&roundtrip=${roundtrip}&classType=${classType}`, {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
            'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPIDAPI_HOST!,
          },
        });

        console.log('Response Object:', response);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setFlights(data.flights); // Adjust based on the response structure
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  if (loading) {
    return <div className='text-center md:text-7xl text-4xl text-blue-600'>Loa<span className='animate-bounce text-black'>ding...</span></div>;
  }

  if (error) {
    return <div className='flex justify-center text-center md:text-7xl text-4xl text-red-600'>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Flight Results</h1>
      {flights.length === 0 ? (
        <p>No flights found.</p>
      ) : (
        <ul>
          {flights.map((flight, index) => (
            <>
            <li key={index}>
              <h2>{flight.name}</h2>
              <p>{flight.details}</p>
            </li>
            <li>{flight.price}</li>
            <li>{flight.duration}</li>
            <li>{flight.time}</li>
            </>
          ))}
        </ul>
      )}
    </div>
  );
}


  
// }return (
//     <div>
//         <Image src="https://media.istockphoto.com/id/481440770/vector/business-people-travel.jpg?s=612x612&w=0&k=20&c=_vATVqc8bW83nWMAngvq-GvmwNe0tpKzfi0yMe-iSbA=" alt='plane image' width={100} height={100} className=''></Image>
//     </div>
//   )

