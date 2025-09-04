import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../assets/styles/global.sass';
import { Providers } from '@/providers';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Tasks app',
    description: 'created app for test core lab'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="PT-BR">
            <body className={inter.className}>
                <Providers>
                    <ToastContainer
                        autoClose={2100}
                        theme="colored"
                        hideProgressBar={false}
                        position={'top-right'}
                    />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
