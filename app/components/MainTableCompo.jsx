'use client'
import {useState} from 'react'
import Link from 'next/link';
import { weekDays, lectureTimeDay, itemsInArabic } from './data';
import clsx from 'clsx';

const MainTable = ({onlineT2,onlineFainal})=>{
    const [iFocus,setIFocus]=useState(false);
    const [fainalFocus,setFainalFocus]=useState(false);
    const days = weekDays;
    const lecTime = lectureTimeDay;
    const onlineT = onlineT2?.table
    return(
        <main dir='rtl' className=' h-full '>
            
            <div className="p-4 shadow-sm ">
                <Link className="px-4 font-bold border-2  py-1  shadow-md shadow-blue-500 active:bg-green-400" href='/student'>رجوع</Link>
            </div>


            <div className='w-full px-[2px] '>
            <h1 className='text-center font-bold text-md'>جدول المحاظرات</h1>
                <div className='w-full flex justify-between border-2 border-b-0 border-black  h-8 bg-blue-200/70'>

                    <div className='w-[5%] text-center'>
                        <button className='text-xs font-bold bg-black rounded-md shadow-sm p-1 text-white' onClick={()=>setIFocus(pre=>!pre)}>تركيز</button>
                    </div>

                    <div className='w-[95%] grid grid-cols-6 grid-rows-1 items-center justify-center'>

                        {lecTime.map((time,ina)=><div key={ina}
                            className='text-center text-[8px] font-bold'>
                            {time}
                        </div>)}
                    </div>

                </div>
                <div className='w-full flex justify-between border-2 border-black  bg-blue-200/70'>

                    <div className='w-[5%]  grid grid-cols-1 gird-rows-5 justify-center items-center border-l-2 border-black'>
                        {days.map(day=><div key={day}
                            className='text-center text-sm font-bold rotate-[-90deg]'>
                            {day}
                        </div>)}
                    </div>

                    <div className={clsx(`w-[95%] `,iFocus &&'text-gray-300')}>

                        <div className='grid grid-cols-6 grid-rows-5 text-[8px] font-bold'>
                            { onlineT.map((hour,index)=><div key={index} className='border-[1px] border-r-0 border-t-0 border-black py-2 pr-[2px] bg-white' >

                                    {hour.map((item,i)=><div key={i+100} className='flex flex-col gap-2'>
                                        {itemsInArabic[item.slice(0,1)]}{(item.includes('cls')||item.includes('lab')?(item.includes('cls')?`${item.slice(1,-3)}(${'نضري'})`:`${item.slice(1,-3)}(${'عملي'})`):item.slice(1))}
                                    </div>)}

                            </div>) }
                        </div>

                    </div>

                </div>


            </div>


                           <div className='py-20 px-1 font-bold'>
                            <h1 className='text-center  text-md'>جدول الامتحانات النهائيه</h1>
                           <div className="border-2 border-black text-xs">
                            <div className='grid grid-cols-5 bg-red-300'>
                                <div className='text-center border-r-2 border-b-2 border-black'>
                                <div className='text-center'>
                        <button className='text-xs font-bold bg-black rounded-sm shadow-sm px-2 py-1 text-white' onClick={()=>setFainalFocus(pre=>!pre)}>تركيز</button>
                    </div>
                                </div>
                                <div className='text-center border-r-2 border-b-2 py-1 border-black'>المستوى الاول</div>
                                <div className='text-center border-r-2 border-b-2 py-1 border-black'>المستوى الثاني</div>
                                <div className='text-center border-r-2 border-b-2 py-1 border-black'> المستوى الثالث</div>
                                <div className='text-center border-r-2 border-b-2 py-1 border-black'>المستوى الرابع</div>
                            
                            </div>
                {onlineFainal.map((day,dayNumber)=><div key={dayNumber}
                className={clsx(`grid grid-cols-5 border-b-2 border-black`,dayNumber%2===0&&'bg-slate-300',dayNumber%2!==0&&'bg-green-200',fainalFocus&&'text-gray-400')} > <div className="flex flex-col gap-1  border-r-2 border-black justify-center items-center bg-red-300 text-black text-md font-extrabold">اليوم {dayNumber+1}</div>
                        <div className="flex flex-col gap-1 border-r-2 border-black py-2 justify-center items-center">{day.map((item,index)=>(item.slice(1,2)==='1'&&<div key={index}>
                        {itemsInArabic[item.slice(0,1)]}{item.slice(1)}
                        </div>))}

                        </div>
                        <div className="flex flex-col gap-1 border-r-2 border-black justify-center items-center">{day.map((item,index)=>(item.slice(1,2)==='2'&&<div key={index}>
                        {itemsInArabic[item.slice(0,1)]}{item.slice(1)}
                        </div>))}

                        </div>
                        <div className="flex flex-col gap-1 border-r-2 border-black  justify-center items-center">{day.map((item,index)=>(item.slice(1,2)==='3'&&<div key={index}>
                        {itemsInArabic[item.slice(0,1)]}{item.slice(1)}
                        </div>))}

                        </div>
                        <div className="flex flex-col gap-1 border-r-2 border-black  justify-center items-center">{day.map((item,index)=>(item.slice(1,2)==='4'&&<div key={index}>
                        {itemsInArabic[item.slice(0,1)]}{item.slice(1)}
                        </div>))}

                        </div>

                </div>
                )}
             </div>

                            </div> 

        </main>
    )
};

export default MainTable;