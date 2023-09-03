'use client'

import {Items2} from "./data"
import { useState } from "react";
import clsx from "clsx";
import Link from "next/dist/client/link";
import axios from "axios";
import {signOut} from 'next-auth/react'
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import {GiHamburgerMenu} from 'react-icons/gi'
import {GrLogout} from 'react-icons/gr'
import{PiStudentDuotone} from 'react-icons/pi'


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
        toast.success('Done');
        rout.refresh();
    }).catch(()=>toast.error('Something went wrong'));
    
}
const handleUpdate = async()=>{
    const fn = {finishedArray:student.finished.join('_')}
    axios.post('api/update',fn).then(()=>{
        toast.success('Done');
        rout.refresh();
    }).catch(()=>toast.error('Something went wrong'));
    
}

    let someChangHappend = !(finishedItems.filter(a=>!oldFinished?.includes(a)).length===0 && oldFinished.filter(b=>!finishedItems?.includes(b)).length===0);





    return(
        <div className="relative h-full w-full ">

               <div className=" flex justify-between shadow-lg font-bold  p-2">
                <GiHamburgerMenu className="text-2xl" onClick={()=>setHamburger(true)}/>

                <Link className=' active:bg-red-500  shadow-md shadow-blue-400 py-1 px-4 rounded-md bg-green-300' href='/people'>Table</Link>
                
            </div>

            {hamburger &&   <div className="absolute  z-50 top-0 left-0 flex w-full h-full">
                 <div className="w-4/5 h-full">

                     <div className="w-full h-32  bg-blue-400 flex flex-col py-2 px-4 justify-between  text-white font-bold">
                        <div ><PiStudentDuotone className="text-6xl shadow-md shadow-blue-600 border-2 border-blue-500 text-black bg-gray-200 rounded-full  p-2"/></div>
                      <div className="mb-4">
                           <h1 className="font-bold text-md text-start ">{user?.name} <span className="text-gray-100 text-lg mx-10">{studentLevel} : <span className="text-gray-200 text-sm">الوحدات المنجزه</span></span></h1>
                               <h1 className="text-gray-300  text-sm">{user?.email}</h1>
                        </div> 

                    </div>


                        <div className="flex pt-20 h-full flex-col gap-4 bg-gray-100 shadow-2xl rounded-br-full">
                        <Link href='/openItemsPage' className="font-bold px-2 m-2">Open Items</Link>
                {userAdmin?.includes('admin')&&<Link href='/theTable' className="font-bold px-2 m-2">Create Table</Link>}

                <button onClick={()=>signOut()} className='active:bg-red-500 text-start font-bold  px-2 m-2 ' href='/people'>
                    <GrLogout className="inline-block text-2xl font-bold pr-2"/>  Sign Out</button>
                        </div>

                    
                    </div>
                    <div onClick={()=>setHamburger(false)} className="w-1/5 h-full bg-gradient-to-b from-black/80 to-gray-100 flex justify-center overflow-hidden items-center">
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
                        {a}
                    </button>)}
                </div>



             </section>

                <div className="text-[10px]  mt-10 p-2 grid grid-cols-2 grid-rows-2 gap-4">

                    {stages.map((a,index)=><div key={index} className="grid grid-cols-3 gap-2 text-center p-1 ">

                    {a.map(item=>(<div key={item.name} className={clsx(`px-2 rounded-sm ${stagesItemsColors[index]}`,(student.finished.includes(item.name))&& 'opacity-30')} >

                       <button disabled={(student.finished.includes(item.name))?true:false} onClick={(e)=>setFinishedItems([...finishedItems,e.target.value])} value={item.name}>{item.name}</button>

                         </div>))}

                     </div>)}
                </div>
                     <div className="flex justify-center text-gray-800 mt-4">{(!parseInt(errorFinished.length)>0 && someChangHappend)?
                            <button onClick={()=>handleAdd()} className="outlien-none bg-gradient-to-tr from-green-400/60 to-red-500/50 shadow-md shadow-blue-600  p-1 w-1/2 rounded-se-xl">Add</button>:(someChangHappend &&
                            <button onClick={()=>handleUpdate()} className="outlien-none bg-gradient-to-tr from-green-400/60 to-red-500/50 shadow-md shadow-blue-600  p-1 w-1/2 rounded-se-xl">Update</button>)
                            
                            }
                     </div>

    
            </div>        
        </div>
        </div>
    )
};



