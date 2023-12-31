import prisma from '../Libs/prismad';
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";


async function getTheSession(){
    return await getServerSession(authOptions);
};

async function getTableNow(){
    const session2 = await getServerSession(authOptions);
    const table = await prisma.table.findUnique({
        where:{
            id:'64fa283d2a8b7266319ec4ab' 
        }
    });

    return table 
}
   
const  currentUser= async()=>{
    const session = await getTheSession();
    if (!session?.user?.email){return null}

    const theCurrentUser = await prisma.student.findUnique({
        where:{
            email:session?.user?.email 
        },
        include:{finished:true,
        }
    });

    return theCurrentUser
};

export {currentUser , getTableNow}