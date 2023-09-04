import prisma from '../Libs/prismad';


export default async function onelineTable(){

   
    const table = await prisma.table.findUnique({
        where:{
            id:'64f636d0550fee5b24eeca6e'
        }
    });

    return table 
};

