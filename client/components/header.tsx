import Link from "next/link"
import { ModeToggle } from "./mode-toggle"

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          Template Manager
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex">
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="hover:text-primary">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
