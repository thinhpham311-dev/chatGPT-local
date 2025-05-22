'use client'
import React, { useEffect, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Loading } from '@/components'
import { SidebarWrapper } from './styles'
import { IoMdAdd } from "react-icons/io";
import { SiPreact } from "react-icons/si";
import { CiLogout } from "react-icons/ci";
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { getConversationsList, postAddConversation } from '@/redux/store/slices/conversationSlice'
import { Conversation } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import { useClerk, useUser } from "@clerk/nextjs";

const ConversationListComponent = React.lazy(() => import('@/components/ConversationList'));

const Sidebar = () => {
    const { signOut } = useClerk()
    const { user, isLoaded } = useUser()
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const { isShow } = useAppSelector((state) => state.stateSlice)
    const { loadingAction } = useAppSelector((state) => state.conversationsState)

    useEffect(() => {
        dispatch(getConversationsList())
    }, [dispatch])

    const onCreateConversation = () => {
        const conversation = {
            userId: user?.id,
            code: uuidv4(),
            title: "New Messages",
        } as Conversation
        dispatch(postAddConversation(conversation))
        router.push(`/c/${conversation.code}`)
    }

    return (
        <SidebarWrapper $isShow={isShow} >
            <div className="header-sidebar">
                <div className="header-sidebar--logo" onClick={() => router.push("/chats")}><SiPreact size={30} /><span className="tooltiptext">New Chat</span></div>
                <div className="header-sidebar--control">
                    {!loadingAction ? <Button type='button' $isSmall onClick={onCreateConversation}><IoMdAdd size={25} /> </Button> : <Loading color="dark" isIcon />}
                </div>
            </div>
            <Suspense fallback={<Loading color="dark" />}>
                <ConversationListComponent />
            </Suspense>
            <div className="footer-sidebar">
                <ul>
                    <li>
                        <div className="footer-sidebar-profile">
                            <div className="footer-sidebar-profile--avatar">
                                {user && isLoaded && <img src={user?.imageUrl} alt={user?.firstName as string} />}
                            </div>
                            <div className="footer-sidebar-profile--info">
                                {user && isLoaded ? <>
                                    <p className="tooltiptext"><strong>{user?.fullName}</strong></p>
                                    <small className="tooltiptext">{user?.primaryEmailAddress?.emailAddress}</small>
                                </> : <Loading color="dark" />}
                            </div>
                        </div>
                    </li>
                    {/* <li>  <Button type='button' $isSmall $isFull ><IoSave size={25} /><span className="tooltiptext">Saved</span></Button></li> */}
                    {/* <li>  <Button type='button' $isSmall $isFull ><IoRocket size={25} /><span className="tooltiptext">Update to Pro</span></Button></li> */}
                    <li>  <Button type='button' $isSmall $isFull onClick={() => signOut(() => router.push("/"))}><CiLogout size={25} /><span className="tooltiptext">Logout</span></Button></li>
                </ul>
            </div>

        </SidebarWrapper>
    )
}

export default Sidebar
