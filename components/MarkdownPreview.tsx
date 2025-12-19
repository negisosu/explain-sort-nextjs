"use client"

import MDEditor from "@uiw/react-md-editor"

type MarkdownPreviewProps = {
    source: string
}

export function MarkdownPreview({ source }: MarkdownPreviewProps) {
    return(
        <>
            <MDEditor.Markdown
            source={source}
            />
        </>
    )
}