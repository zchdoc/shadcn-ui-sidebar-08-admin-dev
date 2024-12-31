import type { Metadata } from 'next'
// import localFont from 'next/font/local'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { headers } from 'next/headers'

// const geistSans = localFont({
//   src: './fonts/GeistVF.woff',
//   variable: '--font-geist-sans',
//   weight: '100 900',
// })
// const geistMono = localFont({
//   src: './fonts/GeistMonoVF.woff',
//   variable: '--font-geist-mono',
//   weight: '100 900',
// })

const title = 'Z.ToolBox'

export const metadata: Metadata = {
  title: {
    default: title,
    template: '%s',
  },
  description: 'Generated by create next app',
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>🖐</text></svg>',
        type: 'image/svg+xml',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const headersList = headers()
  const host = headersList.get('host')
  const isDev = host?.startsWith('localhost') || host?.startsWith('127.0.0.1')
  const currentTitle = isDev ? `Dev-${title}` : title

  if (
    metadata.title &&
    typeof metadata.title === 'object' &&
    'default' in metadata.title
  ) {
    metadata.title.default = currentTitle
  }

  return (
    <html lang="en" suppressHydrationWarning>
      {/* className={`${geistSans.variable} ${geistMono.variable} antialiased`} */}
      <body className={'antialiased'}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
