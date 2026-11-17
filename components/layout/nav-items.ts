// The one public navigation list, shared by the header, mobile menu and
// footer. /learn is a personal tool and deliberately not listed here.
export const navItems = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/#projects" },
  { label: "Blog", href: "/blog" },
  { label: "Resume", href: "/resume", external: true },
] as const
