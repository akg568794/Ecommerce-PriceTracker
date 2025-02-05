"use client"
import { scrapeAndStoreProduct } from '@/lib/actions';
import React, { FormEvent, useState } from 'react'

const Searchbar = () => {
    const [searchPrompt,setSearchPrompt]=useState("");
    const [isLoading,setIsLoading]=useState(false);
    const isValidAmazonProductURL=(url:string)=>{
        try{
            const parsedURL=new URL(url);
            const hostName=parsedURL.hostname;
            if(hostName.includes('amazon.com') || hostName.includes('amazon.') || hostName.endsWith('amazon')){
                return true;
            }
        }catch(e){
            return false;
        }
        return false;
    }
    const handleSubmit =async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const isValidLink=isValidAmazonProductURL(searchPrompt);
        if(!isValidLink) return alert ("Please provide a valid Amazon link")

        try{
            setIsLoading(true);
            // scrape the first product
            const product=await scrapeAndStoreProduct(searchPrompt)
        }catch(e){
            console.log(e)
        }finally{
            setIsLoading(false);
        }
    }
  return (
    <form className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit}>
        <input type="text"
        value={searchPrompt}
        onChange={(e)=>setSearchPrompt(e.target.value)}
        placeholder='Enter product link'
        className='searchbar-input' />
        <button type='submit' disabled={searchPrompt===""} className='searchbar-btn'>{isLoading? "Searching...": "Search"}</button>
    </form>
  )
}

export default Searchbar