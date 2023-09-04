import onelineTable from "../../actions/onlineTable";
import MainTable from '../../components/MainTableCompo';


export default async function MainTableFunction(){
    const onlineT2 = await onelineTable() ;
    return(

        <>
            <MainTable onlineT2={onlineT2} />

        </>
    )
}