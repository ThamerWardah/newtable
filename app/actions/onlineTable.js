import prisma from '../Libs/prismad';



export default async function onelineTable(){

   
    const table = await prisma.table.findUnique({
        where:{
            id:'64f50c1ec0e71964e19bc4ea'
        }
    });

    return table
}