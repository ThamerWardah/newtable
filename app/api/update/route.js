import { NextResponse } from "next/server";
import prisma from '../../Libs/prismad';
import { finishedId } from "../../actions/finished";

export async function POST(request){
    const finishid= await finishedId();
    const body = await request.json();
    const {finishedArray} = body;
  

    const finishUpdate = await prisma.finished.update({
        where:{
            id:finishid
        },
        data:{
            finished:finishedArray,
            }
    });

    return NextResponse.json(finishUpdate)
}

