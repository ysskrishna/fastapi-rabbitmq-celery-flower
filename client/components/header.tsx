import Link from "next/link"
import config from "@/common/config"
import { ModeToggle } from "./mode-toggle"

export default function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between py-4 px-4 pb-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-xl font-bold">
            {config?.productName}
          </Link>
          <Link
            href="/creator"
            className="text-sm font-medium hover:text-primary transition-colors md:text-base"
          >
            Creator
          </Link>
        </div>
        <div className="flex items-center">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
