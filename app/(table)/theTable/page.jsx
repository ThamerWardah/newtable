import onelineTable from "../../actions/onlineTable";
import Link from "next/link";
import CreateTable from "../../components/theTableComponent";
import { getTableNow } from "../../actions/getStudent";

export default async function NewTAble(){
    const onlineT2 = await getTableNow(); // onelineTable()
    const onlineT = onlineT2?.table
    
    return(
        <div>
            <div className="p-4 shadow-sm">
                <Link className="px-4 font-bold border-2 mx-4 py-1  shadow-md shadow-blue-500 active:bg-green-400" href='/student'>رجوع</Link>
            </div>
            <CreateTable onlineT={onlineT}/>
        </div>
    )
}