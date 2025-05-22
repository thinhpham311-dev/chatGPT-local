'use client'
import React, { useState } from 'react'
import { Loading, DropDownMenu, Button, Input } from "@/components"
import { ConversationWrapper } from './styles'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { deleteRemoveConversation, putUpdateConversation } from '@/redux/store/slices/conversationSlice'
import { getMessageChatsListByConversationCode } from '@/redux/store/slices/messageSlice'
import { handleEnterSend, openInput, closeInput } from '@/redux/store/slices/stateSlice'
import { useDispatch } from 'react-redux'
import { useParams } from 'next/navigation'
import { Conversation, Message } from '@prisma/client'
import { useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { VscEllipsis } from "react-icons/vsc";
import { FaRegEdit } from "react-icons/fa";
import { IoChatboxOutline, IoSaveOutline } from "react-icons/io5";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import moment from 'moment'

const ConversationList = () => {
    const router = useRouter()
    const { code } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const { isShow, isShowInput } = useAppSelector((state) => state.stateSlice)
    const { conversations, loadingAction, loadingActionEdit, loadingList } = useAppSelector((state) => state.conversationsState)
    const [state, setState] = useState({
        id: NaN, title: ''
    });

    const onEditToggle = (id: number, title: string) => {
        dispatch(openInput())
        setState({ ...state, id, title });
    }

    const onLinkMessages = (code: string) => {
        dispatch(handleEnterSend(""))
        router.push(`/c/${code}`)
    }

    const handleChange = (e: any) => {
        setState({
            ...state, [e.target.name]: e.target.value,
            [`${e.target.name}Error`]: null
        });
    }
    const { title, id } = state;
    const handleSubmitFormEdit = () => {
        if (title === '') {
            setState({ ...state });
            return;
        }
        dispatch((putUpdateConversation({ title, id } as Conversation)));
        dispatch(closeInput());
    }

    return (
        <ConversationWrapper>
            <ul>
                {
                    !loadingList && !loadingAction ?
                        conversations?.map((item: Conversation) => {
                            let loadingEdit = item.id === id && item.title !== title && loadingActionEdit
                            return <li key={item.id} className={`conversation-item ${item.code === code ? "focused" : ""}`}>
                                {
                                    isShowInput && item.id === id ?
                                        <form onSubmit={handleSubmitFormEdit} className="conversation-item--input">
                                            <Input color="dark" name="title" value={title} onChange={handleChange} />
                                            <Button type="submit" $isSmall ><IoSaveOutline size={25} /></Button>
                                        </form>
                                        :
                                        <>
                                            <div className="conversation-item--title">
                                                <Button type="button" $isFull $isSmall onClick={() => onLinkMessages(item.code as string)}>
                                                    <IoChatboxOutline size={30} />
                                                    {!isShow && <div className="text">
                                                        <span className="tooltiptext" onDoubleClick={() => onEditToggle(item.id, item.title)}>{item.title}</span>
                                                        <small className="tooltiptext">{moment(item.createdAt?.toString()).format(process.env.NEXT_PUBLIC_DATE_TIME_FORMAT_MOMENT)}</small>
                                                    </div>
                                                    }
                                                </Button>
                                            </div>

                                            {!isShow && <div className="conversation-item--setting">
                                                {loadingEdit ? <Loading isIcon color="transparent" /> :

                                                    <DropDownMenu title={<VscEllipsis />} list={[
                                                        {
                                                            icon: <FaRegEdit />,
                                                            buttonText: "Rename",
                                                            isDialog: false,
                                                            func: () => {
                                                                onEditToggle(item.id, item.title)
                                                            }
                                                        },
                                                        {
                                                            icon: <MdDeleteOutline />,
                                                            buttonText: "Remove",
                                                            isDialog: true,
                                                            modalContent: "Do you want to delete this item?",
                                                            modalTitle: "Delete Conversation",
                                                            func: () => {
                                                                dispatch(deleteRemoveConversation({ code: item.code } as Conversation))
                                                                router.push("/chats")
                                                            }
                                                        }
                                                    ]} />
                                                }
                                            </div>
                                            }
                                        </>
                                }
                            </li>
                        }) : <Loading color="dark" isIcon={isShow} />
                }
            </ul>
        </ConversationWrapper>
    )
}

export default ConversationList
