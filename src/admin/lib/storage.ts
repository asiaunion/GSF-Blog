/**
 * 이미지 저장소 추상화 레이어
 * 현재: Vercel Blob (세션 3-B에서 구현)
 * 미래: CloudflareR2Provider (백엔드 교체 시 이 파일만 변경)
 *
 * @see §9 이미지 업로드 파이프라인
 */

export interface StorageFile {
  url: string;
  size: number;
  uploadedAt: string;
}

export interface StorageProvider {
  upload(file: Buffer, filename: string, mime: string): Promise<string>;
  delete(url: string): Promise<void>;
  list(prefix?: string): Promise<StorageFile[]>;
}

// TODO(세션 3-B): VercelBlobProvider 구현
// export class VercelBlobProvider implements StorageProvider { ... }
