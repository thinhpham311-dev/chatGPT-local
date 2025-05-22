'use client'
import React from 'react'
import { Loading } from "@/components"
import { SimpleLayoutWrapper } from './styles'
import { ClerkLoading, ClerkLoaded } from '@clerk/nextjs'


const SimpleLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <SimpleLayoutWrapper >
            <ClerkLoading>
                <Loading color="dark" />
            </ClerkLoading>
            <ClerkLoaded>
                {children}
            </ClerkLoaded>
        </SimpleLayoutWrapper>
    )
}

export default SimpleLayout


