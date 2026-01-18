"use client";

import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

interface MaintenanceRecord {
  id: number;
  date: string;
  center: string;
  description: string;
}

export default function Step3Maintenance() {
  const [records, setRecords] = useState<MaintenanceRecord[]>([
    { id: 1, date: "", center: "", description: "" },
  ]);

  const addRecord = () => {
    setRecords([
      ...records,
      { id: Date.now(), date: "", center: "", description: "" },
    ]);
  };

  const removeRecord = (id: number) => {
    if (records.length > 1) {
      setRecords(records.filter((record) => record.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Step 3: 정비 이력
      </h2>

      <Button variant="outline" onClick={addRecord} className="w-full md:w-auto">
        + 정비 이력 추가
      </Button>

      <div className="space-y-6">
        {records.map((record, index) => (
          <div
            key={record.id}
            className="p-6 border border-gray-300 rounded-lg relative"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900">
                정비 이력 #{index + 1}
              </h3>
              {records.length > 1 && (
                <button
                  onClick={() => removeRecord(record.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  삭제 ×
                </button>
              )}
            </div>

            <div className="space-y-4">
              <Input
                label="정비 일자"
                type="date"
                required
              />

              <Input
                label="정비소 이름"
                placeholder="서울페라리"
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  정비 내용 <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                  rows={3}
                  placeholder="정기 점검 및 엔진오일 교체"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  문서 첨부 (선택)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500">
                    파일을 선택하거나 드래그 앤 드롭
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PDF, JPG, PNG (최대 10MB)
                  </p>
                  <input type="file" className="hidden" accept=".pdf,.jpg,.png" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
