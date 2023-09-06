'use client'
import { useState , useCallback ,useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import {toast} from 'react-hot-toast'
import clsx from 'clsx'
import {signIn , useSession} from 'next-auth/react'

import Input from './Input'

const AddDistributor = ()=>{
    const session = useSession();
    
    const initialData ={
        name:'',
        email:'',
        password:'',
        department:'mathmatics'
    }

    const router = useRouter()
    const [data ,setData] = useState(initialData);
    const [variant , setVariant] = useState('login');
    const [isLoading , setIsLoading] = useState(false);
    const [welcom,setWelcom]=useState(false)

    useEffect(()=>{
        if(session?.status === 'authenticated'){
            router.push('/student')
            console.log('Authenticated')
        }
        console.log('Un authenticated')
    },[session?.status,router])

    const toggleVariant = useCallback(()=>{
        console.log('Variant has been changed')
        variant === 'signin'?setVariant('login'):setVariant('signin')
    },[variant])


    const handleSubmit = async(e)=>{
        e.preventDefault();
        setIsLoading(true)
        if(variant === 'signin'){
        axios.post('/api/register',data).then((callback)=>{
                 if(!callback?.error){
                        setWelcom(true);
                        toast.success('Done');
                        setData(initialData);
                        router.refresh();
                        signIn('credentials',{...data,redirect:false}); 
                        
                           };
                 if(callback?.error){toast.error(callback.error)}
                                                    
        }).finally(()=>setIsLoading(false)) }

        if(variant === 'login' ){
            signIn('credentials',{...data,redirect:false}).then((callback)=>{
                if(!callback?.error){ setWelcom(true);toast.success("Loged in"); router.refresh()};
                if(callback?.error){toast.error(callback.error)};
            }).finally(setIsLoading(false))
        }
    }

    return(
    <div className="w-full h-full rounded-md relative bg-gray-100 z-50 py-6 px-4">
        {!welcom && <div>
        <div className="flex py-14">
       
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-sm mb-10">

                 {variant === 'signin' &&  <Input type='text' dir='rtl' placeholder='الاسم' disabled={isLoading} value={data.name} onChange={(e)=>setData({...data,name:e.target.value})}/> }

                   <Input  type='email' dir='ltr' placeholder='Email' disabled={isLoading} value={data.email} onChange={(e)=>setData({...data,email:e.target.value})}/>

                   <Input type='password' dir='ltr' placeholder='Password' disabled={isLoading} value={data.password} onChange={(e)=>setData({...data,password:e.target.value})}/>

                   {variant === 'signin' &&  <select className="text-center font-bold text-sm" onChange={(e)=>setData({...data,department:e.target.value})}>
                        <option value="mathmatics" >Mathmatics</option>
                        <option value="bio">Bio</option>
                        <option value="geology">Geology</option>
                   </select> }

                    <button className={clsx(`border-2 rounded-tr-full mt-4 rounded-bl-full bg-gradient-to-tr from-blue-500 to-green-300 shadow-lg shadow-gray-400 border-none  text-gray-800 font-bold`,isLoading&&'opacity-50 ')}>{variant ==='signin' ?"انشاء":"تسجيل الدخول"}</button>
                </form>
        </div>

        <div dir="rtl" className="text-center text-sm font-bold flex gap-4 justify-center  "><h1>{variant === 'signin'?"لدي حساب" : "لا املك حساب"}</h1><button className="underline text-gray-500 " type="button" onClick={()=>toggleVariant()}>{variant === 'signin'?"تسحيل الدخول" : "انشاء حساب "}</button></div>
        </div> } {welcom && <div className="text-green-600 text-6xl font-bold text-center"> welcom</div>}

        </div>
    )
}

export default AddDistributor;