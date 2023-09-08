import axios from "axios"
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function MyOwnTable({takeItem , myOwnTable2}){
    const myOwnTable = takeItem;
    const router = useRouter();

    const handleAdd = ()=>{
        axios.post('/api/myOwnTable',{myOwnTable}).then(()=>{
            toast.success('Done');
            router.refresh();
        
        }).catch(()=>toast.error('Some thing went wrong'));
    }
    const handleUpdate = ()=>{
        const id = myOwnTable2?.id;
        axios.post('/api/updateMyOwnTable',{myOwnTable,id}).then(()=>{
            toast.success('Done');
            router.refresh();
        }).catch(()=>toast.error('Some thing went wrong'));
    }

    return(
        <div>
                <div >
                   
                    {!myOwnTable2?.id && <button onClick={()=>handleAdd()}
                    className="bg-blue-500 text-white text-sm  active:bg-green-200 px-2 py-1 rounded-md shadow-md"
                    >حفظ</button>}
                   { myOwnTable2?.id && <button onClick={()=>handleUpdate()}
                   className="bg-blue-500 text-white text-sm  active:bg-green-200 px-2 py-1 rounded-md shadow-md"
                   >تحديث الجدول </button>}
                </div>
        </div>
    )
}