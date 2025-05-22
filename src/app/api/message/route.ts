import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs';
const prisma = new PrismaClient()


export async function POST(request: Request) {
    const user = currentUser();
    try {
        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const data = await request.json()

        if (request.method !== "POST") {
            return NextResponse.json({ message: "Method not allowed" }, { status: 405 })
        }

        const saveMessage = await prisma.message.create({
            data: {
                ...data,
            }
        })
        return NextResponse.json({ data: saveMessage }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

