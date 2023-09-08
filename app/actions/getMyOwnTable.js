import {currentUser} from './getStudent';
import prisma from '../Libs/prismad';

export default async function myOwnTable(){
    const user =await currentUser();
    const userId = user?.id;

    const mytable = await prisma.myOwnTable.findMany({
        where:{
            studentId:userId,
        }
    });

    return mytable
}