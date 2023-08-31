import { NextResponse } from "next/server";
import prisma from '../../Libs/prismad';
import currentUser from "../../actions/getStudent";

export async function POST(request){
    const currentUserid= await currentUser();
    const body = await request.json();
    const {finishedArray} = body;
    const currentUserId = currentUserid?.id

    const finished = await prisma.finished.create({
        data:{
            finished:finishedArray,
            studentId:currentUserId
        }
    });

    return NextResponse.json(finished)
}

