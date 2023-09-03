'use client'
import {useState} from 'react'
import { Items2 } from './data';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function OpenItemsAndMore({openItems, newOpenedArray, finished }){
    const [variant , setVariant]=useState(false);
    const [newOpen, setNewOpen] = useState(newOpenedArray);

    const handleAdd = ()=>{
        axios.post('/api/newOpen',newOpen).then((callback)=>{
            if(!callback?.error){toast.success('New items have been opened');
            if(callback?.error){toast.error('Some thing wrong happend did not add ')}
            }
        })
        setVariant(false)
    }

    return(
        <div>

            <div  className=" flex flex-wrap gap-4">
            {openItems.map((a,index)=> <div key={index} className="border-2 border-black p-2 ">  
                    {a}    
                
              </div>)} <div className='bg-blue-400 p-2 rounded-sm'><button onClick={()=>setVariant(true)}>Add</button></div>
              </div>

           {variant && <div>
              <div className='grid grid-cols-7 gap-2'>

                    {newOpen.map((item,index)=>(<button value={item} key={index} onClick={(e)=>{
                        let removeItem = newOpen.filter(b=>b!==(e.target.value))
                        setNewOpen(removeItem)}} className='bg-green-300 px-1 font-bold text-sm text-center' >

                        {item}

                    </button>))} 
            </div>

              <div className='grid grid-cols-7 gap-2'>

                {Items2.map((item,index)=>(!newOpen.includes(item.name) && !finished.includes(item.name) && !openItems.includes(item.name) && <button value={item.name} key={index} onClick={(e)=>setNewOpen([...newOpen,e.target.value])} className='bg-slate-300 px-1 font-bold text-sm text-center' >

                    {item.name}

                </button>))} 
              </div>
             
              <div className='flex justify-center font-bold m-4'><button onClick={()=>handleAdd()} className="outlien-none bg-gradient-to-tr from-green-400/60 to-red-500/50 shadow-md shadow-blue-600  p-1 w-1/3 rounded-se-xl">Confirm</button></div>
              </div>}

        </div>
    )
}