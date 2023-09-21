// TODO: Restrict API key
import firebase from "firebase/compat/app";
import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState, useContext } from "react";
import { GlobalVariables } from "../App";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";

// CHANGE HERE
const locationsRef = collection(db, "locations");

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyB0O1XNs5m_YOaBI-yniNxOTjL1NKGk0zg",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const [activeMarker, setActiveMarker] = useState(false);
  const [consentButton, setConsentButton] = useState(false);
  const { longitude, latitude } = useContext(GlobalVariables);

  const consent = async (ç) => {
    try {
      setActiveMarker((prev) => !prev);
      setConsentButton((prev) => !prev);
      await addDoc(locationsRef, {
        latitude: latitude,
        longitude: longitude,
        time: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const FirstMap = () => {
    return (
      <GoogleMap zoom={3} center={{ lat: 0, lng: 0 }}>
        <div className="h-screen">
          <Marker position={{ lat: latitude, lng: longitude }} />
        </div>
        <button
          className="fixed bottom-10 right-10 rounded-lg hover:bg-turq hover:text-flat bg-flat border-2 border-turq text-turq h-1/4"
          onClick={consent}
        >
          Show Location
        </button>
      </GoogleMap>
    );
  };

  const NewMap = () => {
    return (
      <GoogleMap zoom={10} center={{ lat: latitude, lng: longitude }}>
        <div className="h-screen">
          <div>
            <Marker position={{ lat: latitude, lng: longitude }} />
          </div>
        </div>
        <button
          className="fixed bottom-10 right-10 rounded-lg hover:bg-turq hover:text-flat bg-flat border-2 border-turq text-turq h-1/4"
          onClick={consent}
        >
          Remove Location
        </button>
      </GoogleMap>
    );
  };

  if (consentButton) {
    return <NewMap />;
  } else {
    return <FirstMap />;
  }
}
