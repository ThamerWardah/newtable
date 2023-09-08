import axios from "axios"
import { toast } from "react-hot-toast"


export default function MyOwnTable({takeItem , myOwnTable2}){
    const myOwnTable = takeItem;

    const handleAdd = ()=>{
        axios.post('/api/myOwnTable',{myOwnTable}).then(()=>toast.success('Done')).catch(()=>toast.error('Some thing went wrong'));
    }
    const handleUpdate = ()=>{
        const id = myOwnTable2?.id;
        axios.post('/api/updateMyOwnTable',{myOwnTable,id}).then(()=>toast.success('Done')).catch(()=>toast.error('Some thing went wrong'));
    }

    return(
        <div>
                <div>
                   
                    {!myOwnTable2?.id && <button onClick={()=>handleAdd()}>Add My Table </button>}
                   { myOwnTable2?.id && <button onClick={()=>handleAdd()}>Update My Table </button>}
                </div>
        </div>
    )
}