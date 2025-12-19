import type { ReactNode } from "react"

type PageContainerProps = {
    children: ReactNode
}

export function PageContainer({ children }: PageContainerProps) {
    return(
        <div className="w-full px-6 md:pl-12 md:pr-60">
            {children}
        </div>
    )
}