'use client'
import {useState} from 'react'
import { Items2 } from './data';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function OpenItemsAndMore({openItems, newOpenedArray, finished }){
    const router = useRouter();
    const [variant , setVariant]=useState(false);
    const [newOpen, setNewOpen] = useState(newOpenedArray);

    const handleAdd = ()=>{
        axios.post('/api/newOpen',newOpen).then((callback)=>{
            if(!callback?.error){   
                                toast.success('New items have been opened');
                                router.refresh();
                    };
            if(callback?.error){toast.error('Some thing wrong happend did not add ')}
            
        })
        setVariant(false)
    }

    return(
        <div className='w-full h-full px-4 py-4 mt-4'>
            <div dir='rtl' className='m-2 px-1 text-md'>
                <h1 className='text font-extrabold'>١-المواد المتاحه للتسجيل  وفق ضوابط القسم.</h1>
            </div>
            <div  className="grid grid-cols-6 gap-2 text-center font-bold ">
            {openItems.map((a,index)=> <div key={index} className="bg-slate-300 px-2 rounded-sm text-xs py-1">  
                    {a}    
                
              </div>)} 
              </div>

              <div dir='rtl' className='m-2 mt-14 px-1 text-md'>
                <h1 className='text font-extrabold'>٢-المواد المضافة من قبل الطالب(اضافتها يدويا في حال امكانيه التسجيل عليها وغير موجوده في الحقل ١  )</h1>
            </div>
              <div className='border-4  rounded-sm'>

                <div dir='rtl' className='flex justify-between font-bold'>
                {!variant?<button className='bg-blue-800 text-white px-2 py-1 rounded-md' onClick={()=>setVariant(true)}>تعديل</button>:<button className='bg-blue-800 text-white px-4 py-1 rounded-md' onClick={()=>{
                                setVariant(false);
                                setNewOpen(newOpenedArray);
                            }}>الغاء</button>}
               {newOpenedArray.length ===0 && <h1 className='flex-1 text-center text-gray-600 '> لم يتم  الاضافة بعد</h1>}
                </div>

                <div className='relative'>
              
                <div className='px-4 pb-4 flex flex-wrap gap-2'>
                {newOpenedArray.map((item,index)=>(<div value={item} key={index} className='bg-green-200 mt-8 px-1 font-bold text-sm text-center' >
                    {item}
                </div>))} 
                </div>

                {variant && <div className='w-full absolute top-0 right-0 rounded-sm bg-white  shadow-lg'>
              <div className='grid grid-cols-6 py-4 px-1 gap-2'>

                    {newOpen.map((item,index)=>(<button value={item} key={index} onClick={(e)=>{
                        let removeItem = newOpen.filter(b=>b!==(e.target.value))
                        setNewOpen(removeItem)}} className='bg-green-200 px-1 font-bold text-sm text-center' >

                        {item}

                    </button>))} 
            </div>

              <div className='grid grid-cols-6 px-1 gap-2 mt-4'>

                {Items2.map((item,index)=>(!newOpen.includes(item.name) && !finished.includes(item.name) && !openItems.includes(item.name) && <button value={item.name} key={index} onClick={(e)=>setNewOpen([...newOpen,e.target.value])} className='bg-slate-300 px-1 font-bold text-sm text-center' >

                    {item.name}

                </button>))} 
              </div>
             
              <div className='flex justify-center font-bold m-4'><button onClick={()=>{
                handleAdd();
                setVariant(false)
                }} className="outlien-none bg-gradient-to-tr from-green-200 to-blue-200 shadow-md shadow-blue-600 text-lg p-1 w-1/3 rounded-se-xl">تاكيد</button></div>
              </div>}

                </div>
              </div>

                <div dir='rtl'>
                    <h1>note about the items</h1>
                </div>
          
        </div>
    )
}