import prisma from '../../Libs/prismad';
import { NextResponse } from 'next/server';


export async function POST(request){


    const body = await request.json();
    const {table} = body ;

    const onlineTable = await prisma.table.create({
        data:{
            table,
          
        }
    })

    return NextResponse.json(onlineTable)

}