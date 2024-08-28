"use client";
import { Button } from "@/components/ui/button";
import { Mic, StopCircle, WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";

const RecordAnswer = () => {
  const [userAnswer, setUserAnswer] = useState("");
  const[showAnswer,setShowAnswer]=useState(false)
 
 
  const { error, isRecording, results,interimResult , startSpeechToText, stopSpeechToText } =
    useSpeechToText({
      continuous: true,
      timeout: 100000,
      interimResults: true 
    });


  useEffect(() => {
    results.map((result) =>
      setUserAnswer((prevAns) => prevAns +result)
    // setUserAnswer(result)
    );

    // console.log(results)
  }, [results]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
     
    } else {
      startSpeechToText();
    }
  };
  if (error) return <h1>Use Chrome Browser ^_^</h1>;
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col justify-center  mt-15 items-center bg-slate-100 rounded-lg p-5">
        <WebcamIcon className="h-[300px] w-[400px] my-7  p-5 absolute" />
        <Webcam
          style={{ height: 300, width: "100%", zIndex: 10 }}
          mirrored={true}
        />
      </div>

     
      
      <Button
        // disabled={loading}
        variant="outline"
        className="my-10"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-600 items-center animate-pulse flex gap-2">
            <StopCircle /> Stop Recording...
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2 items-center">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>
      {/* <div>{interimResult}</div> */}

      <Button onClick={()=>setShowAnswer(!showAnswer)}>{showAnswer?"Hide Transcript":"Show Transcript"}</Button>

   { showAnswer &&   <div className="mt-5 border bg-slate-200 p-5 rounded-lg ">
        {userAnswer}
      </div>}
     

{/* <div className="mt-5 border bg-slate-200 p-5 rounded-lg ">
        {interimResult}
      </div> */}


    </div>
  );
};

export default RecordAnswer;
