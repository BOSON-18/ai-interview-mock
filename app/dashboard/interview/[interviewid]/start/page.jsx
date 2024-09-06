 "use client"

import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react"
import { db } from "utils/db";
import { MockInterview } from "utils/schema";
import QuestionsSection from "./_components/QuestionsSection"
import RecordAnswer from "./_components/RecordAnswer"
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StartInterview = ({params}) => {

    const [interviewData,setInterviewData]=useState();
    const [mockInterviewQuestion,setMockInterviewQuestion]=useState();
    const [activeQuestionIndex,setActiveQuestionIndex]=useState(0);

    useEffect(()=>{
        getInterviewDetails()
    },[])
    

    const getInterviewDetails = async () => {
        const result = await db
          .select()
          .from(MockInterview)
          .where(eq(MockInterview.mockId, params.interviewid));
        // console.log(result);
        
        const jsonMockResponse=JSON.parse(result[0].jsonMockResponse)
        setInterviewData(result[0]);
        setMockInterviewQuestion(jsonMockResponse);
        // console.log(mockInterviewQuestion)
        // console.log(jsonMockResponse)
      };

      const handleNextQuestion = () => {
        setActiveQuestionIndex(activeQuestionIndex + 1);
      };
    
      const handlePreviousQuestion = () => {
        setActiveQuestionIndex(activeQuestionIndex - 1);
      };
    

  return (
    <div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Questions */}

        <QuestionsSection handleNextQuestion={handleNextQuestion} handlePreviousQuestion={handlePreviousQuestion} activeQuestionIndex={activeQuestionIndex} mockInterviewQuestion={mockInterviewQuestion} setActiveQuestionIndex={setActiveQuestionIndex}/>



        {/* Video/Audio Recording */}

        <RecordAnswer activeQuestionIndex={activeQuestionIndex} mockInterviewQuestion={mockInterviewQuestion} interviewData={interviewData} />

    </div>

    <div>
      <Link href={"/dashboard/interview/"+interviewData?.mockId+"/feedback"}>
      <Button>End Interview</Button>
      </Link>
    </div>
    </div>
  )
}

export default StartInterview
