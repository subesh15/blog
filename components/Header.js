import Link from "next/link"

export default function Header() {
    return (
        <header className="bg-blue-500">
            <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                <h1 className="text-2xl text-white text-center">Blog</h1>
                <nav className="space-x-4">
                    <Link href="/" className="text-white hover:underline">Home</Link>
                    <Link href="/about" className="text-white hover:underline">About</Link>
                    <Link href="/contact" className="text-white hover:underline">Contact</Link>
                </nav>
            </div>
        </header>
    )
}