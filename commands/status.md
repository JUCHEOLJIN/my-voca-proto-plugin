---
description: 단어 학습 현황 및 통계 표시
allowed-tools: Read
argument-hint: [weak|today] - 선택적 필터
---

학습 현황 표시: $ARGUMENTS

## 수행 지침

1. `data/vocabulary.json`에서 단어 데이터 읽기

2. 통계 계산:
   - 총 단어 수
   - 학습 완료 단어 (correctCount >= 3 이고 정답률 >= 70%)
   - 학습 중 단어 (복습했지만 아직 미완료)
   - 미시작 단어 (한 번도 복습 안 함)
   - 전체 정답률

3. 인자에 따른 표시:

### 기본 (인자 없음): 전체 현황
```
단어 학습 현황

주제: TOEIC 필수 단어
총 단어: 100개

진행 상황
  학습 완료:  45개 (45%)
  학습 중:    30개 (30%)
  미시작:     25개 (25%)

정답률: 78% (400개 중 312개 정답)

취약 단어 (정답률 < 50%):
  - elaborate (2/6, 33%) - 정교한, 상세한
  - subsequent (1/4, 25%) - 그 다음의
  - ambiguous (2/5, 40%) - 모호한

최근 추가 단어:
  - accomplish, adequate, ambition, ...
```

### `weak`: 복습 필요 단어 목록
```
복습 필요 단어 (정답률 < 60%)

1. subsequent (1/4, 25%)
   뜻: 그 다음의, 차후의 (adj.)
   예문: "Subsequent events proved him right."

2. elaborate (2/6, 33%)
   뜻: 정교한, 상세한 (adj.)
   예문: "She gave an elaborate explanation."

3. ambiguous (2/5, 40%)
   뜻: 모호한, 애매한 (adj.)
   예문: "His answer was ambiguous."

총 5개 단어 복습 필요
팁: `/quiz`로 이 단어들을 연습하세요!
```

### `today`: 오늘 학습 현황
```
오늘의 학습 (2025-01-27)

복습한 단어: 15개
새로 맞춘 것: 12개
새로 틀린 것: 3개
정답률: 80%

오늘 복습한 단어:
  accomplish - 정답
  adequate - 정답
  elaborate - 오답 (복습 필요)
  ...
```

## 표시 형식
- 호환성을 위해 간단한 ASCII 사용:
  - `[###----]` 스타일 진행 바
  - 이모지 대신 `*`로 강조

## 예외 처리
- 단어가 없는 경우: `/research`를 먼저 실행하라고 안내
- 복습 기록이 없는 경우: "`/quiz`로 학습을 시작하세요!" 표시
