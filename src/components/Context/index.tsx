'use client'
import React, { ReactNode } from 'react'
import { ContextWrapper } from './styles'
import { Header, Footer } from '@/components'
import { useAppSelector } from '@/redux/store'

interface contextProps {
    children?: ReactNode,
    isHeader?: boolean,
    isFooter?: boolean
}

const Context = ({ children, isHeader, isFooter }: contextProps) => {

    const { isShow } = useAppSelector((state) => state.stateSlice)

    return (
        <ContextWrapper $isShow={isShow}>
            <Header />
            {children}
            <Footer />
        </ContextWrapper>
    )
}

export default Context
