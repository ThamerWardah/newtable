import onelineTable from "../../actions/onlineTable";
import MainTable from '../../components/MainTableCompo';
import prisma from '../../Libs/prismad'


export default async function MainTableFunction(){

    const table = await prisma.table.findUnique({
        where:{
            id:'64f636d0550fee5b24eeca6e'
        }
    });

   /*  const onlineT2 = await onelineTable() ; */
   const onlineT2 = table
    return(

        <>
            <MainTable onlineT2={onlineT2} />

        </>
    )
}