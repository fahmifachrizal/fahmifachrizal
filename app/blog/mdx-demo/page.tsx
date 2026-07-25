import { mdxComponents } from "@/components/mdx-components"
import { TopNavbar } from "@/components/layout/top-navbar"
import { MainLayout } from "@/components/layout/main-layout"

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
    Callout,
  } = mdxComponents

  return (
    <>
      <TopNavbar />
      <MainLayout>
        <div className="py-12 md:py-16">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-black sm:text-5xl">
              MDX Components Demo
            </h1>
            <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
              A showcase of all available MDX components and styles
            </p>
          </div>

          <div className="prose prose-neutral prose-sm sm:prose-base mx-auto max-w-3xl">
            {/* Typography */}
            <h2>Typography</h2>
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>

            <p>
              This is a paragraph with <strong>bold text</strong>,{" "}
              <em>italic text</em>, and <a href="#">a link</a>. You can also
              use <code>inline code</code> within paragraphs.
            </p>

            <hr />

            {/* Callouts */}
            <h2>Callout Components</h2>
            
            <Callout type="info">
              <p className="font-semibold">Information</p>
              <p>This is an informational callout. Use it to highlight important information or tips.</p>
            </Callout>

            <Callout type="success">
              <p className="font-semibold">Success</p>
              <p>This is a success callout. Use it to show positive outcomes or confirmations.</p>
            </Callout>

            <Callout type="warning">
              <p className="font-semibold">Warning</p>
              <p>This is a warning callout. Use it to alert users about potential issues.</p>
            </Callout>

            <Callout type="danger">
              <p className="font-semibold">Danger</p>
              <p>This is a danger callout. Use it for critical warnings or errors.</p>
            </Callout>

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
              <br />
              <br />
              — Author Name
            </blockquote>

            <hr />

            {/* Code Blocks */}
            <h2>Code Blocks</h2>
            <p>
              Inline code: <code>const greeting = &quot;Hello World&quot;</code>
            </p>

            <h3>JavaScript</h3>
            <pre>
              <code className="language-javascript">{`function greet(name) {
  console.log(\`Hello, \${name}!\`)
  return \`Welcome, \${name}\`
}

const result = greet("World")
console.log(result)`}</code>
            </pre>

            <h3>TypeScript</h3>
            <pre>
              <code className="language-typescript">{`interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user' | 'guest'
}

function createUser(data: Omit<User, 'id'>): User {
  return {
    id: Math.random(),
    ...data
  }
}

const user: User = createUser({
  name: "John Doe",
  email: "john@example.com",
  role: "user"
})`}</code>
            </pre>

            <h3>Bash</h3>
            <pre>
              <code className="language-bash">{`# Install dependencies
npm install next react react-dom

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start`}</code>
            </pre>

            <hr />

            {/* Tables */}
            <h2>Tables</h2>
            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Supported</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Markdown</td>
                  <td>✅ Yes</td>
                  <td>Full support</td>
                </tr>
                <tr>
                  <td>JSX Components</td>
                  <td>✅ Yes</td>
                  <td>React components</td>
                </tr>
                <tr>
                  <td>TypeScript</td>
                  <td>✅ Yes</td>
                  <td>Type-safe content</td>
                </tr>
                <tr>
                  <td>Syntax Highlighting</td>
                  <td>✅ Yes</td>
                  <td>Multiple languages</td>
                </tr>
              </tbody>
            </table>

            <hr />

            {/* Complex Example */}
            <h2>Complex Example</h2>
            <p>
              Here&apos;s how different elements work together in a real
              scenario:
            </p>

            <Callout type="info">
              <p className="font-semibold">Getting Started</p>
              <p>
                Follow these steps to set up your development environment. Make
                sure you have Node.js installed before proceeding.
              </p>
            </Callout>

            <h3>Installation Steps</h3>
            <ol>
              <li>
                Install the required packages:
                <pre>
                  <code className="language-bash">npm install</code>
                </pre>
              </li>
              <li>
                Create a configuration file:
                <pre>
                  <code className="language-typescript">{`// config.ts
export const config = {
  apiUrl: process.env.API_URL,
  environment: process.env.NODE_ENV
}`}</code>
                </pre>
              </li>
              <li>
                Start the development server:
                <pre>
                  <code className="language-bash">npm run dev</code>
                </pre>
              </li>
            </ol>

            <Callout type="success">
              <p className="font-semibold">Success!</p>
              <p>
                Your development environment is now ready. Visit{" "}
                <code>http://localhost:3000</code> to see your application.
              </p>
            </Callout>

            <h3>Common Issues</h3>
            <table>
              <thead>
                <tr>
                  <th>Issue</th>
                  <th>Solution</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Port already in use</td>
                  <td>
                    Use <code>PORT=3001 npm run dev</code>
                  </td>
                </tr>
                <tr>
                  <td>Module not found</td>
                  <td>
                    Run <code>npm install</code>
                  </td>
                </tr>
                <tr>
                  <td>Build fails</td>
                  <td>
                    Clear cache with <code>rm -rf .next</code>
                  </td>
                </tr>
              </tbody>
            </table>

            <Callout type="warning">
              <p className="font-semibold">Important Note</p>
              <p>
                Always commit your changes before running major updates. Use{" "}
                <code>git commit -am &quot;Your message&quot;</code> to save
                your work.
              </p>
            </Callout>

            <hr />

            <h2>Best Practices</h2>
            <blockquote>
              Write code that is easy to read, easy to maintain, and easy to
              test. The best code is no code at all, but when you must write
              code, make it count.
            </blockquote>

            <ul>
              <li>
                <strong>Keep it simple:</strong> Avoid unnecessary complexity
              </li>
              <li>
                <strong>Document your code:</strong> Write clear comments and
                documentation
              </li>
              <li>
                <strong>Test thoroughly:</strong> Write tests for critical
                functionality
              </li>
              <li>
                <strong>Follow conventions:</strong> Stick to established coding
                standards
              </li>
            </ul>

            <hr />

            <h2>Conclusion</h2>
            <p>
              These are all the components available in your MDX setup. You can
              use them to create rich, interactive content that combines the
              simplicity of Markdown with the power of React.
            </p>

            <Callout type="info">
              <p className="font-semibold">Learn More</p>
              <p>
                Check out the <a href="/blog">blog</a> for more examples and
                tutorials on using these components effectively.
              </p>
            </Callout>
          </div>
        </div>
      </MainLayout>
    </>
  )
}