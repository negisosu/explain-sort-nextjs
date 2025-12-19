import type { ReactNode } from "react"

type Heading2Props = {
    children: ReactNode
    id: string
}

export function Heading2({ children, id }: Heading2Props) {
    return(
        <h2 id={id} className="w-full text-xl md:text-2xl font-semibold py-2 md:py-4">
            {children}
        </h2>
    )
}