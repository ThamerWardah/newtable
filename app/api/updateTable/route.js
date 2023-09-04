import { NextResponse } from "next/server";
import prisma from '../../Libs/prismad';

export async function POST(request){

    const body = await request.json();
    const {table} = body;
    const Id = '64f636d0550fee5b24eeca6e';
    
    const tableUpdated = await prisma.table.update({
        where:{
            id:Id
        },
        data:{
            table:table,
            }
    });

    return NextResponse.json(tableUpdated)
}

