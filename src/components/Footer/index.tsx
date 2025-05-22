'use client'

import React, { useCallback } from 'react'
import { FooterWrapper } from './styles'
import { Textarea, Button, Loading } from '@/components'
import { IoIosSend } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import {
    postAddMessageChat,
    postAddMessageChatBot,
    resetLoadingMessage, // ✅ reducer thủ công đã thêm
} from '@/redux/store/slices/messageSlice'
import { postAddConversation } from '@/redux/store/slices/conversationSlice'
import { handleEnterSend } from '@/redux/store/slices/stateSlice'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { Conversation, Message } from '@prisma/client'
import { useParams, useRouter } from 'next/navigation'
import { useClerk } from '@clerk/nextjs'
import { v4 as uuidv4 } from 'uuid'

const Footer = () => {
    const router = useRouter()
    const { user } = useClerk()
    const { code: rawCode } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const { inputSend } = useAppSelector(state => state.stateSlice)
    const { loadingMessage, error } = useAppSelector(state => state.messageChatsState)

    // Đảm bảo conversationCode luôn là string
    const conversationCode = Array.isArray(rawCode) ? rawCode[0] : rawCode ?? ''

    const createConversation = useCallback(async (): Promise<Conversation> => {
        const conversation = {
            userId: user?.id || '',
            code: uuidv4(),
            title: 'New Messages',
        } as Conversation
        await dispatch(postAddConversation(conversation))
        router.push(`/c/${conversation.code}`)
        return conversation
    }, [dispatch, router, user?.id])

    const handleSendMessage = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            if (!inputSend.trim()) {
                return
            }

            let conversation = null
            if (!conversationCode) {
                conversation = await createConversation()
            }

            const finalConversationCode = conversationCode || conversation?.code || ''

            const message = {
                userId: user?.id || '',
                content: inputSend.trim(),
                conversationCode: finalConversationCode,
                isbot: false,
                createdAt: new Date(),
            } as Message

            // Gửi message người dùng
            await dispatch(postAddMessageChat(message))
            dispatch(handleEnterSend(''))

            // Gửi message bot
            const botResult = await dispatch(postAddMessageChatBot(message))

            // Nếu bot gặp lỗi
            if (postAddMessageChatBot.rejected.match(botResult)) {
                const errorMessage = {
                    userId: user?.id || '',
                    content: botResult.error?.message || '⚠️ Bot gặp lỗi khi xử lý phản hồi.',
                    conversationCode: finalConversationCode,
                    isbot: true,
                    createdAt: new Date(),
                } as Message
                await dispatch(postAddMessageChat(errorMessage))
            }

            // ✅ Reset loadingMessage nếu cần
            dispatch(resetLoadingMessage())
        },
        [conversationCode, createConversation, dispatch, inputSend, user?.id, error]
    )

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            dispatch(handleEnterSend(e.target.value))
        },
        [dispatch]
    )

    const getCaret = (el: HTMLTextAreaElement) => {
        if (el.selectionStart !== undefined) {
            return el.selectionStart
        }
        return 0
    }

    const handleTextareaKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === 'Enter' && e.shiftKey) {
                e.preventDefault()
                const caret = getCaret(e.currentTarget)
                const content = inputSend
                dispatch(handleEnterSend(content.substring(0, caret) + '\n' + content.substring(caret)))
            } else if (e.key === 'Enter') {
                e.preventDefault()
                handleSendMessage(e as any)
            }
        },
        [dispatch, handleSendMessage, inputSend]
    )

    return (
        <FooterWrapper>
            <form onSubmit={handleSendMessage} className="footer-inner">
                <Textarea
                    disabled={loadingMessage}
                    onKeyDown={handleTextareaKeyDown}
                    onChange={handleInputChange}
                    value={inputSend}
                    placeholder="Message ChatGPT Demo..."
                    $outline="dark"
                    $isFull
                    rows={1}
                />
                <div className="footer-inner--btn">
                    {!loadingMessage ? (
                        <Button type="submit" $variant="system" $isSmall disabled={!inputSend.trim()}>
                            <IoIosSend size={25} />
                        </Button>
                    ) : (
                        <Loading color="light" isIcon />
                    )}
                </div>
            </form>
        </FooterWrapper>
    )
}

export default Footer
