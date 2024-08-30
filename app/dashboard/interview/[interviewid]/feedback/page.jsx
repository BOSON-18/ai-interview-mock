"use client";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { db } from "utils/db";
import { UserAnswer } from "utils/schema";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsDownUp, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Feedback = ({ params }) => {
  const [feedbackList, setFeedbackList] = useState([]);
  const router=useRouter()
  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewid))
      .orderBy(UserAnswer.id);

    console.log(result);
    setFeedbackList(result);
  };

  useEffect(() => {
    GetFeedback();
  }, []);
  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl text-green-500">Congratulations</h2>
      <h2 className="font-bold text-2xl">Here is your interview Feedback</h2>
      <h2 className="text-slate-500 text-lg my-3">
        Your Overall Interview Rating: <strong>x/10</strong>
      </h2>

      <h2 className="text-sm text-gray-500">
        Find the complete information about your interview
      </h2>

      {feedbackList &&
        feedbackList.map((item, index) => (
          <Collapsible key={index} className="mt-7">
            <CollapsibleTrigger className="p-2 bg-purple-200 rounded-lg my-2 text-left flex items-center w-full">
              {item.question} <ChevronsUpDown className="h-5 w-5" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="flex gap-2 flex-col">
                {" "}
                <div className="border  border-red-200 p-4  rounded-lg  text-red-500" ><strong>  <h2>RATING:{item.rating}</h2>{" "}</strong></div>
                <div className="bg-red-200 border p-4 my-2 rounded-lg">  <strong>User Answer:</strong><h4>{item.userAns}</h4>{" "}</div>
                <div className="bg-blue-200 border p-4 my-2 rounded-lg"> <strong>AI Generated Answer:</strong> <h4>{item.correctAns.replace(/\*\*/g, '')}</h4>{" "}</div>
                <div className="bg-blue-200 border p-4 my-2 rounded-lg"> <strong>AI Feedbcak:</strong> <h4>{item.feedback.replace(/\*\*/g, '')}</h4>{" "}</div>
              
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
<div  className="flex justify-center mt-5">
        <Button onClick={()=>router.replace('/dashboard')} >Go Home</Button>
        </div>
    </div>
  );
};

export default Feedback;
