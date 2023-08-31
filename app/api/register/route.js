import prisma from '../../Libs/prismad';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt'


export async function POST(request){

    const body = await request.json();
    const {name, email, password, department } = body ;

    if(!name || !email || !password){throw new Error('Missing data')}
    
    const existed = await prisma.student.findUnique({
        where:{
            email
        }
    })
       
    if(existed){throw new Error('Email is already taken')}
    const hashedPassword = await bcrypt.hash(password,12);
    const student = await prisma.student.create({
        data:{
            name,
            email,
            password:hashedPassword,
            department
        }
    })

    return NextResponse.json(student)

}