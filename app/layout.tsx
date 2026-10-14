import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PORTAL DO EMPREGO | O próximo passo da sua carreira",
  description:
    "Encontre oportunidades, apresente seu perfil profissional e conecte-se a empresas em todo o Brasil.",
  applicationName: "PORTAL DO EMPREGO",
  robots: { index: true, follow: true }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
