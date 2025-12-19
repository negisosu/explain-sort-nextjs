"use server"

import { strapiFetch } from "@/lib/fetcher"
import { PageContentListResponse, postmanResponse } from "@/types/strapi-front"
import { Heading1 } from "./Heading1"
import { MarkdownPreview } from "./MarkdownPreview"
import { Heading2 } from "./Heading2"
import { SortBarsContainer } from "./SortBarsContainer"
import { TableOfContents, TocItem } from "./TableOfContents"
import { CodeBlock } from "./ai-elements/code-block"

export async function PageContents() {

	const { data } = await strapiFetch<PageContentListResponse>("/api/page-contents")

    const headings: TocItem[] = []

    return(
        <>
            <TableOfContents headings={headings}/>
            {data.map((content) => {
                const postmanResponse = content.postman_response as postmanResponse | undefined
                const explainText = "説明"
                const visualizationText = "可視化"
                const codeText = "実装"
                const titleId = `h1-${content.id}-${content.title}`
                const explainId = `h2-${content.id}-${explainText}`
                const visualizationId = `h2-${content.id}-${visualizationText}`
                const codeId = `h2-${content.id}-${codeText}`

                headings.push({
                    id: titleId,
                    text: content.title || "",
                    level: 1
                })
                headings.push({
                    id: explainId,
                    text: explainText,
                    level: 2
                })
                headings.push({
                    id: visualizationId,
                    text: visualizationText,
                    level: 2
                })
                headings.push({
                    id: codeId,
                    text: codeText,
                    level: 2
                })

                return(
                <div key={content.id}>
                    <Heading1 id={titleId}>{content.title}</Heading1>
                    <Heading2 id={explainId}>{explainText}</Heading2>
                    <MarkdownPreview source={content.body1 || ""}/>
                    {
                        content.api_endpoint && postmanResponse && (
                            <>
                                <Heading2 id={visualizationId}>{visualizationText}</Heading2>
                                <SortBarsContainer endpoint={content.api_endpoint} defaultArray={postmanResponse.initialArray} defaultSteps={postmanResponse.steps}/>
                            </>
                        )
                    }
                    <Heading2 id={codeId}>{codeText}</Heading2>
                    <CodeBlock code={content.code || ""} language="python"/>
                </div>
            )})}
        </>
    )
}