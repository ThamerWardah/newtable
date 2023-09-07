import { NextResponse } from "next/server";
import prisma from '../../Libs/prismad';

export async function POST(request){

    const body = await request.json();
    const {table,fainal} = body;
    const Id = '64fa283d2a8b7266319ec4ab';
    
    const tableUpdated = await prisma.table.update({
        where:{
            id:Id
        },
        data:{
            table:table,
            fainal:fainal
            }
    });

    return NextResponse.json(tableUpdated)
}

