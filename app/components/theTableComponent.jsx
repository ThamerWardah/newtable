'use client'
import {Items2, Items, lectureTime} from './data';
import {useEffect, useState} from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';



const CreateTable = ({onlineT})=>{
    const [emptyArray,setEmptyArray]=useState([]);
    const [firstOpen,setFirstOpen]=useState(false);
    const [secondOpen,setSecondOpen]=useState(false);
    const [timeIndex,setTimeIndex]=useState(0);
    const [itemClicked,setItemClicked]=useState('');
    const table2 = onlineT
    const emptyTable = table2;
    const allWeekDays = ["الأحد",  "الإثنين",  "الثلاثاء",   "الأربعاء" ,  "الخميس","الأحد",  "الإثنين",  "الثلاثاء",   "الأربعاء" ,  "الخميس","الأحد",  "الإثنين",  "الثلاثاء",   "الأربعاء" ,  "الخميس","الأحد",  "الإثنين",  "الثلاثاء",   "الأربعاء" ,  "الخميس","الأحد",  "الإثنين",  "الثلاثاء",   "الأربعاء" ,  "الخميس",];
    const groups = ['/','1 ','2 ','3 ','4 ','5 ','ك','ف','ح','ج','ب','ت','ي' ,'cls','lab'];
    const handleAddTable = async()=>{
        const table = emptyTable
        axios.post('/api/createTable',{table}).then(()=>toast.success('done')).catch(()=>toast.error('Faild'));
    }
    const handleUpdateTable = async()=>{
        const table = emptyTable
        axios.post('/api/updateTable',{table}).then(()=>toast.success('Updated')).catch(()=>toast.error('Faild'));
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



               { firstOpen && <div className='p-4 bg-black text-white w-full h-full absolute text-2xl font-bold top-0 right-0'>

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
                </div>

                    <h1>{allWeekDays[parseInt(timeIndex)]}</h1>

                    <div className='text-md'>   
                        <div>
                            <h1>{lectureTime[timeIndex]}</h1>
                            <h1></h1>
                        </div>
                        <div className='h-40 flex flex-col text-xs gap-1 border-2 border-green-300 flex-wrap mx-2'>
                            {emptyArray.map((b,j)=><button value={b} key={j} onClick={()=>setEmptyArray([...emptyArray.filter(r=>r !== e.target.value)])} className='border-2 border-red-300 px-2 rounded-sm w-fit' >
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

        </div>
    )
};

export default CreateTable ;