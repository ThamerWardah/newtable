'use client'
import {useState} from 'react'
import Link from 'next/link';
import { weekDays, lectureTimeDay, itemsInArabic } from './data';
import clsx from 'clsx';

const MainTable = ({onlineT2})=>{
    const [iFocus,setIFocus]=useState(false);
    const days = weekDays;
    const lecTime = lectureTimeDay;
    const onlineT = onlineT2?.table
    return(
        <main dir='rtl' className='w-full h-full '>

            <div className="p-4 shadow-sm ">
                <Link className="px-4 font-bold border-2 mx-4 py-1  shadow-md shadow-blue-500 active:bg-green-400" href='/student'>رجوع</Link>
            </div>


            <div className='w-full px-1 '>

                <div className='w-full flex justify-between border-2 border-black  h-8'>

                    <div className='w-1/12 text-center'>
                        <button className='text-xs font-bold bg-black rounded-md shadow-sm p-1 text-white' onClick={()=>setIFocus(pre=>!pre)}>تركيز</button>
                    </div>

                    <div className='w-11/12 grid grid-cols-6 grid-rows-1 items-center justify-center'>

                        {lecTime.map((time,ina)=><div key={ina}
                            className='text-center text-[8px] font-bold'>
                            {time}
                        </div>)}
                    </div>

                </div>
                <div className='w-full flex justify-between border-2 border-black '>

                    <div className='w-1/12  grid grid-cols-1 gird-rows-5 justify-center items-center'>
                        {days.map(day=><div key={day}
                            className='text-center text-sm font-bold rotate-[-90deg]'>
                            {day}
                        </div>)}
                    </div>

                    <div className={clsx(`w-11/12  border-2 border-black`,iFocus &&'text-gray-300')}>

                        <div className='grid grid-cols-6 grid-rows-5 text-[9px] font-bold'>
                            { onlineT.map((hour,index)=><div key={index} className='border-[1px] border-black py-2 px-1 bg-white' >

                                    {hour.map((item,i)=><div key={i+100} className='flex flex-col gap-1'>
                                        {itemsInArabic[item.slice(0,1)]}{item.slice(1)}
                                    </div>)}

                            </div>) }
                        </div>

                    </div>

                </div>



              

            </div>


        </main>
    )
};

export default MainTable;