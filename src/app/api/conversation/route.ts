import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { currentUser, auth } from '@clerk/nextjs';
const prisma = new PrismaClient()

export async function GET(request: Request) {
    const { userId } = auth();
    try {
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (request.method !== "GET") {
            return NextResponse.json({ message: "Method not allowed" }, { status: 405 })
        }
        const conversations = await prisma.conversation.findMany({
            where: { userId: userId },
            orderBy: { createdAt: 'desc' },
        })
        return NextResponse.json({ data: conversations }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const user = currentUser();
    try {
        const data = await request.json()
        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (request.method !== "POST") {
            return NextResponse.json({ message: "Method not allowed" }, { status: 405 })
        }

        const saveConversation = await prisma.conversation.create({
            data: {
                ...data
            }
        })
        return NextResponse.json({ data: saveConversation }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const user = currentUser();
    try {
        const data = await request.json()
        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (request.method !== "DELETE") {
            return NextResponse.json({ message: "Method not allowed" }, { status: 405 })
        }

        const removeMessage = await prisma.message.deleteMany({
            where: {
                conversationCode: data.code
            }
        })

        const removeConversation = await prisma.conversation.delete({
            where: {
                ...data
            }
        })

        return NextResponse.json({ data: { ...removeConversation, ...removeMessage } }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const user = currentUser();
    try {
        const data = await request.json()
        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (request.method !== "PUT") {
            return NextResponse.json({ message: "Method not allowed" }, { status: 405 })
        }

        const saveConversation = await prisma.conversation.update({
            where: {
                id: data.id,
            },
            data: {
                title: data.title,
                ...data
            }
        })
        return NextResponse.json({ data: saveConversation }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}