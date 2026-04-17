"use client"

import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

const AuthLayout = ({children}: Props) => {
    return (
        <div className="flex w-screen min-h-screen">
            {children}
        </div>
    )
}

export default AuthLayout