'use client'
import React, { useState } from 'react'
import { HeaderWrapper } from './styles'
import { Button } from "@/components"
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/redux/store'
import { AppDispatch } from '@/redux/store'
import { toggleLayout } from '@/redux/store/slices/stateSlice'
import ApiKeyDialog from '../ApiKeyDialog'


const Header = () => {
    const dispatch = useDispatch<AppDispatch>()
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const [apiKey, setApiKey] = useState('')

    const { isShow, isShowInput } = useAppSelector(state => state.stateSlice)

    const handleToggle = () => {
        dispatch(toggleLayout());
    }


    const handleSave = (key: string) => {
        setApiKey(key)
        setIsDialogOpen(false)
        // Bạn có thể lưu key vào localStorage hoặc cookie ở đây
    }


    return (
        <HeaderWrapper>
            {!isShowInput && <Button type="button" $isSmall onClick={handleToggle}>{isShow ? <AiOutlineMenuUnfold size={25} /> : <AiOutlineMenuFold size={25} />}</Button>}
            <Button
                $isSmall
                $outline='dark'
                onClick={() => setIsDialogOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
                Nhập hoặc đổi API Key
            </Button>

            <ApiKeyDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSave={handleSave}
            />

        </HeaderWrapper>
    )
}

export default Header
