import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pharma BM',
  description: 'Pharmacies de garde à Bordj Menaïel',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
