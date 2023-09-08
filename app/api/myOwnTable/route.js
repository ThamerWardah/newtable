import { NextResponse } from "next/server";
import prisma from '../../Libs/prismad';
import {currentUser} from "../../actions/getStudent";

export async function POST(request){
    const currentUserid= await currentUser();
    const body = await request.json();

    const {myOwnTable} = body;
    const currentUserId = currentUserid?.id ;
    const myTable = await prisma.myOwnTable.create({
        data:{
            myOwnTable:myOwnTable,
            studentId:currentUserId,
        }
    });

    return NextResponse.json(myTable)
}
