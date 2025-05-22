import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
const prisma = new PrismaClient()

export async function GET(request: Request, { params }: { params: { code: string } }) {
    const { userId } = auth()
    const code = params.code

    try {
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (request.method !== "GET") {
            return NextResponse.json({ message: "Method not allowed" }, { status: 405 })
        }
        const messageList = await prisma.message.findMany({
            where: { conversationCode: code, userId: userId },
            orderBy: { createdAt: 'asc' }
        })

        return NextResponse.json({ data: messageList }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}