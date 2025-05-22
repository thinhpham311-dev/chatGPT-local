import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs'
import { OpenAI } from 'openai'

const prisma = new PrismaClient()

export async function POST(request: Request) {
    try {
        const user = await currentUser()

        if (!user) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const { content, userId, conversationCode, apiKey } = await request.json()
        const openai = new OpenAI({ apiKey })

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content,
                },
            ],
            temperature: 0.7,
        })

        const contentBot = completion.choices[0]?.message?.content || 'Xin lỗi, tôi không có phản hồi phù hợp.'

        const saveMessage = await prisma.message.create({
            data: {
                content: contentBot,
                isbot: true,
                userId,
                conversationCode,
            },
        })

        return NextResponse.json({ data: saveMessage }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Lỗi server' }, { status: 500 })
    }
}
