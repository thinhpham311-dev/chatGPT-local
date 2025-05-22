'use client'
import React, { useEffect, memo } from 'react'
import { Loading } from "@/components"
import { SiPreact } from "react-icons/si";
import { CardWrapper } from './styles'
import { Message } from '@prisma/client';
import { useUser, } from '@clerk/nextjs'
import moment from 'moment'

interface cardProps {
    isBot?: Boolean,
    message: Message,
}

const Card = ({ isBot, message }: cardProps) => {
    const { user, isLoaded } = useUser()
    const { content, createdAt } = message


    return (
        <CardWrapper>
            <div className="card-inner">
                <div className="card-inner--image">
                    {!isBot ? user && isLoaded && <img className="card-inner--image-user" src={user?.imageUrl} alt={user?.firstName as string} /> : <div className="card-inner--image-bot"><SiPreact size={40} /></div>}
                </div>

                <div className="card-inner--content">
                    <p>
                        {user && isLoaded ? <span className="card-inner--content--title">{isBot ? "Bot" : user?.fullName}</span> : <span>You logouted you account</span>}
                        {!isBot && <small className="card-inner--content--timeline"> - {moment(createdAt.toString()).format(process.env.NEXT_PUBLIC_DATE_TIME_FORMAT_MOMENT)}</small>}
                    </p>
                    <div dangerouslySetInnerHTML={{ __html: content } as any}></div>
                </div>
            </div>
        </CardWrapper>
    )
}

export default memo(Card)
