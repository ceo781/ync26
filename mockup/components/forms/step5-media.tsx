"use client";

import { useState, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import type { VehicleRegistrationData } from "@/types/vehicle";
import { FILE_LIMITS } from "@/lib/constants";

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  progress: number;
  status: "pending" | "uploading" | "completed" | "error";
}

export function Step5Media() {
  const { setValue, watch } = useFormContext<VehicleRegistrationData>();
  const [images, setImages] = useState<UploadedFile[]>([]);
  const [videos, setVideos] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter((f) =>
      FILE_LIMITS.IMAGE.acceptedTypes.includes(f.type)
    );
    const videoFiles = files.filter((f) =>
      FILE_LIMITS.VIDEO.acceptedTypes.includes(f.type)
    );

    // Process images
    const newImages: UploadedFile[] = imageFiles.map((file) => ({
      id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
      status: "completed" as const,
    }));

    // Process videos
    const newVideos: UploadedFile[] = videoFiles.map((file) => ({
      id: `vid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
      status: "completed" as const,
    }));

    setImages((prev) => [...prev, ...newImages]);
    setVideos((prev) => [...prev, ...newVideos]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file) URL.revokeObjectURL(file.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  const removeVideo = (id: string) => {
    setVideos((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file) URL.revokeObjectURL(file.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  const setMainImage = (id: string) => {
    setImages((prev) => {
      const idx = prev.findIndex((f) => f.id === id);
      if (idx > 0) {
        const newArr = [...prev];
        const [item] = newArr.splice(idx, 1);
        newArr.unshift(item);
        return newArr;
      }
      return prev;
    });
  };

  const imageCount = images.length;
  const minImages = FILE_LIMITS.IMAGE.minCount;
  const isValid = imageCount >= minImages;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">미디어 업로드</h2>
        <p className="text-gray-400">
          차량의 사진과 영상을 업로드해주세요. 고화질 이미지일수록 구매자의
          관심을 끌 수 있습니다.
        </p>
      </div>

      {/* Image Upload Section */}
      <div className="card">
        <div className="card-header flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">차량 이미지</h3>
          <div className="flex items-center gap-2">
            <span
              className={`text-sm ${isValid ? "text-success" : "text-warning"}`}
            >
              {imageCount} / {minImages}장 (최소)
            </span>
            {!isValid && (
              <span className="text-xs text-gray-500">
                최소 {minImages}장 필요
              </span>
            )}
          </div>
        </div>
        <div className="card-body">
          {/* Drop Zone */}
          <div
            className={`upload-area p-8 text-center ${
              dragActive ? "upload-area-active" : ""
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              multiple
              accept={FILE_LIMITS.IMAGE.acceptedTypes.join(",")}
              onChange={handleFileInput}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium">
                    이미지를 드래그하거나 클릭하여 업로드
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    JPG, PNG, WebP / 최대 10MB / 최소 20장
                  </p>
                </div>
              </div>
            </label>
          </div>

          {/* Image Preview Grid */}
          {images.length > 0 && (
            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-3">
                첫 번째 이미지가 대표 이미지로 사용됩니다. 드래그하여 순서를 변경하세요.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {images.map((img, index) => (
                  <div
                    key={img.id}
                    className={`relative aspect-[4/3] rounded-lg overflow-hidden group ${
                      index === 0 ? "ring-2 ring-secondary" : ""
                    }`}
                  >
                    <img
                      src={img.preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {/* Main Badge */}
                    {index === 0 && (
                      <div className="absolute top-2 left-2 badge-secondary">
                        대표
                      </div>
                    )}
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      {index !== 0 && (
                        <button
                          type="button"
                          onClick={() => setMainImage(img.id)}
                          className="p-2 bg-secondary rounded-full text-primary hover:bg-secondary-light"
                          title="대표 이미지로 설정"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => removeImage(img.id)}
                        className="p-2 bg-error rounded-full text-white hover:bg-red-600"
                        title="삭제"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Video Upload Section */}
      <div className="card">
        <div className="card-header flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">영상 (선택)</h3>
          <span className="text-sm text-gray-400">
            {videos.length} / {FILE_LIMITS.VIDEO.maxCount}개
          </span>
        </div>
        <div className="card-body">
          <div
            className={`upload-area p-6 text-center ${
              dragActive ? "upload-area-active" : ""
            }`}
          >
            <input
              type="file"
              multiple
              accept={FILE_LIMITS.VIDEO.acceptedTypes.join(",")}
              onChange={(e) => {
                if (e.target.files) {
                  handleFiles(Array.from(e.target.files));
                }
              }}
              className="hidden"
              id="video-upload"
            />
            <label htmlFor="video-upload" className="cursor-pointer">
              <div className="flex flex-col items-center gap-3">
                <svg
                  className="w-10 h-10 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <p className="text-white">영상 업로드</p>
                  <p className="text-xs text-gray-500 mt-1">
                    MP4, WebM / 최대 500MB
                  </p>
                </div>
              </div>
            </label>
          </div>

          {/* Video Preview */}
          {videos.length > 0 && (
            <div className="mt-4 space-y-3">
              {videos.map((vid) => (
                <div
                  key={vid.id}
                  className="flex items-center gap-4 p-3 bg-gray-700/50 rounded-lg"
                >
                  <div className="w-20 h-14 bg-gray-800 rounded overflow-hidden flex-shrink-0">
                    <video
                      src={vid.preview}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{vid.file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(vid.file.size / (1024 * 1024)).toFixed(1)} MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeVideo(vid.id)}
                    className="p-2 text-gray-400 hover:text-error"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Guidelines */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
        <h4 className="font-semibold text-white mb-3">촬영 가이드라인</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
          <div className="flex gap-2">
            <span className="text-secondary">1.</span>
            <span>외관 전체 (전면, 후면, 좌측, 우측, 45도 각도)</span>
          </div>
          <div className="flex gap-2">
            <span className="text-secondary">2.</span>
            <span>엔진룸 전체 사진 및 주요 부품</span>
          </div>
          <div className="flex gap-2">
            <span className="text-secondary">3.</span>
            <span>실내 (운전석, 조수석, 뒷좌석, 트렁크)</span>
          </div>
          <div className="flex gap-2">
            <span className="text-secondary">4.</span>
            <span>계기판, 주행거리, 주요 버튼/스위치</span>
          </div>
          <div className="flex gap-2">
            <span className="text-secondary">5.</span>
            <span>타이어/휠 상태 (4개 모두)</span>
          </div>
          <div className="flex gap-2">
            <span className="text-secondary">6.</span>
            <span>하부 사진 (가능한 경우)</span>
          </div>
        </div>
      </div>

      {/* Validation Warning */}
      {!isValid && (
        <div className="bg-warning/10 border border-warning/30 rounded-xl p-4">
          <div className="flex gap-3">
            <svg
              className="w-5 h-5 text-warning flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div className="text-sm">
              <p className="font-medium text-warning">
                이미지가 부족합니다
              </p>
              <p className="text-gray-400 mt-1">
                최소 {minImages}장의 이미지를 업로드해야 다음 단계로 진행할 수
                있습니다. 현재 {imageCount}장 업로드됨.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
