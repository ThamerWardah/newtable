import prisma from '../../Libs/prismad';
import { NextResponse } from 'next/server';


export async function POST(request){


    const body = await request.json();
    const {table ,fainalExam} = body ;
    const fainalExam2 =[[],[]]
    const onlineTable = await prisma.table.create({
        data:{
            table,
            fainal:fainalExam2,
        }
    })

    return NextResponse.json(onlineTable)

}