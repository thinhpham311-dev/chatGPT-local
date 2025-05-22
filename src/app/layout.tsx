import type { Metadata } from 'next'
import GlobalStyles from '@/styles/GlobalStyles'
import StyledComponentsRegistry from '@/lib/registry'
import { ClerkProvider } from '@clerk/nextjs'
import { AlertProvider } from "next-alert";
import { ReduxProvider } from "@/redux/provider"

export const metadata: Metadata = {
  title: 'ChatGPT',
  description: '',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <ClerkProvider >
            <AlertProvider>
              <ReduxProvider>
                <GlobalStyles />
                {children}
              </ReduxProvider>
            </AlertProvider>
          </ClerkProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
