"use client"

import { useEffect, useState } from "react"
import { cn } from "../lib/utils"

export interface TocItem {
id: string
text: string
level: 1 | 2 | 3
}

type TableOfContentProps = {
    headings: TocItem[]
}

export function TableOfContents({ headings }: TableOfContentProps) {
const [activeId, setActiveId] = useState<string>("")
const [isVisible, setIsVisible] = useState(false)

useEffect(() => {
    let intersectionObserver: IntersectionObserver | null = null
    const observedElements: Element[] = []

    // 各見出し要素を監視
    const elements = headings
        .map((heading) => document.getElementById(heading.id))
        .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    // IntersectionObserverでスクロール位置を監視
    intersectionObserver = new IntersectionObserver(
        (entries) => {
            // 画面内に入っている見出しを探す
            const visibleEntries = entries.filter((entry) => entry.isIntersecting)
            
            if (visibleEntries.length > 0) {
                // 最も上に近い見出しをアクティブにする
                const topEntry = visibleEntries.reduce((prev, current) => {
                    return current.boundingClientRect.top < prev.boundingClientRect.top
                        ? current
                        : prev
                })
                setActiveId(topEntry.target.id)
            }
        },
        {
            rootMargin: "0px 0px -80% 0px",
        }
    )

    elements.forEach((element) => {
        intersectionObserver?.observe(element)
        observedElements.push(element)
    })

    return () => {
        if (intersectionObserver && observedElements.length) {
            observedElements.forEach((el) => intersectionObserver?.unobserve(el))
        }
    }
}, [headings])

const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
    element.scrollIntoView({
        behavior: "smooth",
        block: "start",
    })
    }
}

if (headings.length === 0) return null

return (
    <div className="hidden md:block">
        <div className=" fixed top-0 right-0 z-40 h-screen flex items-center justify-center">
            <div className={cn(
                "duration-300",
                isVisible ? "opacity-0" : "opacity-100"
            )}>
                <div className="mr-8">
                    {headings.map((heading, i) => (
                        <div key={i} className={cn(
                            "w-10 h-1 my-2 rounded-lg bg-neutral-200",
                            heading.level == 2 && "mx-3 w-7",
                            heading.level == 3 && "mx-6 w-4",
                            activeId === heading.id && "bg-neutral-800"
                        )}>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div
        className="fixed top-0 right-0 z-50 h-screen flex items-center justify-center"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        >
            <div
                className={cn(
                "transition-all duration-300 ease-in-out",
                isVisible ? "translate-x-0" : "translate-x-full",
                )}
            >
                <nav className="mr-2 bg-white shadow-lg px-6 py-8 w-56 rounded-lg border border-neutral-200 overflow-y-auto max-h-[60vh] ">
                <div className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">目次</div>
                <ul className="space-y-2">
                    {headings.map((heading, i) => (
                    <li key={i} className={cn(
                        heading.level === 2 && "ml-4",
                        heading.level === 3 && "ml-8"
                    )}>
                        <div
                        onClick={() => handleClick(heading.id)}
                        className={cn(
                            "text-left w-full text-sm transition-colors duration-200 p-2 rounded-lg hover:bg-neutral-50",
                            activeId === heading.id && "bg-neutral-100",
                        )}
                        >
                        {heading.text}
                        </div>
                    </li>
                    ))}
                </ul>
                </nav>
            </div>
        </div>
    </div>
)
}
