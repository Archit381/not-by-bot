import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import './global.css';
import {DM_Sans} from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="bg-red-500">{children}</body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
