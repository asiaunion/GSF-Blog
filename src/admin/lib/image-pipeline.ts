/**
 * sharp 이미지 변환 파이프라인
 * HEIC/JPEG/PNG/WebP → WebP 변환, EXIF 제거, 리사이즈, 썸네일
 * 세션 3-B에서 구현 예정
 *
 * @see §9 이미지 업로드 파이프라인
 */

// TODO(세션 3-B): sharp 변환 파이프라인 구현
// import sharp from "sharp";
// import { ADMIN_CONFIG } from "../config";

export type ImageProcessResult = {
  webp: Buffer;
  thumbnail: Buffer;
  width: number;
  height: number;
  sizeBytes: number;
};
