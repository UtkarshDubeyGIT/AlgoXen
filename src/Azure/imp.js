// src/ContinuousSpeechToText.js
import React, { useState, useEffect } from 'react';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import image from '../Assets/Group 2.jpg'
const ContinuousSpeechToText = ({ onTranscription }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');

  const subscriptionKey = process.env.REACT_APP_SUBSCRIPTION_KEY; 
  const serviceRegion = process.env.REACT_APP_SERVICE_REGION; 
  let recognizer;

  useEffect(() => {
    
    return () => {
      stopContinuousRecognition();
    };
  }, []);

  const startContinuousRecognition = () => {
    setIsRecording(true);


    const speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
    speechConfig.speechRecognitionLanguage = 'en-US';

    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();

    recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);


    recognizer.recognizing = (sender, event) => {
      console.log(`Recognizing: ${event.result.text}`);
      setTranscription(event.result.text); 
    };

   
    recognizer.recognized = (sender, event) => {
      if (event.result.reason === sdk.ResultReason.RecognizedSpeech) {
        console.log(`Final result: ${event.result.text}`);
        setTranscription(event.result.text); 
        onTranscription(event.result.text); 
      } else if (event.result.reason === sdk.ResultReason.NoMatch) {
        console.log('No speech could be recognized.');
      }
    };

    
    recognizer.sessionStopped = (sender, event) => {
      console.log('Session stopped.');
      setIsRecording(false);
      recognizer.close();
      recognizer = null;
    };

    recognizer.startContinuousRecognitionAsync();
  };

  const stopContinuousRecognition = () => {
    setIsRecording(false);
    if (recognizer) {
      recognizer.stopContinuousRecognitionAsync(() => {
        console.log('Recognition stopped.');
        recognizer.close();
        recognizer = null;
      });
    }
  };

  return (
    <div className='flex justify-center items-center h-full flex-col'>
      <img onClick={isRecording ? stopContinuousRecognition : startContinuousRecognition} src={image} alt="mic" className='mix-blend-multiply hover:cursor-pointer hover:scale-110'/>
      <div>
      {
        isRecording ? (<div className='mt-6 font-bold text-5xl'>RECORDING</div>) : (<div className='mt-6 font-bold text-5xl'>CLICK HERE</div>)
      }
      </div>

      <div>
      {
        isRecording ? (<></>) : ( <p className='mt-4 font-semibold text-3xl'>To Start Audio Threat Monitor</p>)
      }
      </div>
    </div>
  );
};

export default ContinuousSpeechToText;

