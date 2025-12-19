import type { ReactNode } from "react"

type Heading1Props = {
    children: ReactNode
    id: string
}

export function Heading1({ children, id }: Heading1Props) {
    return(
        <h1 id={id} className="w-full text-2xl md:text-4xl font-bold py-4 md:py-6">
            {children}
        </h1>
    )
}