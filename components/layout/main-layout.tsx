import { ReactNode } from "react"

export function MainLayout({ children }: { children: ReactNode }) {
  return <main className="page-container section-y">{children}</main>
}
