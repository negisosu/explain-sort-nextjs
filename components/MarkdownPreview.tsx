"use client"

import MDEditor from "@uiw/react-md-editor"

type MarkdownPreviewProps = {
    source: string
}

export function MarkdownPreview({ source }: MarkdownPreviewProps) {
    return(
        <div data-color-mode="light">
            <MDEditor.Markdown
            source={source}
            />
        </div>
    )
}