"use client";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "utils/GeminiAiModel";
import { db } from "utils/db";
import { MockInterview } from "utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";


const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJSONResponse] = useState([]);
  const { user } = useUser();
  const router=useRouter()

  const submitHandler = async (e) => {
    e.preventDefault();
    console.table([jobDescription, jobPosition, yearsExperience]);
    setLoading(true);
    const InputPrompt = `Based on the variables jobDescription="${jobDescription}", jobPosition="${jobPosition}", and yearsExperience=${yearsExperience}, generate 10-20 interview questions and answers in JSON format. Focus on questions related to ${jobDescription}, ${jobPosition}, and problem-solving.. Focus on questions that are frequently asked in real-world interviews.And keep the order of questions in increasing difficulty.`;
    const result = await chatSession.sendMessage(InputPrompt);
    const MockJsonResponse = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    // console.log(result.response.text());
    // console.log(JSON.parse(result.response.text()));
    console.log(JSON.parse(MockJsonResponse));
    setJSONResponse(MockJsonResponse);

    if(MockJsonResponse){
    const response = await db
      .insert(MockInterview)
      .values({
        mockId: uuidv4(),
        jsonMockResponse: MockJsonResponse,
        jobPosition: jobPosition,
        jobDescription: jobDescription,
        jobExperience: yearsExperience,
        createdBy:user?.primaryEmailAddress?.emailAddress,
        createdAt:moment().format()
      }).returning({mockId:MockInterview.mockId});

      console.log("Inserted ID:",response)

      if(response){
        setOpenDialog(false);
        router.push('/dashboard/interview/'+response[0]?.mockId)
      }
    }else{
      console.log("error")
    }
    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all "
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Tell Us More About Your Interview!</DialogTitle>
            <DialogDescription>
              Add Details about your job position/role, JD(Job Description) and
              years of experience needed
              <form onSubmit={submitHandler}>
                <div className="text-start mt-7 my-7">
                  <label htmlFor="job-role">Job Role:-</label>
                  <Input
                    id="job-role"
                    required="true"
                    placeholder="Ex:- Frontend Developer"
                    onChange={(e) => setJobPosition(e.target.value)}
                  />
                </div>

                <div className="text-start mt-7 my-7">
                  <label htmlFor="job-description">
                    Job Description/Tech Stack:-
                  </label>
                  <Textarea
                    id="job-description"
                    required="true"
                    placeholder="Ex:- Copy-Paste the unrealistic requirements provided in the JD xd:)"
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>

                <div className="text-start mt-7 my-7">
                  <label htmlFor="job-experience">Years of Experience:-</label>
                  <Input
                    id="job-experience"
                    required="true"
                    type="number"
                    max="10"
                    min="0"
                    placeholder="Ex:- Yes write 5 Yrs of Experience for a entry level role ^_^"
                    onChange={(e) => setYearsExperience(e.target.value)}
                  />
                </div>
                <div className="flex gap-5 justify-end ">
                  <Button
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Loading" : "Start Interview"}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
