'use client'
import { useState } from "react";
import {Items2} from '../components/data';
import clsx from 'clsx'

export default function FainalTable(){
    const [dayItems,setDayItems]=useState([]);
    const [fainalExam,setFainalExam]=useState([]);
    const [dayIndex,setDayIndex]=useState(0);
    const [openDay,setOpenDay]=useState(false);


    return(

        <div className="p-4 text-sm font-bold">
             <div className="border-2 border-black">
                {fainalExam.map((day,dayNumber)=><div key={dayNumber}
                className={clsx(`grid grid-cols-5 border-b-2 border-black`,dayNumber%2===0&&'bg-slate-300',dayNumber%2!==0&&'bg-rose-300')} > <div className="flex flex-col gap-1  border-r-2 border-black justify-center items-center">Day {dayNumber+1}</div>
                        <div className="flex flex-col gap-1 border-r-2 border-black  justify-center items-center">{day.map((item,index)=>(item.slice(1,2)==='1'&&<div key={index}>
                            {item}
                        </div>))}

                        </div>
                        <div className="flex flex-col gap-1 border-r-2 border-black justify-center items-center">{day.map((item,index)=>(item.slice(1,2)==='2'&&<div key={index}>
                            {item}
                        </div>))}

                        </div>
                        <div className="flex flex-col gap-1 border-r-2 border-black  justify-center items-center">{day.map((item,index)=>(item.slice(1,2)==='3'&&<div key={index}>
                            {item}
                        </div>))}

                        </div>
                        <div className="flex flex-col gap-1 border-r-2 border-black  justify-center items-center">{day.map((item,index)=>(item.slice(1,2)==='4'&&<div key={index}>
                            {item}
                        </div>))}

                        </div>

                </div>
                )}
             </div>
            <h1 className="px-4 text-lg font-bold my-2">Day {dayIndex}</h1>
                <div>
                      {!openDay &&  <div> <button onClick={()=>{
                            setDayIndex((pre)=>pre +1);
                            setOpenDay(true);
                        }} className="bg-green-200 px-2 rounded-md py-1 shadow-md shadow-black text-center m-4" >Add Day</button> </div> }
                </div> 

                   {openDay && <div>
                    <div className="grid grid-cols-7 gap-2 border-2 border-black rounded-md py-2 px-1">
                    {dayItems.map(item=><button key={item}
                    className={clsx(`rounded-sm px-2 `
                    ,item.slice(1,2)==='1'&&'bg-sky-300'
                    ,item.slice(1,2)==='2'&&'bg-rose-300'
                    ,item.slice(1,2)==='3'&&'bg-teal-300'
                    ,item.slice(1,2)==='4'&&'bg-yellow-300')}>
                        {item}

                    </button>)}
                </div>
                        <div><button
                        onClick={()=>{
                            setFainalExam([...fainalExam,dayItems]);
                            setDayItems([]);
                            setOpenDay(false);
                        }}
                        className="bg-green-200 px-2 rounded-md py-1 shadow-md shadow-black text-center m-4">confirm adding the day</button>
                        <button className="bg-red-300 px-2 rounded-md py-1 shadow-md shadow-black text-center m-4"
                        onClick={()=>{
                            setDayItems([]);
                            setOpenDay(false);
                            setDayIndex((pre)=>pre-1);
                        }}
                        >Cancel</button>
                        
                        </div> 
                    </div> }

              {openDay &&  <div className="grid grid-cols-7 gap-2 my-2">
                    {Items2.map(item=><button key={item.name}
                    value={item.name}
                    onClick={(e)=>setDayItems([...dayItems,e.target.value])}
                    className={clsx(`rounded-sm px-2 `
                    ,item.name.slice(1,2)==='1'&&'bg-sky-300'
                    ,item.name.slice(1,2)==='2'&&'bg-rose-300'
                    ,item.name.slice(1,2)==='3'&&'bg-teal-300'
                    ,item.name.slice(1,2)==='4'&&'bg-yellow-300')}>
                        {item.name}

                    </button>)}
                </div> }

                            <div className="m-6">
                                <button className="text-center px-2 py-1 active:bg-green-200 bg-green-400 rounded-md" onClick={()=>null}>Update Fainal Exam Table In Database</button>
                            </div>
        </div>
    )
}