"use client";

import React, { useState } from "react";

export default function Step5Media() {
  const [imageCount, setImageCount] = useState(5);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Step 5: 미디어 업로드
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        최소 20장의 이미지를 업로드하세요
      </p>

      {/* 이미지 업로드 */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
          <span className="mr-2">📸</span>
          이미지 (최소 20장 필수) *
        </h3>

        <div className="border-2 border-dashed border-accent rounded-lg p-12 text-center bg-blue-50 hover:bg-blue-100 transition cursor-pointer">
          <div className="text-4xl mb-4">🖼️</div>
          <p className="text-gray-700 font-medium mb-2">
            드래그 앤 드롭하여 이미지 업로드
          </p>
          <p className="text-sm text-gray-500 mb-4">
            또는 클릭하여 파일 선택
          </p>
          <p className="text-xs text-gray-400">
            JPG, PNG, WebP (각 최대 10MB)
          </p>
          <input type="file" multiple accept="image/*" className="hidden" />
        </div>

        <div
          className={`mt-4 text-sm font-medium ${
            imageCount >= 20 ? "text-green-600" : "text-red-600"
          }`}
        >
          업로드된 이미지: {imageCount} / 최소 20장 필요
        </div>

        {/* 업로드된 이미지 미리보기 (목업) */}
        {imageCount > 0 && (
          <div className="mt-4">
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: imageCount }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-square bg-gray-200 rounded border border-gray-300 flex items-center justify-center relative group"
                >
                  <span className="text-gray-400 text-sm">이미지 {index + 1}</span>
                  <button className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition">
                    ×
                  </button>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              💡 Tip: 드래그하여 순서 변경 가능
            </p>
          </div>
        )}
      </div>

      {/* 영상 업로드 (선택) */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
          <span className="mr-2">🎥</span>
          영상 (선택)
        </h3>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <div className="text-3xl mb-2">📹</div>
          <p className="text-gray-600 text-sm mb-2">
            4K 영상 업로드 (최대 500MB)
          </p>
          <p className="text-xs text-gray-400">
            MP4, MOV 형식
          </p>
          <input type="file" accept="video/*" className="hidden" />
        </div>
      </div>

      {/* 엔진 사운드 (선택) */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
          <span className="mr-2">🔊</span>
          엔진 사운드 (선택)
        </h3>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <div className="text-3xl mb-2">🎵</div>
          <p className="text-gray-600 text-sm mb-2">
            엔진 사운드 클립 업로드 (최대 20MB)
          </p>
          <p className="text-xs text-gray-400">
            MP3, WAV 형식
          </p>
          <input type="file" accept="audio/*" className="hidden" />
        </div>
      </div>

      {/* 업로드 진행률 (목업) */}
      <div className="bg-gray-100 rounded-lg p-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>업로드 진행률</span>
          <span>40% (2/5)</span>
        </div>
        <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
          <div className="h-full bg-accent" style={{ width: "40%" }} />
        </div>
      </div>
    </div>
  );
}
