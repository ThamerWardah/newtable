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
        <div className="w-full h-full p-4 font-bold text-sm">

            <div className="flex justify-between ">
             <section className="flex flex-col mt-10 gap-1 items-start w-1/2">
                <h1 className="font-bold text-2xl">{session?.data?.user?.name} <span className="text-green-500">{studentLevel}</span></h1>
                <h1 className="text-gray-400 text-sm">{session?.data?.user?.email}</h1>
                <div className=" flex flex-wrap gap-2 w-ful ">
                    {finishedItems.map((a,i)=><button onClick={(e)=>setFinishedItems(finishedItems.filter(k=>k!==a))} key={i} className=" rounded-sm bg-slate-400 text-[8px] px-2">
                        {a}
                    </button>)}
                </div>

             <Link className='m-4 active:bg-red-500 p-2 rounded-full bg-green-300' href='/people'>Table</Link>
                
               {session.data?.user ? <button onClick={()=>signOut()} className='m-4 active:bg-red-500 p-2 text-white rounded-full bg-blue-500' href='/people'>Sign Out</button>:<Link className='m-4 active:bg-red-500 p-2 rounded-full bg-green-300' href='/'>Sign in</Link>}


             </section>

                <div className="w-1/2 text-[8px] space-y-6 mt-10 p-2">

                    {stages.map((a,index)=><div key={index} className="flex flex-wrap gap-2">

                    {a.map(item=>(<div key={item.name} className={clsx(`px-2 rounded-sm ${stagesItemsColors[index]}`,(student.finished.includes(item.name))&& 'opacity-30')} >

                       <button disabled={(student.finished.includes(item.name))?true:false} onClick={(e)=>setFinishedItems([...finishedItems,e.target.value])} value={item.name}>{item.name}</button>

                         </div>))}

                     </div>)}
                     <div className="flex justify-center">{(!parseInt(oldFinished.length)&&someChangHappend)>0?
                            <button onClick={()=>handleAdd()} className="border-2 border-green-500 px-2 rounded-se-lg">Add</button>:(someChangHappend &&
                            <button onClick={()=>handleUpdate()} className="border-2 border-green-500 px-2 rounded-se-lg">Update</button>)
                            
                            }
                     </div>
                </div>

    
            </div>        
        </div>
    )
};



