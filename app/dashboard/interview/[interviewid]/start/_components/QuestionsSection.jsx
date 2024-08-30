"use client";
import { Lightbulb, Volume2 } from "lucide-react";
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const QuestionsSection = ({ mockInterviewQuestion, activeQuestionIndex,setActiveQuestionIndex }) => {
  //  console.log("Question section", mockInterviewQuestion);
  

  const textToSpeach = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);

      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry,Your Browser cannot speak :)");
    }
  };

  // console.log(activeQuestionIndex)
  return (
    mockInterviewQuestion && (
      <div className="p-5 border rounded-lg my-10">
        {/* <div className='grid grid-cols-2 md:grid-cols-3 lg:grids-cols-4 gap-5'>
            {
                mockInterviewQuestion && mockInterviewQuestion.questions.map((question,index)=>(
                    
                    <h2 key={index} className={`p-2 bg-slate-300 rounded-full text-xs md:text-sm text-center ${activeQuestionIndex == index && 'bg-purple-500 text-white'} `}>Question #{index+1}</h2>
                ))
            }
        </div> */}
 <div className="p-14  rounded-lg  overflow-hidden">
        <Carousel>
          <CarouselContent className="mx-2 gap-2">
            {mockInterviewQuestion &&
              mockInterviewQuestion?.questions?.map((question, index) => (
                <CarouselItem className={` w-1/2 bg-slate-300 rounded-full text-xs md:text-sm text-center ${
                    activeQuestionIndex == index && "bg-purple-500 text-white"
                  } `} key={index}>
                  {" "}
                
                    Question #{index + 1}
                  
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious activeQuestionIndex={activeQuestionIndex} setActiveQuestionIndex={setActiveQuestionIndex}/>
          <CarouselNext activeQuestionIndex={activeQuestionIndex}  setActiveQuestionIndex={setActiveQuestionIndex} />
        </Carousel>
        </div>

        <h2 className="my-5 text-md md:text-lg ">
          { mockInterviewQuestion?.questions[activeQuestionIndex]?.question}
        </h2>
        <Volume2
          className="cursor-pointer"
          onClick={() => {
            textToSpeach(
              mockInterviewQuestion?.questions[activeQuestionIndex]?.question
            );
          }}
        />

        <div className="border rounded-lg p-5 bg-blue-100 text-blue-500 mt-20">
          <h2 className="flex gap-2 items-center">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-sm text-blue-500 my-2">
            Click On record Answer when you want to answer the question . At the
            end of interview we will give you the feedback along with the
            correct answer for each of question and your answer to compare it .
            The ans are AI generated and hence you can compare the difference of
            some key concept that you may have missed while answering.
          </h2>
        </div>
      </div>
    )
  );
};

export default QuestionsSection;
