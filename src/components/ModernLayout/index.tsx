'use client'
import React from 'react'
import { Sidebar, Context, Loading } from "@/components"
import { ModernLayoutWrapper } from './styles'
import { ClerkLoading, ClerkLoaded } from '@clerk/nextjs'
import { useAppSelector } from '@/redux/store'

const ModernLayout = ({ children }: { children: React.ReactNode }) => {


    return (
        <ModernLayoutWrapper >

            <ClerkLoading>
                <Loading color="dark" />
            </ClerkLoading>

            <ClerkLoaded>
                <Sidebar />
                <Context >
                    {children}
                </Context>
            </ClerkLoaded>
        </ModernLayoutWrapper>
    )
}

export default ModernLayout


