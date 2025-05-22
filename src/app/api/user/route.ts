import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { clerkClient, auth } from '@clerk/nextjs';

const prisma = new PrismaClient()
export async function POST(request: Request) {
    const { userId } = auth();
    try {
        const data = await request.json()
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (request.method !== "POST") {
            return NextResponse.json({ message: "Method not allowed" }, { status: 405 })
        }
        const users = await clerkClient.users.getUserList();
        const user = users?.find((item) => item.id !== data.userId && item?.firstName === data.firstName && item?.lastName === data.lastName)
        const removeMessage = await prisma.message.deleteMany({
            where: {
                userId: user?.id
            }
        })

        const removeConversation = await prisma.conversation.deleteMany({
            where: {
                userId: user?.id
            }
        })
        return NextResponse.json({ ...removeMessage, ...removeConversation }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}