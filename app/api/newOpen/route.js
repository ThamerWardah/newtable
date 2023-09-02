import { NextResponse } from "next/server";
import prisma from '../../Libs/prismad';
import { finishedId } from "../../actions/finished";

export async function POST(request){
    const finishid= await finishedId();
    const body = await request.json();
    const openArray = body;
  

    const addManualOPenItem = await prisma.finished.update({
        where:{
            id:finishid
        },
        data:{
            addManualOpenItems:openArray,
            }
    });

    return NextResponse.json(addManualOPenItem)
}

