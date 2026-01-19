import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hyper-Connect - 차량 등록",
  description: "하이엔드 차량 등록 폼",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
