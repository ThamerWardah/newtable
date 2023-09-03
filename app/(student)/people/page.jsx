import Link from "next/link";
import TheTable from "../../components/theTable";
import { finihsed ,newOpened } from "../../actions/finished";
import onelineTable from "../../actions/onlineTable";


export default async function Table(){
    const onlineT2 = await onelineTable();
    const onlineT = onlineT2?.table
    const data = await finihsed();
    const manualOpened = await newOpened();
    
  
    return(
        <div>
            
            <div className="bg-black text-white px-4 py-2 shadow-md  shadow-white">
                <Link href='/student' className="font-bold px-2 m-2">Profile</Link>
            </div>
            
            <TheTable finishedFetch={data} data2={manualOpened} table={onlineT}/>

        </div>
    ) 
}