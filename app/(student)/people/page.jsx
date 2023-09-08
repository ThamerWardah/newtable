import Link from "next/link";
import TheTable from "../../components/theTable";
import { finihsed ,newOpened } from "../../actions/finished";
import { getTableNow } from "../../actions/getStudent";
import myOwnTable from "../../actions/getMyOwnTable";


export default async function Table(){
    const onlineT2 = await getTableNow(); // onelineTable()
    const onlineT = onlineT2?.table ;
    const fainalExamT = onlineT2?.fainal ;
    const data = await finihsed();
    const manualOpened = await newOpened(); 
    const myTable = await myOwnTable();
    const myOwnTable2 = myTable[0] || [];
    
  
    return(
        <div>
            
            <div dir="rtl" className="px-4 pt-1 shadow-sm ">
                <Link className="px-4 font-bold border-2 mx-1 py-1  shadow-md shadow-blue-500 active:bg-green-300" href='/student'>رجوع</Link>
            </div>
           
            <TheTable finishedFetch={data} data2={manualOpened} table={onlineT} fainalExamT={fainalExamT} myOwnTable={myOwnTable2}/>

        </div>
    ) 
}