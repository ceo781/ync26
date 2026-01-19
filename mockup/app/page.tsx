import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-primary">
          Hyper-Connect
        </h1>
        <p className="text-gray-600 mb-8">하이엔드 차량 거래 플랫폼 목업</p>
        <Link
          href="/vehicles/new"
          className="inline-block px-6 py-3 bg-accent text-white rounded-lg hover:bg-blue-700 transition"
        >
          차량 등록하기 →
        </Link>
      </div>
    </div>
  );
}
