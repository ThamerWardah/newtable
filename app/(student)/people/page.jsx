import Link from "next/link";
import TheTable from "../../components/theTable";
import { finihsed } from "../../actions/finished";
import currentUser from "../../actions/getStudent";

export default async function Table(){
    const data = await finihsed();
    const user = await currentUser();
  
    return(
        <div>
    
            <div className="bg-black text-white px-4 py-2 shadow-md  shadow-white">
                <Link href='/student' className="font-bold px-2 m-2">Profile</Link>
            </div>
            
            <TheTable finishedFetch={data} />

        </div>
    ) 
}