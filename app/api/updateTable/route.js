import { NextResponse } from "next/server";
import prisma from '../../Libs/prismad';

export async function POST(request){

    const body = await request.json();
    const {table} = body;
    const Id = '64f50c1ec0e71964e19bc4ea';
    
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

