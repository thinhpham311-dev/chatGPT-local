'use client'
import { SignUp } from "@clerk/nextjs"
import { SimpleLayout } from "@/components"

const SignUpPage = () => {

    return (
        <SimpleLayout>
            <SignUp />
        </SimpleLayout>
    )
}

export default SignUpPage
