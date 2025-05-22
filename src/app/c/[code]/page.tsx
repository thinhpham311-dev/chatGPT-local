'use client'
import React, { useEffect, Suspense } from 'react'
import { ModernLayout, Loading } from "@/components"
import { useRouter, useParams } from 'next/navigation'
import { useAppSelector } from '@/redux/store'
import { Conversation } from '@prisma/client'
const MessageListComponent = React.lazy(() => import('@/components/MessageList'));

const MessageDetail = () => {
    const { id } = useParams()
    const router = useRouter()
    const { conversations } = useAppSelector((state) => state.conversationsState)

    useEffect(() => {
        const data: Conversation[] | undefined = conversations
        const conversation: any = data?.find((item) => item.code === id)

        if (conversation && conversation.code !== id) {
            router.push("/")
        }
    }, [conversations])


    return (
        <ModernLayout>
            <Suspense fallback={<Loading color="dark" />}>
                <MessageListComponent />
            </Suspense>
        </ModernLayout>
    )
}

export default MessageDetail


