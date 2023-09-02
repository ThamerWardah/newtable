import { NextResponse } from "next/server";
import prisma from '../../Libs/prismad';
import { finishedId } from "../../actions/finished";

export async function POST(request){
    const finishid= await finishedId();
    const body = await request.json();
    const {finishedArray} = body;
    const finishedArray2 = (finishedArray.length>0)? ("M000_"+ finishedArray):"M000";

    const finishUpdate = await prisma.finished.update({
        where:{
            id:finishid
        },
        data:{
            finished:finishedArray2,
            }
    });

    return NextResponse.json(finishUpdate)
}

