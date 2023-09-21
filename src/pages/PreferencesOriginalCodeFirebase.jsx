import React from "react";
import { db } from "../config/firebase-config";
import { getDocs, getDoc, collection, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Preferences = () => {
  const [userPref, setUserPref] = useState([]);
  const userPreferencesRef = collection(db, "userPreferences");

  // New user Variables
  const [gender, setGender] = useState();
  const [race, setRace] = useState();
  const [age, setAge] = useState();
  const [sports, setSports] = useState(false);
  const [movies, setMovies] = useState(false);
  const [foods, setFoods] = useState(false);

  useEffect(() => {
    const GetUserPref = async () => {
      // READ THE DATA
      // SET THE MOVIE LIST
      try {
        const data = await getDocs(userPreferencesRef);
        // data is the variable of the data
        // the .docs function gets into the documents of the data
        // the .map() then loops through the documents
        // then you use the .data() in order to access the data in the document
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUserPref(filteredData);
      } catch (err) {
        console.log(err);
      }
    };

    // makes it so that the async function runs 24/7 (could be useful for location tracking)
    GetUserPref();
  }, []);

  // THIS IS HOW TO ADD NEW DOCUMENTS TO A USER on submit
  const OnSubmitUser = async () => {
    try {
      await addDoc(userPreferencesRef, {
        gender: gender,
        race: race,
        age: age,
        spors: sports,
        movies: movies,
        foods: foods,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex h-full border-4 border-black flex flex-col justify-center items-center gap-2">
        {/* <input
          type="text"
          placeholder="Gender"
          onChange={(e) => setGender(e.target.value)}
        /> */}
        <h1 className="text-2xl">Select Your Interests</h1>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Male</option>
          <option value="">Female</option>
          <option value="">Other</option>
        </select>
        {/* <input
          type="text"
          placeholder="Race"
          onChange={(e) => setRace(e.target.value)}
        /> */}
        <select value={race} onChange={(e) => setRace(e.target.value)}>
          <option value="">Asian</option>
          <option value="">White</option>
          <option value="">Black</option>
          <option value="">Mexican</option>
        </select>
        {/* <input type="checkbox" onChange={(e) => setAge(e.target.checked)} /> */}
        <select value={age} onChange={(e) => setAge(e.target.value)}>
          <option value="">0-20</option>
          <option value="">21-50</option>
          <option value="">50-100</option>
        </select>
        <div>
          <label htmlFor="">Sports Fan?</label>
          <input
            type="checkbox"
            onChange={(e) => setSports(e.target.checked)}
          />
        </div>
        <div>
          <label htmlFor="">Movies Fan?</label>
          <input
            type="checkbox"
            onChange={(e) => setMovies(e.target.checked)}
          />
        </div>
        <div>
          <label htmlFor="">Food Fan?</label>
          <input type="checkbox" onChange={(e) => setFoods(e.target.checked)} />
        </div>
        <Link
          onClick={OnSubmitUser}
          to="/map"
          className="bg-turq rounded-lg text-offwhite hover:bg-offwhite hover:border-2 hover:border-turq hover:text-turq p-4"
        >
          Submit User Information
        </Link>
      </div>
      {/* <div>
        {userPref.map((user) => (
          <div>
            <p>User Gender: {userPref.gender}</p>
            <p>User Race: {userPref.race}</p>
            <p>User Age: {userPref.age}</p>
            <p>User Sports: {userPref.sports}</p>
            <p>User Movies: {userPref.movies}</p>
            <p>User Foods: {userPref.foods}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Preferences;
