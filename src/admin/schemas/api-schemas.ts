/**
 * Admin API Zod 스키마
 * 세션 1-B, 2-B에서 채워나갈 예정
 *
 * @see §11-B API 보안 — 모든 API 입력을 Zod 스키마로 검증
 */

import { z } from "zod";
import type { PostCategory, PostStatus } from "../config";

// 공통 ID 스키마
export const idSchema = z.string().min(1).max(64);

// 슬러그 스키마 (경로 순회 방지)
export const slugSchema = z
  .string()
  .min(1)
  .max(200)
  .regex(/^[a-z0-9-]+$/, "slug는 소문자, 숫자, 하이픈만 허용");

// 언어 스키마
export const langSchema = z.enum(["ko", "en", "ja"]);

// 포스트 상태 스키마
export const postStatusSchema = z.enum([
  "memo",
  "draft",
  "editing",
  "review",
  "published",
] satisfies PostStatus[]);

// 카테고리 스키마
export const categorySchema = z.enum([
  "investment",
  "safety",
  "life",
  "local",
  "essay",
] satisfies PostCategory[]);

// TODO(세션 2-B): 포스트 생성/수정 스키마 추가
// TODO(세션 3-A): 프론트매터 스키마 추가
