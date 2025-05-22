'use client'
import { SignIn } from "@clerk/nextjs"
import { SimpleLayout } from "@/components"

const SignInPage = () => {

    return (
        <SimpleLayout>
            <SignIn />
        </SimpleLayout>
    )
}

export default SignInPage
