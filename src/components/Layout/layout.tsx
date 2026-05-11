import { Outlet } from 'react-router-dom'
import { Navbar } from '../Navbar/navbar'
import { Footer } from '../Footer/footer'

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 px-6 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}