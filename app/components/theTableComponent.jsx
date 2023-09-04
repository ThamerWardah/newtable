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
    const groups = ['/',"١"," ٢" ," ٣" , "٤",'ك','ف','ح','ج','ب','ت','ي'];
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
                }
                }
               >{item.map((c,f)=><h3 key={f*4+5002} className='flex flex-col '>
                    {c}
               </h3>)}</button> 

            </div>)}

        </div>



               { firstOpen && <div className='p-4 bg-black/70 text-white w-full h-full absolute text-2xl font-bold top-0 right-0'>

                <div><button onClick={()=>{
                                        setFirstOpen(false);
                                        setEmptyArray([]);
                                        
                                        }} className='p-2 bg-blue-700'>Close</button></div>

                <div><button onClick={()=>{
                            setFirstOpen(false);
                            emptyTable[timeIndex]=emptyArray;
                            setEmptyArray([]);
                            }} className='p-2 bg-green-700'>Done</button></div>

                    <h1>{timeIndex}</h1>

                    <div className='text-md'>   
                        <div>
                            <h1>{lectureTime[timeIndex]}</h1>
                            <h1></h1>
                        </div>
                        <div className='h-40 flex flex-col text-xs gap-1'>
                            {emptyArray.map((b,j)=><div key={j}>
                                {b}
                                </div>)}
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
                        {secondOpen && <div className='absolute top-0 right-0 w-full h-full bg-blue-400/20'>
                                        <div className='m-4'><button onClick={()=>setSecondOpen(false)}>Close</button></div>
                                        <div className='flex gap-4'>
                                            <div>{itemClicked}</div>
                                            {groups.map(g=><div key={g}>
                                                    <button
                                                    onClick={()=>setItemClicked(`${itemClicked}${g}`)}
                                                    >{g}</button>
                                            </div>)}
                                            <div ><button         
                                             value={itemClicked}className='bg-green-600 border-2 border-black p-2'
                                                onClick={(e)=>{
                                                    setEmptyArray([...emptyArray,e.target.value]);
                                                    setSecondOpen(false)
                                                }}
                                            >Add</button></div>
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