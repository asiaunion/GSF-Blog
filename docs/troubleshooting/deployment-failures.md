# Vercel & GitHub Actions 배포 실패 분석 기록 (Deployment Failure Analysis)

## 현상 (Symptom)
- **에러 메시지**: `ERR_PNPM_OUTDATED_LOCKFILE Cannot install with "frozen-lockfile" because pnpm-lock.yaml is not up to date with <ROOT>/package.json`
- **상황**: 로컬에서는 빌드가 잘 되는데 Vercel 배포나 GitHub Actions CI에서 `pnpm install` 단계 중 위 에러와 함께 즉시 실패함.
- **빈도**: `package.json`에 새로운 의존성을 추가했을 때 라이브 배포 시 거의 항상 발생함 (한 번에 배포 성공 안 됨).

## 근본 원인 (Root Cause)
1. **Monorepo Workspace 구조**: 로컬 `scratch/projects/GSF-Ark`는 상위 디렉터리의 pnpm workspace (`scratch/pnpm-workspace.yaml`)에 속해 있습니다.
2. **Lockfile 위임 (Delegation)**: 이 상태에서 로컬 `GSF-Ark` 디렉터리 내에서 단순히 `pnpm install`을 실행하면, pnpm은 이를 workspace 컨텍스트로 인식하고 최상위(root) `scratch/pnpm-lock.yaml`만 업데이트하며, **`GSF-Ark` 내부의 `pnpm-lock.yaml`은 수정하지 않습니다**.
3. **CI 환경의 고립 (Isolation)**: Vercel과 GitHub Actions는 `GSF-Blog` (로컬의 `GSF-Ark`와 매핑) 레포지토리를 **단독(Standalone)** 프로젝트로 체크아웃하여 실행합니다. 따라서 CI 환경에서는 workspace 최상위 lockfile이 존재하지 않으며, `GSF-Blog` 내부의 `pnpm-lock.yaml`을 기준으로 `--frozen-lockfile` 설치를 시도합니다.
4. **결과적 불일치**: 로컬에서 패키지를 추가(`package.json` 변경)하고 커밋할 때, 내부 `pnpm-lock.yaml`이 갱신되지 않은 채 푸시되므로 CI 환경은 스펙 불일치를 감지하고 배포를 즉각 중단(Fail)시킵니다.

## 해결책 및 모범 사례 (Solution & Best Practice)
`GSF-Ark`와 같이 GitHub에서는 단독 레포지토리이나 로컬에서는 pnpm workspace에 속해 있는 프로젝트의 경우, 새로운 의존성을 추가하거나 변경한 후에는 **반드시 워크스페이스를 무시하고 로컬 lockfile을 갱신**해야 합니다.

```bash
# 로컬 GSF-Ark 내부의 pnpm-lock.yaml을 강제로 갱신하는 방법
pnpm install --ignore-workspace
```

1. 의존성 추가/변경 발생.
2. `pnpm install --ignore-workspace` 실행.
3. `git status`로 `pnpm-lock.yaml`이 수정되었는지 확인.
4. `package.json`과 `pnpm-lock.yaml`을 함께 커밋 후 푸시 (`git commit -m "chore(deps): update lockfile"`).

이 단계를 거치면 Vercel과 GitHub Actions CI 배포가 한 번에 성공합니다.
