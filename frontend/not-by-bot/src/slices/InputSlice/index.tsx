'use client'

import Bounded from "@/app/components/Bounded";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from 'axios'

export type InputSliceProps = SliceComponentProps<Content.InputSlice>;


const InputSlice = ({ slice }: InputSliceProps): JSX.Element => {
  const [perplexityScore,setPerplexityScore]=useState('');
  const [burstinessScore,setBurstinessScore]=useState('');

  const fetchApi=async()=>{
    
    const baseUrl="http://127.0.0.1:8000/get-perplexity/lmaoihatenextjssometimes"

    const response = await axios.get(baseUrl);

    if(response){
      console.log(response.data)
    }

  }

  const handleSubmitButton=()=>{
    fetchApi()
  }

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText
        field={slice.primary.heading}
        components={{
          heading1: ({ children }) => (
            <h2 className="md:text-1xl text-balance text-center text-5xl font-medium">
              {children}
            </h2>
          ),
        }}
      />
      <div className="prose prose-invert mt-4 bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text text-2xl not-italic text-transparent">
        <PrismicRichText field={slice.primary.body} />
      </div>

      <div className="mt-20 flex w-full px-10">
        <Input type="text" placeholder="Your Content" />
        <div className="ml-4">
          <Button variant="outline" onClick={handleSubmitButton}>Submit</Button>
        </div>
      </div>

      {/* <div className="mt-10 flex">
        <h5>Your Results: AI Generated Content</h5>
        
      </div> */}
    </Bounded>
  );
};

export default InputSlice;
