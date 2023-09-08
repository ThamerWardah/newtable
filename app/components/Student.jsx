'use client'

import {Items2, itemsInArabic} from "./data"
import { useState } from "react";
import clsx from "clsx";
import Link from "next/dist/client/link";
import axios from "axios";
import {signOut } from 'next-auth/react'
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import {GiHamburgerMenu} from 'react-icons/gi'
import {GrLogout} from 'react-icons/gr';
import{PiStudentDuotone} from 'react-icons/pi';
import {ImTable} from 'react-icons/im';
import {LuBookOpenCheck} from 'react-icons/lu';
import {HiMiniPencilSquare} from 'react-icons/hi2';



export default function Student({oldFinished ,studentLevel, errorFinished, user}){
 const rout = useRouter();

 const userAdmin = user?.email;
const [finishedItems , setFinishedItems] = useState(oldFinished);
 const [hamburger,setHamburger] = useState(false);


const howManyStages = [1,2,3,4];
const stagesItemsColors = ['bg-sky-300','bg-rose-300','bg-green-200','bg-orange-200'];
const stages = howManyStages.map(a=>Items2.filter(item=>item.name.slice(1,2).startsWith(a)));
const  student =   {finished:finishedItems}

const handleAdd = async()=>{
    const fn = {finishedArray:student.finished.join('_')}
    axios.post('api/finishedItems',fn).then(()=>{
        toast.success('تم');
        rout.refresh();
    }).catch(()=>toast.error('Something went wrong'));
    
}
const handleUpdate = async()=>{
    const fn = {finishedArray:student.finished.join('_')}
    axios.post('api/update',fn).then(()=>{
        toast.success('تم تحديث البيانات');
        rout.refresh();
    }).catch(()=>toast.error('Something went wrong'));
    
}

    let someChangHappend = !(finishedItems.filter(a=>!oldFinished?.includes(a)).length===0 && oldFinished.filter(b=>!finishedItems?.includes(b)).length===0);





    return(
        <div className="relative h-full w-full ">

               <div className=" flex justify-between shadow-lg font-bold  p-2">
                <GiHamburgerMenu className="text-2xl" onClick={()=>setHamburger(true)}/>

                <Link className=' active:bg-green-200  shadow-md shadow-blue-300 py-1 px-2 rounded-md bg-green-300' href='/people'>تسجيل على المواد</Link>
                
            </div>

            {hamburger &&   <div className="absolute bg-gradient-to-b from-black/80 to-gray-100 z-50 top-0 left-0 flex w-full h-full">
                 <div className="w-4/5 h-full">

                     <div className="w-full h-32  bg-blue-400 flex flex-col py-2 pl-2 pr-1 justify-between  text-white font-bold">
                        <div ><PiStudentDuotone className="text-6xl shadow-md shadow-blue-500 border-2  text-black bg-gray-200 rounded-full ml-2  p-2"/></div>
                      <div className="mb-4">

                           <h1 dir="ltr" className="font-bold text-sm text-start ml-2 ">{user?.name}</h1>
                            <div className="flex justify-between">
                                <div className="flex justify-between w-full">
                               <h1 className="text-gray-300 text-xs inline-block">{user?.email}</h1>
                               <h1 className="inline-block text-end">
                               <span className="text-gray-100 text-md mx-4 text-end">{studentLevel} : <span className="text-gray-200 text-end text-xs">الوحدات المنجزه</span></span>
                               </h1>
                               </div>
                            </div>
                        </div> 

                    </div>


                        <div className="flex pt-20 h-full flex-col gap-6 px-2 bg-gray-100 shadow-2xl rounded-br-full text-sm font-bold">

                        <Link className=' w-fit' href='/mainTable'><ImTable className="inline-block text-3xl  pr-2"/>الجدول</Link>

                        <Link className=' w-fit' href='/people'><HiMiniPencilSquare className="inline-block text-3xl  pr-2"/>تسجيل على المواد</Link>

                        <Link href='/openItemsPage' className="w-fit"><LuBookOpenCheck className="inline-block text-3xl  pr-2"/> المواد المتاحه</Link>

                {userAdmin?.includes('admin9766')&&<Link href='/theTable' className="w-fit">Create Table</Link>}

                <button onClick={()=>signOut()} className='text-start w-fit ' href='/people'>
                <GrLogout className="inline-block text-2xl  pr-2"/> تسجيل خروج</button>
                        </div>

                    
                    </div>
                    <div onClick={()=>setHamburger(false)} className="w-1/5 h-full bg-transparent flex justify-center overflow-hidden items-center">
                        <div className="border-2 border-white/80 w-8 h-8 rounded-full animate-ping">
                        <div className="border-4 border-blue-400 w-8 h-8 rounded-full animate-ping">
                        <div className="border-6 border-green-400 w-6 h-6 rounded-full animate-ping">
                        <div className="border-8 border-yellow-500/60 w-6 h-6 rounded-full animate-pulse "></div>
                        </div>
                        </div>
                        </div>
                        

                    </div>

               </div>}


       
        <div className="w-full h-full p-4 font-bold text-sm">
            <div>
             <section className="flex flex-col mt-2 gap-1 items-start">
              
                <div className="grid grid-cols-7 gap-2 w-ful ">
                    {finishedItems.map((a,i)=><button onClick={(e)=>setFinishedItems(finishedItems.filter(k=>k!==a))} key={i} className=" rounded-sm bg-slate-300/80 text-[9px] px-2">
                        {itemsInArabic[a.slice(0,1)]}{a.slice(1)}
                    </button>)}
                </div>



             </section>

                <div className="text-[10px]  mt-10 p-2 grid grid-cols-2 grid-rows-2 gap-4">

                    {stages.map((a,index)=><div key={index} className="grid grid-cols-3 gap-2 text-center p-1 ">

                    {a.map(item=>(<div key={item.name} className={clsx(`px-2 rounded-sm ${stagesItemsColors[index]}`,(student.finished.includes(item.name))&& 'opacity-30')} >

                       <button disabled={(student.finished.includes(item.name))?true:false} onClick={(e)=>setFinishedItems([...finishedItems,e.target.value])} value={item.name}>{itemsInArabic[(item.name).slice(0,1)]}{(item.name).slice(1)}</button>

                         </div>))}

                     </div>)}
                </div>
                     <div className="flex justify-center text-gray-800 mt-4">{(!parseInt(errorFinished.length)>0 && someChangHappend)?
                            <button onClick={()=>handleAdd()} className="outlien-none bg-gradient-to-r from-green-400/60 to-yellow-500/60 shadow-md   p-1 w-1/2 rounded-se-xl">اضافه</button>:(someChangHappend &&
                            <button onClick={()=>handleUpdate()} className="outlien-none bg-gradient-to-r from-green-400/60 to-yellow-500/60 shadow-md  p-1 w-1/2 rounded-se-xl" >تحديث البيانات </button>)
                            
                            }
                     </div>

    
            </div>        
        </div>
        </div>
    )
};



