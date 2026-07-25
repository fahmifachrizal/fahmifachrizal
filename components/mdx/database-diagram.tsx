"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface Column {
    name: string
    type: string
    isPrimaryKey?: boolean
    isForeignKey?: boolean
    references?: string
}

interface Table {
    name: string
    columns: Column[]
}

interface Relationship {
    from: string
    to: string
    fromColumn: string
    toColumn: string
    type: "one-to-one" | "one-to-many" | "many-to-many"
}

interface DatabaseDiagramProps {
    tables: Table[]
    relationships?: Relationship[]
    className?: string
}

export function DatabaseDiagram({ tables, relationships = [], className }: DatabaseDiagramProps) {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const [svgContent, setSvgContent] = React.useState<string>("")

    React.useEffect(() => {
        const generateMermaidSyntax = () => {
            let syntax = "erDiagram\n"

            // Add tables
            tables.forEach((table) => {
                syntax += `  ${table.name} {\n`
                table.columns.forEach((col) => {
                    const type = col.type.replace(/\s+/g, '_')
                    const keyType = col.isPrimaryKey ? "PK" : col.isForeignKey ? "FK" : ""
                    const comment = keyType ? `"${keyType}"` : ""
                    syntax += `    ${type} ${col.name} ${comment}\n`
                })
                syntax += `  }\n`
            })

            // Add relationships
            relationships.forEach((rel) => {
                const from = rel.from
                const to = rel.to
                // Map relationship types to Mermaid syntax
                // one-to-one: |o--|| or ||--||
                // one-to-many: ||--o{
                // many-to-many: }o--o{

                let relSyntax = "||--o{" // Default to one-to-many

                if (rel.type === "one-to-one") relSyntax = "||--||"
                if (rel.type === "many-to-many") relSyntax = "}o--o{"

                const label = `"${rel.fromColumn} references ${rel.toColumn}"`
                syntax += `  ${from} ${relSyntax} ${to} : ${label}\n`
            })

            return syntax
        }

        const renderDiagram = async () => {
            if (!containerRef.current) return

            const { default: mermaid } = await import("mermaid")

            mermaid.initialize({
                startOnLoad: false,
                theme: "base",
                themeVariables: {
                    primaryColor: '#ffffff',
                    primaryTextColor: '#1d0b08',
                    lineColor: '#737373',
                    secondaryColor: '#f5f5f5',
                    tertiaryColor: '#ded7d5',
                },
                er: {
                    diagramPadding: 20,
                    layoutDirection: 'TB',
                    minEntityWidth: 200,
                    entityPadding: 15,
                    stroke: '#e5e5e5',
                    fill: '#ffffff',
                    fontSize: 14,
                }
            })

            const syntax = generateMermaidSyntax()
            const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`

            try {
                const { svg } = await mermaid.render(id, syntax)
                setSvgContent(svg)
            } catch (error) {
                console.error("Mermaid rendering failed:", error)
            }
        }

        renderDiagram()
    }, [tables, relationships])

    return (
        <div
            ref={containerRef}
            className={cn(
                "w-full overflow-x-auto rounded-lg border bg-card p-8 flex justify-center",
                className
            )}
            dangerouslySetInnerHTML={{ __html: svgContent }}
        />
    )
}

// Export a simplified wrapper for easier use in MDX
export function DBDiagram({
    children,
    ...props
}: {
    children?: React.ReactNode
} & Omit<DatabaseDiagramProps, 'tables'>) {
    // This is a placeholder - in real use, you'd parse children or pass tables directly
    return <DatabaseDiagram {...props} tables={[]} />
}