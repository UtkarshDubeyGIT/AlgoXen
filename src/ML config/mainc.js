// src/MLIntegration.js
import React, { useState } from 'react';
import ContinuousSpeechToText from '../Azure/imp'; 
import axiosInstance from '../axiosInstance';

const MLIntegration = () => {
  const [showAlert, setShowAlert] = useState(false); 
  const [anomalousText, setAnomalousText] = useState(''); 
  const [location, setLocation] = useState(null); 

  const handleTranscription = async (transcription) => {
    console.log('Received Transcription:', transcription);

    try {
      const response = await axiosInstance.post(
        '/predict',
        { dialogue: transcription },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    
      const data = response.data;
      console.log('ML Model Response:', data);
    
      if (data.predicted_label === 'anomalous') {
        setAnomalousText(transcription);
        setShowAlert(true);
    
        getLocation();
      }
    } catch (error) {
      console.error('Error sending data to ML model:', error);
    }
  };

  
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to retrieve location. Please check location permissions.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };


  const handleCallPolice = () => {
   
    alert('Calling police...');
    window.open('tel:100');
    setShowAlert(false);

  };

  return (
    <div className="w-full">
      <ContinuousSpeechToText onTranscription={handleTranscription} />

      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded shadow-lg text-center">
            <p className="mb-4 text-red-600 font-semibold">Anomalous activity detected!</p>
            <p className="mb-4 text-gray-800">Text: "{anomalousText}"</p>
            {location && (
              <p className="mb-4 text-gray-800">
                Location: Latitude {location.latitude.toFixed(4)}, Longitude {location.longitude.toFixed(4)}
              </p>
            )}
            <button
              onClick={handleCallPolice}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none"
            >
              Call Police
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MLIntegration;
