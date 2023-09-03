import prisma from '../../Libs/prismad';
import { NextResponse } from 'next/server';
import currentUser from "../../actions/getStudent";


export async function POST(request){
    const currentUserid= await currentUser();
    const currentUserId = currentUserid?.id ;

    const body = await request.json();
    const {table} = body ;

    const onlineTable = await prisma.table.create({
        data:{
            table,
            studentId:currentUserId,
        }
    })

    return NextResponse.json(onlineTable)

}