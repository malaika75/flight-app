"use client"
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home(){

const [origin, setOrigin] = useState("");
const [destination, setDestination] = useState("");
const [date, setDate] = useState("");
const [passengers, setPassengers] = useState(1);
const [roundtrip , setRoundtrip] = useState("round trip");
const [classType, setClassType] = useState("Economy");

const router = useRouter(); // Initialize router instance

  const handleNavigation = (e: React.FormEvent ) => {
    e.preventDefault(); // Prevent page reload
  
    if (!origin || !destination || !date) {
      alert("Please fill all fields!"); // Validate inputs
      return;
    }
  
    // Navigate with query params
    router.push(
      `/results?origin=${origin}&destination=${destination}&date=${date}&passengers=${passengers}&roundtrip=${roundtrip}&classType=${classType}`
    );
  };


return (
    <>
    <div className="flex flex-col items-center">
      <Image src="https://media.istockphoto.com/id/1053519084/vector/concept-illustration-template-of-book-your-flight-modern-flat-design-concept-for-web-page.jpg?s=612x612&w=0&k=20&c=mbEe1rYN7Xs-BayZEzg60U_gBw0ZaTyayqrnmbOERoM=" alt="allustrator image" width={100} height={100} className="w-9/12 h-[400px] object-fit rounded-full" unoptimized quality={100} placeholder="empty"></Image>
      <h1 className="text-center text-5xl font-bold py-4">Flight Search</h1>
    </div>
    
    <div className="flex sm:flex-col items-center justify-center h-50 border2 sm:mx-20 bordergray-500 py-4 mb-20 shadow-2xl shadow-black rounded">

      <form className="space-x-4 ml-4" onSubmit={handleNavigation}>
        <div className="flex mb-6 sm:text-2xl text-gray-600">
          <i className="fa-solid fa-arrow-right-arrow-left sm:text-xl mt-2"></i>
        <select className="hover:underline" value={roundtrip}
  onChange={(e) => setRoundtrip(e.target.value)}>
          <option>round-trip</option>
           <option>one-way</option>
           <option>multi-city</option>
        </select>


      <select className="ml-12 w-2/12 hover:underline" value={classType}
  onChange={(e) => setClassType(e.target.value)}>
           <option>Economy</option>
           <option className="w-11/12">Premium Economy</option>
           <option>Business</option>
           <option>first</option>
        </select>

</div>
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

<div className="mt-4">
<input type="text" placeholder="Origin" value={origin} onChange={(e) => setOrigin(e.target.value)} className="border-2 border-gray-600 p-4 w-11/12">
</input>
</div>


        <div className="border-2 border-gray-600 mt-4">
        <i className="fa-solid fa-location-dot text-gray-500 sm:text-xl sm:ml-4"></i>
        <input type="text" placeholder="Destination?" value={destination} onChange={(e) => setDestination(e.target.value)} className="p-4 outline-none w-9/12 mr-2">
        </input>

</div>
        <input type="date" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} className="border-2 border-gray-600 sm:p-4 mt-4">
        </input>

        <input type="number" placeholder="Passengers" value={passengers} onChange={(e) => {setPassengers(parseInt(e.target.value , 10))}} className="border-2 border-gray-600 p-4 mt-4">
        </input>
</div>
<div className="flex justify-end mt-4">
        <button className="hover:bg-blue-600 bg-blue-400 px-6 py-4 text-xl mx-4 rounded border-2 border-black" type="submit">search Flights</button>
</div>
    </form>
    </div> 
    
    </>
  )}
