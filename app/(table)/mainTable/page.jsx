import MainTable from '../../components/MainTableCompo';
import { getTableNow } from "../../actions/getStudent";
import myOwnTable from '../../actions/getMyOwnTable';


export default async function MainTableFunction(){
    const onlineT2 = await getTableNow() ; 
    const myOwnTable2 = await myOwnTable();
    const onlineFainal = onlineT2?.fainal;
    const myOwnTable3 = myOwnTable2[0]?.myOwnTable;
    return(

        <>
            <MainTable onlineT2={onlineT2} onlineFainal={onlineFainal} myOwnTable={myOwnTable3}/>

        </>
    )
}