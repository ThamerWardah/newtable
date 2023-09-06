
import AddDistributor from "./components/AddDistributor";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


export default async function Home(){
  const session = await getServerSession(authOptions)
  if(session){redirect('/student')}
  return(
    <main className="p-6 w-full h-full flex justify-center items-center">
     
     <div className="p-1 rounded-md block relative overflow-hidden  ">
          <div className="z-0 absolute animate-spin bottom-[-25%] left-[-68%]  w-[220%] h-[150%] bg-gradient-to-tr from-red-500 to-green-500"></div>
          <AddDistributor /> 
      </div>

      <div className="">
        1+1
      </div>
    </main>
  )
};