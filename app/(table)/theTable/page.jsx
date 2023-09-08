import Link from "next/link";
import CreateTable from "../../components/theTableComponent";
import { getTableNow , currentUser} from "../../actions/getStudent";
import { redirect } from 'next/navigation'; 

export default async function NewTAble(){
    const user = await currentUser();
    if(!user){redirect('/')}
    
    const onlineT2 = await getTableNow(); 
    const onlineT = onlineT2?.table
    const onlineFainal = onlineT2?.fainal
    
    return(
        <div>
            <div className="p-4 shadow-sm">
                <Link className="px-4 font-bold border-2 mx-4 py-1  shadow-md shadow-blue-500 active:bg-green-400" href='/student'>رجوع</Link>
            </div>
            <CreateTable onlineT={onlineT} onlineFainal={onlineFainal}/>
        </div>
    )
}