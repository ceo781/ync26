// Vehicle Registration Form Types

export interface VehicleBasicInfo {
  manufacturer: string;
  model: string;
  year: number | "";
  mileageKm: number | "";
  vin: string;
  registrationNumber: string;
  matchingNumbers: "yes" | "no" | "";
  priceKrw: number | "";
  descriptionKo: string;
  descriptionEn: string;
}

export interface VehicleOption {
  id: string;
  manufacturer: string;
  category: OptionCategory;
  code: string;
  nameKo: string;
  nameEn: string;
  description?: string;
}

export interface VehicleOptionsData {
  selectedOptionIds: string[];
  customOptions: string;
}

export interface MaintenanceRecord {
  id: string;
  serviceDate: string;
  serviceCenter: string;
  description: string;
  cost: number | "";
  documentUrl?: string;
}

export interface ConsumableStatus {
  tirePercentage: number | "";
  tireReplacementDate: string;
  tireBrand: string;
  tireModel: string;
  brakePadThicknessMm: number | "";
  brakeDiskStatus: BrakeDiskStatus | "";
  brakePadReplacementDate: string;
  engineOilReplacementDate: string;
  engineOilMileageKm: number | "";
  engineOilBrand: string;
  batteryReplacementDate: string;
  coolantReplacementDate: string;
  notes: string;
}

export interface MediaFiles {
  images: UploadedFile[];
  videos: UploadedFile[];
  audios: UploadedFile[];
}

export interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  progress: number;
  status: "pending" | "uploading" | "completed" | "error";
  isMain?: boolean;
}

export interface VehicleRegistrationData {
  basicInfo: VehicleBasicInfo;
  options: VehicleOptionsData;
  maintenanceRecords: MaintenanceRecord[];
  consumableStatus: ConsumableStatus;
  mediaFiles: MediaFiles;
  agreedToTerms: boolean;
}

// Enums
export type OptionCategory =
  | "PERFORMANCE"
  | "EXTERIOR"
  | "INTERIOR"
  | "CONVENIENCE";

export type BrakeDiskStatus =
  | "GOOD"
  | "FAIR"
  | "NEEDS_REPLACEMENT"
  | "REPLACED";

// Form Step
export interface FormStep {
  id: number;
  title: string;
  description: string;
}

// Default Values
export const defaultBasicInfo: VehicleBasicInfo = {
  manufacturer: "",
  model: "",
  year: "",
  mileageKm: "",
  vin: "",
  registrationNumber: "",
  matchingNumbers: "",
  priceKrw: "",
  descriptionKo: "",
  descriptionEn: "",
};

export const defaultOptionsData: VehicleOptionsData = {
  selectedOptionIds: [],
  customOptions: "",
};

export const defaultConsumableStatus: ConsumableStatus = {
  tirePercentage: "",
  tireReplacementDate: "",
  tireBrand: "",
  tireModel: "",
  brakePadThicknessMm: "",
  brakeDiskStatus: "",
  brakePadReplacementDate: "",
  engineOilReplacementDate: "",
  engineOilMileageKm: "",
  engineOilBrand: "",
  batteryReplacementDate: "",
  coolantReplacementDate: "",
  notes: "",
};

export const defaultMediaFiles: MediaFiles = {
  images: [],
  videos: [],
  audios: [],
};

export const defaultVehicleRegistration: VehicleRegistrationData = {
  basicInfo: defaultBasicInfo,
  options: defaultOptionsData,
  maintenanceRecords: [],
  consumableStatus: defaultConsumableStatus,
  mediaFiles: defaultMediaFiles,
  agreedToTerms: false,
};
