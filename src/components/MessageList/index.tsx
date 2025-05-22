'use client'

import React, { useEffect, useRef } from 'react'
import { Loading, Card } from "@/components"
import { MessageListWrapper } from './styles'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { getMessageChatsListByConversationCode } from '@/redux/store/slices/messageSlice'
import { useDispatch } from 'react-redux'
import { useParams } from 'next/navigation'
import { Message } from '@prisma/client'
import { useClerk } from '@clerk/nextjs'

const MessageList = () => {
    const msgEndRef = useRef<HTMLLIElement>(null)
    const { user } = useClerk()
    const { code: conversationCode } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const { messageChats, loadingMessage } = useAppSelector(state => state.messageChatsState)

    // Fetch message list on load or code change
    useEffect(() => {
        if (conversationCode) {
            dispatch(getMessageChatsListByConversationCode({ conversationCode } as Message))
        }
    }, [conversationCode, dispatch])

    // Auto scroll to bottom on new messages
    useEffect(() => {
        msgEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messageChats])

    return (
        <MessageListWrapper>
            <div className="messageList-inner">
                <ul className="messageList-inner--content">
                    {messageChats?.map(item => {
                        const isUserOrBotMessage =
                            item.conversationCode === conversationCode &&
                            (item.userId === user?.id || item.isbot)

                        if (!isUserOrBotMessage) {
                            return null
                        }

                        // Optional: handle bot error messages if item.id === -1
                        if (item.id === -1) {
                            return (
                                <li key={`bot-error-${Date.now()}`} className="bot-error">

                                    <div className="bot-error-msg">{item.content}</div>
                                </li>
                            )
                        }

                        return (
                            <li key={item.id}>
                                <Card message={item} isBot={item.isbot} />
                            </li>
                        )
                    })}

                    {loadingMessage && (
                        <li className="messageList-inner--content--loading" ref={msgEndRef}>
                            <Loading color="light" />
                        </li>
                    )}
                </ul>
            </div>
        </MessageListWrapper>
    )
}

export default MessageList
