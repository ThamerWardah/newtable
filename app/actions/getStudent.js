import prisma from '../Libs/prismad';
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";


async function getTheSession(){
    return await getServerSession(authOptions);
}

export default async function currentUser(){

    const session = await getTheSession();
    if (!session?.user?.email){return null}

    const theCurrentUser = await prisma.student.findUnique({
        where:{
            email:session?.user?.email 
        },
        include:{finished:true}
    });

    return theCurrentUser
}