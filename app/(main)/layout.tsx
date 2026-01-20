import './blog/[slug]/blog.css'

import { Analytics } from '@vercel/analytics/react'

import { Footer } from '~/app/(main)/Footer'
import { Header } from '~/app/(main)/Header'
import { QueryProvider } from '~/app/QueryProvider'


export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="bg-[url('/background.webp')] dark:bg-[url('/background.webp')] pointer-events-none fixed inset-0 select-none bg-cover bg-center  bg-no-repeat " />
      <span className="pointer-events-none fixed top-0 block h-[800px] w-full select-none bg-[radial-gradient(103.72%_46.58%_at_50%_0%,rgba(5,5,5,0.045)_0%,rgba(0,0,0,0)_100%)] dark:bg-[radial-gradient(103.72%_46.58%_at_50%_0%,rgba(255,255,255,0.09)_0%,rgba(255,255,255,0)_100%)]" />

      <div className="fixed inset-0 flex justify-center ">
        <div className="flex w-full ">
          <div className="w-full bg-zinc-50/60 ring-1 ring-zinc-100 backdrop-blur-lg dark:bg-zinc-900/60 dark:ring-zinc-400/20 sm:px-8 lg:px-8" />
        </div>
      </div>

      <QueryProvider>
        <div className="relative text-zinc-800 dark:text-zinc-200">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </QueryProvider>

      <Analytics />
      {/* <ThreeScene /> */}
    </>
  )
}
