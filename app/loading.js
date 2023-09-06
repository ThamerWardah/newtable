
export default function LoaingStudent(){

    return(
        <main className="p-6 w-full h-full flex justify-center items-center">
     
        <div className="p-1 rounded-md block relative overflow-hidden  ">
             <div className="z-0 absolute animate-spin bottom-[-25%] left-[-68%]  w-[220%] h-[150%] bg-gradient-to-tr from-red-500 to-green-500"></div>
             <div className="text-blue-600 relative bg-gray-100 p-1 z-50 text-4xl font-bold text-center"> Loading</div>
         </div>
   
       </main>
    )
}