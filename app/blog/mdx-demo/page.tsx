import { mdxComponents } from "@/components/mdx-components"

export default function MDXDemoPage() {
  const {
    h1,
    h2,
    h3,
    h4,
    p,
    code,
    pre,
    ul,
    ol,
    li,
    blockquote,
    a,
    table,
    tr,
    th,
    td,
    hr,
  } = mdxComponents

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-6 py-16">
        <div className="mb-12">
          <h1 className="text-5xl font-black">MDX Components Demo</h1>
          <p className="mt-4 text-xl text-muted-foreground">
            A showcase of all available MDX components
          </p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {/* Typography */}
          <h2>Typography</h2>
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
          <h4>Heading 4</h4>

          <p>
            This is a paragraph with <strong>bold text</strong>,{" "}
            <em>italic text</em>, and <a href="#">a link</a>. You can also use{" "}
            <code>inline code</code> within paragraphs.
          </p>

          <hr />

          {/* Lists */}
          <h2>Lists</h2>
          <h3>Unordered List</h3>
          <ul>
            <li>First item</li>
            <li>Second item</li>
            <li>
              Third item with nested list:
              <ul>
                <li>Nested item 1</li>
                <li>Nested item 2</li>
              </ul>
            </li>
          </ul>

          <h3>Ordered List</h3>
          <ol>
            <li>First step</li>
            <li>Second step</li>
            <li>Third step</li>
          </ol>

          <hr />

          {/* Blockquote */}
          <h2>Blockquote</h2>
          <blockquote>
            This is a blockquote. It&apos;s great for highlighting important
            information or quotes from other sources.
          </blockquote>

          <hr />

          {/* Code Blocks */}
          <h2>Code Blocks</h2>
          <p>
            Inline code: <code>const greeting = &ldquo;Hello World&ldquo;</code>
          </p>

          <h3>JavaScript</h3>
          <pre>
            <code className="language-javascript">{`function greet(name) {
  console.log(\`Hello, \${name}!\`)
}

greet("World")`}</code>
          </pre>

          <h3>TypeScript</h3>
          <pre>
            <code className="language-typescript">{`interface User {
  id: number
  name: string
  email: string
}

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com"
}`}</code>
          </pre>

          <h3>Bash</h3>
          <pre>
            <code className="language-bash">{`npm install next
npm run dev
npm run build`}</code>
          </pre>

          <hr />

          {/* Tables */}
          <h2>Tables</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Alice</td>
                <td>Developer</td>
                <td>Active</td>
              </tr>
              <tr>
                <td>Bob</td>
                <td>Designer</td>
                <td>Active</td>
              </tr>
              <tr>
                <td>Charlie</td>
                <td>Manager</td>
                <td>Away</td>
              </tr>
            </tbody>
          </table>

          <hr />

          {/* Images */}
          <h2>Images</h2>
          <p>Images would be rendered using the Next.js Image component:</p>
          <pre>
            <code>{`<Image 
  src="/example.jpg" 
  alt="Example" 
  width={800} 
  height={400} 
/>`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
