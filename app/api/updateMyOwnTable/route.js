import { NextResponse } from "next/server";
import prisma from '../../Libs/prismad';


export async function POST(request){
   
    const body = await request.json();
    const {myOwnTable , id} = body;
   
    const myOwnTableUdated = await prisma.myOwnTable.update({
        where:{
            id:id,
        },
        data:{
            myOwnTable:myOwnTable,
            }
    });

    return NextResponse.json(myOwnTableUdated)
}

