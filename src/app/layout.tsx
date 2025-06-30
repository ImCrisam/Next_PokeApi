'use client'
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClientProviders } from "./_context/ClientProvider";

import ThemeRegistry from "./_theme/ThemeRegistry";
import "./globals.css";
import { Box, CssBaseline } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX;

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>

              <style>{`
        @font-face {
          font-family: 'Pokemon Solid';
          src: url('${assetPrefix}/fonts/Pokemon Solid.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
        }
        @font-face {
          font-family: 'Pokemon Hollow';
          src: url('${assetPrefix}/fonts/Pokemon Hollow.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
        }
        body {
          background-image: image-set(
            url('${assetPrefix}/bg/bg_avif.avif') type('image/avif'),
            url('${assetPrefix}/bg/bg_jpg.jpg') type('image/jpeg')
          );
        }
      `}</style>
        <ClientProviders>
          <ThemeRegistry>
            <CssBaseline />
            <ThemeInfo>
            {children}
            </ThemeInfo>
            </ThemeRegistry>
        </ClientProviders>
      </body>
    </html>
  );
}


// Small component that uses the theme context

function ThemeInfo({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX;

  useEffect(() => {
    const body = document.body;
    if (theme.palette.mode === "dark") {
      body.style.backgroundImage = `
        image-set(
          url('${assetPrefix}/bg/bg_dark_jpg.jpg') type('image/jpeg')
        )
      `;
    } else {
      body.style.backgroundImage = `
        image-set(
          url('${assetPrefix}/bg/bg_avif.avif') type('image/avif'),
          url('${assetPrefix}/bg/bg_jpg.jpg') type('image/jpeg')
        )
      `;
    }
    return () => {
      body.style.backgroundImage = "";
    };
  }, [theme.palette.mode, assetPrefix]);

  return (
    <Box>
      {children}
    </Box>
  );
}
