import React, { useEffect } from 'react'
import { useBio } from "../BioContext";
import "./DashCategory.css"
import { useState } from 'react'
export default function DashCategory() {
    let {productdata}=useBio()
    let [category,setcategory]=useState([])


  useEffect(()=>{ if(productdata){
    console.log("pppppdddd",productdata)
     let tc=productdata.map((e)=>(e.category))
     setcategory(tc)
}},[productdata])
   
  return (
    <>
     <div>Number Of Category Is:{category.length}</div>
    <div className="categoryofdash">
    
     
     {
        category.map((e)=>{
            return ( <div className='cateofdash'>{e}</div>)
        })
     }
     
     </div>
    </>
  )
}
