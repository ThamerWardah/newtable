'use client'

import {Items2} from "../../components/data";
import { useState } from "react";
import clsx from "clsx";
import Link from "next/dist/client/link";
import axios from "axios";
import {useSession ,signOut} from 'next-auth/react'



export default function Student(){
 const session = useSession();
const [finishedItems , setFinishedItems] = useState([]);

const howManyStages = [1,2,3,4];
const stagesItemsColors = ['bg-sky-300','bg-rose-300','bg-green-200','bg-orange-200'];
const stages = howManyStages.map(a=>Items2.filter(item=>item.name.slice(1,2).startsWith(a)));
const  student =   {finished:finishedItems}

const handleAdd = async()=>{
    const fn = {finishedArray:student.finished.join('_')}
    axios.post('api/finishedItems',fn).then(()=>alert('Done')).catch(()=>alert('Something went wrong'));
    
}

    return(
        <div className="w-full h-full p-4 font-bold">

            <div className="flex justify-between">
             <section className="flex flex-col mt-10 gap-1 items-start">
                <h1 className="font-bold text-2xl">{session?.data?.user?.name}</h1>
                <h1 className="text-gray-400 text-sm">{session?.data?.user?.email}</h1>

             <Link className='m-4 active:bg-red-500 p-2 rounded-full bg-green-300' href='/people'>Table</Link>
                
                <button onClick={()=>signOut()} className='m-4 active:bg-red-500 p-2 text-white rounded-full bg-blue-500' href='/people'>Sign Out</button>


             </section>

                <div className=" w-1/2 space-y-6 mt-10 p-2">

                    {stages.map((a,index)=><div key={index} className="flex flex-wrap gap-2">

                    {a.map(item=>(<div key={item.name} className={clsx(`px-2 rounded-sm ${stagesItemsColors[index]}`,student.finished.includes(item.name)&& 'opacity-30')} >

                       <button disabled={student.finished.includes(item.name)?true:false} onClick={(e)=>setFinishedItems([...finishedItems,e.target.value])} value={item.name}>{item.name}</button>

                         </div>))}

                     </div>)}
                     <div className="flex justify-center">
                            <button onClick={()=>handleAdd()} className="border-2 border-green-500 px-2 rounded-se-lg">Add</button>
                     </div>
                </div>

    
            </div>        
        </div>
    )
};



