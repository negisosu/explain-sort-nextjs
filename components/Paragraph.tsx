import type { ReactNode } from "react"

type ParagraphProps = {
    children: ReactNode
}

export function Paragraph({ children }: ParagraphProps) {
    return(
        <p className="w-full sm:text-lg md:text-xl py-1">
            {children}
        </p>
    )
}