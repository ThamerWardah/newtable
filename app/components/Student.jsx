'use client'

import {Items2} from "./data"
import { useState } from "react";
import clsx from "clsx";
import Link from "next/dist/client/link";
import axios from "axios";
import {useSession ,signOut} from 'next-auth/react'
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function Student({oldFinished ,studentLevel}){
 const session = useSession();
 const rout = useRouter();
const [finishedItems , setFinishedItems] = useState(oldFinished);

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
        <div>
               <div className=" flex justify-between shadow-lg font-bold  p-2">
                <Link className=' active:bg-red-500  shadow-md shadow-blue-400 py-1 px-4 rounded-md bg-green-300' href='/people'>Table</Link>
                
                {session.data?.user ? <button onClick={()=>signOut()} className='active:bg-red-500 shadow-md shadow-green-500 py-1 px-2 text-white rounded-md bg-blue-500' href='/people'>Sign Out</button>:<Link className='m-4 active:bg-red-500 shadow-md shadow-green-500 py-1 px-2 rounded-md bg-green-300' href='/'>Sign in</Link>}
            </div>
       
        <div className="w-full h-full p-4 font-bold text-sm">

            <div className="mb-4">
                <h1 className="font-bold text-xl ">{session?.data?.user?.name} <span className="text-green-500 mx-10">{studentLevel} <span className="text-black text-xs">الوحدات المنجزه</span></span></h1>
                    <h1 className="text-gray-400 text-sm">{session?.data?.user?.email}</h1>
            </div>

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
                     <div className="flex justify-center text-gray-800 mt-4">{(!parseInt(oldFinished.length)&&someChangHappend)>0?
                            <button onClick={()=>handleAdd()} className="outlien-none bg-gradient-to-tr from-green-400/60 to-red-500/50 shadow-md shadow-blue-600  p-1 w-1/2 rounded-se-xl">Add</button>:(someChangHappend &&
                            <button onClick={()=>handleUpdate()} className="outlien-none bg-gradient-to-tr from-green-400/60 to-red-500/50 shadow-md shadow-blue-600  p-1 w-1/2 rounded-se-xl">Update</button>)
                            
                            }
                     </div>

    
            </div>        
        </div>
        </div>
    )
};



