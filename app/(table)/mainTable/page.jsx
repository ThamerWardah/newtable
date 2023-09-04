import onelineTable from "../../actions/onlineTable";
import MainTable from '../../components/MainTableCompo';
import { getTableNow } from "../../actions/getStudent";


export default async function MainTableFunction(){
    const onlineT2 = await getTableNow() ; //onlineTable()
    return(

        <>
            <MainTable onlineT2={onlineT2} />

        </>
    )
}