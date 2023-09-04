import onelineTable from "../../actions/onlineTable";
import MainTable from '../../components/MainTableCompo';
import { onelineTable2 } from "../../actions/finished";


export default async function MainTableFunction(){
    const onlineT2 = await onelineTable2() ;
    return(

        <>
            <MainTable onlineT2={onlineT2} />

        </>
    )
}