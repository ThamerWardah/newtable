import { NextResponse } from "next/server";
import prisma from '../../Libs/prismad';
import {currentUser} from "../../actions/getStudent";

export async function POST(request){
    const currentUserid= await currentUser();
    const body = await request.json();
    const {finishedArray} = body;
    const currentUserId = currentUserid?.id ;
    const finishedArray2 = "M000_"+ finishedArray;
    const finished = await prisma.finished.create({
        data:{
            finished:finishedArray2,
            studentId:currentUserId,
            addManualOpenItems:[],
        }
    });

    return NextResponse.json(finished)
}

