'use client'
import {Items2, Items, lectureTime} from './data';
import {useEffect, useState} from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import clsx from 'clsx'
    



const CreateTable = ({onlineT,onlineFainal})=>{
    const [emptyArray,setEmptyArray]=useState([]);
    const [firstOpen,setFirstOpen]=useState(false);
    const [secondOpen,setSecondOpen]=useState(false);
    const [timeIndex,setTimeIndex]=useState(0);
    const [itemClicked,setItemClicked]=useState('');
    //Fainal exam
        const [dayItems,setDayItems]=useState([]);
        const [fainalExam,setFainalExam]=useState(onlineFainal);
        const [dayIndex,setDayIndex]=useState(onlineFainal.length);
        const [openDay,setOpenDay]=useState(false);
    //----------------------------------------------
    const table2 = onlineT
    const emptyTable = table2;
    const allWeekDays = ["الأحد",  "الإثنين",  "الثلاثاء",   "الأربعاء" ,  "الخميس","الأحد",  "الإثنين",  "الثلاثاء",   "الأربعاء" ,  "الخميس","الأحد",  "الإثنين",  "الثلاثاء",   "الأربعاء" ,  "الخميس","الأحد",  "الإثنين",  "الثلاثاء",   "الأربعاء" ,  "الخميس","الأحد",  "الإثنين",  "الثلاثاء",   "الأربعاء" ,  "الخميس",];
    const groups = ['/',' 1 ',' 2 ',' 3 ',' 4 ',' 5 ','ك','ف','ح','ج','ب','ت','ي' ,'cls','lab'];
    const handleAddTable = async()=>{
        const table = emptyTable
        axios.post('/api/createTable',{table,fainalExam}).then(()=>toast.success('done')).catch(()=>toast.error('Faild'));
    };
    const handleUpdateTable = async()=>{
        const table = emptyTable
        const fainal = fainalExam
        axios.post('/api/updateTable',{table , fainal}).then(()=>toast.success('Updated')).catch(()=>toast.error('Faild'));
    }



    return(
        <div  className='relative w-full h-full mt-10 rounded-sm'>
            

        <div className='grid grid-cols-6 grid-rows-5 px-2 w-full h-full text-[8px] font-bold'>

            {table2.map((item,index)=><div className='border-[1px] border-s py-2 text-start border-black' key={index}>

               <button value={index} className='w-full h-full text-start px-2' 
                onClick={(e)=>{
                    setFirstOpen(true);
                    setTimeIndex(index);
                    setEmptyArray(table2[index])
                }
                }
               >{item.map((c,f)=><h3 key={f*4+5002} className='flex flex-col '>
                    {c}
               </h3>)}</button> 

            </div>)}

        </div>



               { firstOpen && <div className='p-4 bg-black text-white w-full h-full absolute text-xl font-bold top-0 right-0'>

              <div className='px-4 flex justify-between'>
                        <div><button onClick={()=>{
                                                setFirstOpen(false);
                                                setEmptyArray([]);
                                                
                                                }} className='p-2 bg-blue-700'>Close</button></div>

                        <div><button onClick={()=>{
                                    setFirstOpen(false);
                                    emptyTable[timeIndex]=emptyArray;
                                    setEmptyArray([]);
                                    }} className='p-2 bg-green-700'>Done</button></div>

                        <div><button onClick={()=>{
                                    setFirstOpen(false);
                                    emptyTable[timeIndex]=emptyArray;
                                    emptyTable[timeIndex+1]=emptyArray;
                                    setEmptyArray([]);
                                    }} className='p-2 bg-green-700'>set the next  too </button></div>
                </div>


                    <h1 className='text-center'>{allWeekDays[timeIndex]}</h1>
                    <h1 className='text-center'>{lectureTime[timeIndex]}</h1>

                    <div className='text-md'>   
                        
                        <div className='h-40 flex flex-col text-xs gap-1 border-2 border-green-300 flex-wrap mx-2'>
                            {emptyArray.map((b,j)=><button value={b} key={j} onClick={(e)=>setEmptyArray([...emptyArray.filter(r=>r !== e.target.value)])} className='border-2 border-red-300 px-2 rounded-sm w-fit' >
                                {b}
                                </button>)}
                        </div>
                    </div>

                    <div className='grid grid-cols-6 text-sm gap-2 relative'>
                        {Items2.map((a,i)=><div key={i} className='bg-slate-500 text-white'>
                        <button value={a.name} className='w-full h-full text-center'
                            onClick={(e)=>{
                                setItemClicked(e.target.value);
                                setSecondOpen(true);
                            }}
                        >{a.name}</button>
                        {secondOpen && <div className='absolute top-0 right-0 w-full h-full bg-blue-500'>

                                    
                                        <div className='m-4 flex justify-evenly'><button onClick={()=>setSecondOpen(false)} className='bg-red-500 p-1 rounded-md'>Close</button>
                                        <div ><button         
                                             value={itemClicked}className='bg-green-400 rounded-md p-1'
                                                onClick={(e)=>{
                                                    setEmptyArray([...emptyArray,e.target.value]);
                                                    setSecondOpen(false)
                                                }}
                                            >Add</button></div>
                                        </div>
                                        
                                        <div className='flex flex-col items-center gap-8'>
                                            <div className='text-lg px-4 py-1 bg-black rounded-sm'>{itemClicked}</div>
                                            <div className='grid grid-cols-4 grid-rows-3 gap-2'>
                                            {groups.map(g=><div key={g}
                                                    className='flex flex-wrap gap-2'>
                                                    <button className='border-2 rounded-sm px-2 '
                                                    onClick={()=>setItemClicked(`${itemClicked}${itemClicked.length>5?(['cls','lab'].includes(g)?g:g.slice(1,2)):g}`)}
                                                    >{g}</button>
                                            </div>)}
                                          </div>
                                        </div>

                                        </div>}
                        </div>)}
                    </div>

                </div>}




                <div className='flex justify-center my-20 text-lg font-bold'>
                    <button className='px-2 border-2 border-black rounded-lg ' onClick={()=>handleUpdateTable()}>Update The Table</button>
                </div>



   

        <div className="p-1 text-sm font-bold">
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
                        }} className="bg-green-200 px-2 rounded-md py-1 shadow-md shadow-black text-center m-4" >Add Day</button>
                         <button onClick={()=>{
                            setFainalExam([]);
                        }} className="bg-red-400 px-2 rounded-md py-1 shadow-md shadow-black text-center m-4" >Reset</button> </div> }
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
                                <button className="text-center px-2 py-1 active:bg-green-200 bg-green-400 rounded-md" onClick={()=>handleUpdateTable()}>Update Fainal Exam Table In Database</button>
                            </div>
        </div>

        </div>
    )
};

export default CreateTable ;