export interface UploadFile {
  name: string;
  percentage?: number;
  size?: number;
  response?: unknown;
  uid: number;
  url?: string;
}

export interface Images {
  publicId: string;
  thumbUrl: string;
  url: string;
  mediaType: string;
  shopId: string;
  updatedAt: string;
}
