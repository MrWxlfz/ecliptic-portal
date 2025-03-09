import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portal - Ecliptic",
  description: "Live exploit tracking and moderation system",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex">
        <aside className="w-64 h-screen bg-gray-900 p-5 text-white fixed">
          <h1 className="text-2xl font-bold mb-4">Ecliptic Portal</h1>
          <nav>
            <ul>
              <li className="py-2 px-4 hover:bg-gray-800">
                <a href="/dashboard">Dashboard</a>
              </li>
              <li className="py-2 px-4 hover:bg-gray-800">
                <a href="/dashboard/live-view">Live View</a>
              </li>
              <li className="py-2 px-4 hover:bg-gray-800">
                <a href="/dashboard/player-lookup">Player Lookup</a>
              </li>
              <li className="py-2 px-4 hover:bg-gray-800">
                <a href="/dashboard/game-logs">Game Logs</a>
              </li>
              <li className="py-2 px-4 hover:bg-gray-800">
                <a href="/dashboard/moderation">Moderation Panel</a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content (Fixes duplication issue) */}
        <main className="flex-1 ml-64 p-10">{children}</main>
      </body>
    </html>
  );
}
