import Link from "next/link"
import { ModeToggle } from "./mode-toggle"

export default function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between py-4 px-4 pb-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold">
          TemplateHub
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/creator"
            className="text font-medium hover:text-primary transition-colors"
          >
            Creator
          </Link>

          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
