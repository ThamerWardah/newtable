'use client'
import clsx from "clsx";

const Input = ({type,placeholder,onChange,value ,disabled })=>{
    return (
        
             <input  type={type} placeholder={placeholder} onChange={onChange} value={value} disabled={disabled}
                    className={clsx(`border-2  rounded-lg px-4 text-semiblod outline-none border-1 focus:border-green-400`,
                    disabled && `opacity-50 `)}
                    />

    
    )
}

export default Input ;