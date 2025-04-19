"use client"

import { ArrowLeft, Unlock } from "lucide-react"
import Link from "next/link"

export default function SecureContent() {
  return (
    <main className="flex min-h-screen flex-col items-center p-6 bg-gray-50">
      <div className="flex flex-col items-center mt-12 mb-10">
        <Unlock size={60} className="text-green-600" />
        <h1 className="text-2xl font-bold mt-5 text-gray-800 text-center">🔓 Welcome to Secure Content</h1>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <h2 className="text-lg font-bold text-green-600 mb-3">Authentication Successful</h2>
          <p className="text-gray-600 leading-relaxed">
            You have successfully authenticated and accessed the secure area of the application.
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Security Information</h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Your session is encrypted and secure</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>This area contains protected content</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Your PIN is never stored in plain text</span>
            </li>
          </ul>
        </div>
      </div>

      <Link
        href="/"
        className="flex items-center bg-gray-800 text-white px-6 py-3 rounded-full mt-10 hover:bg-gray-700 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        <span>Return to Lock Screen</span>
      </Link>
    </main>
  )
}
