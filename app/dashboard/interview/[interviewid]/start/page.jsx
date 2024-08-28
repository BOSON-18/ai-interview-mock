 "use client"

import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import { db } from 'utils/db';
import { MockInterview } from 'utils/schema';
import QuestionsSection from './_components/QuestionsSection'
import RecordAnswer from './_components/RecordAnswer'

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
        console.log(result);
        
        const jsonMockResponse=JSON.parse(result[0].jsonMockResponse)
        setInterviewData(result[0]);
        setMockInterviewQuestion(jsonMockResponse);
        console.log(jsonMockResponse)
      };

  return (
    <div>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

        {/* Questions */}

        <QuestionsSection activeQuestionIndex={activeQuestionIndex} mockInterviewQuestion={mockInterviewQuestion} setActiveQuestionIndex={setActiveQuestionIndex}/>



        {/* Video/Audio Recording */}

        <RecordAnswer activeQuestionIndex={activeQuestionIndex}/>

    </div>
    </div>
  )
}

export default StartInterview
