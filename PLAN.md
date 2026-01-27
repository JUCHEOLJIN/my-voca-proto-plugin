# English Vocabulary Learning Plugin (my-voca)

## Overview
영어 단어 학습을 도와주는 Claude Code 플러그인

## Plugin Structure

```
my-voca-proto-plugin/
├── .claude-plugin/
│   └── plugin.json              # 플러그인 메타데이터
├── skills/
│   └── word-researcher/         # 단어 리서처 스킬
│       └── SKILL.md
├── agents/
│   ├── quiz-master.md           # 퀴즈 출제 에이전트
│   └── word-researcher.md       # 단어 연구 에이전트 (웹검색 활용)
├── commands/
│   ├── quiz.md                  # /quiz - 퀴즈 시작
│   ├── research.md              # /research - 단어 연구
│   └── status.md                # /status - 학습 현황
└── data/
    └── vocabulary.json          # 단어 데이터 저장소
```

---

## Features

### 1. Word Researcher (단어 리서처)

**목적**: 사용자가 원하는 단어집/단어 목록을 조사하여 학습 데이터 생성

**기능**:
- 웹 검색을 통한 단어 정보 수집
- 단어별 데이터 구조화:
  - `word`: 영어 단어
  - `meaning`: 한국어 뜻 (품사 포함)
  - `example`: 예문 (영어 + 한국어 번역)
  - `level`: 난이도 (beginner/intermediate/advanced)
  - `learned`: 학습 완료 여부
  - `correctCount`: 정답 횟수
  - `wrongCount`: 오답 횟수

**사용 예시**:
```
/research TOEIC 필수 단어 100개
/research GRE vocabulary list
/research 비즈니스 영어 표현
```

---

### 2. Quiz Agent (시험 에이전트)

**목적**: 드릴 방식으로 단어 암기 훈련

**퀴즈 유형**:

| 유형 | 설명 | 예시 |
|------|------|------|
| 빈칸 채우기 | 예문에서 단어 빈칸 | "She has a strong ___ to succeed." |
| OX 퀴즈 | 단어-뜻 매칭 확인 | "ambition = 야망" O or X? |
| 뜻 쓰기 | 영어 단어 → 한국어 뜻 | "ambition의 뜻은?" |
| 단어 쓰기 | 한국어 뜻 → 영어 단어 | "'야망'을 영어로?" |

**사용 예시**:
```
/quiz                    # 기본 퀴즈 (랜덤 유형)
/quiz fill-blank 10      # 빈칸 채우기 10문제
/quiz ox                 # OX 퀴즈
/quiz meaning            # 뜻 쓰기
/quiz spelling           # 단어 쓰기
```

---

### 3. Learning Status (학습 현황)

**목적**: 학습 진행 상황을 한눈에 파악

**표시 정보**:
```
📊 Vocabulary Learning Status
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Words: 100
Learned:     45 (45%)
In Progress: 30 (30%)
Not Started: 25 (25%)

⚠️ Words to Review (low accuracy):
- ambition (2/5, 40%)
- elaborate (3/8, 37%)
```

---

## Data Schema (vocabulary.json)

```json
{
  "metadata": {
    "name": "TOEIC Essential",
    "createdAt": "2025-01-27",
    "totalWords": 100
  },
  "words": [
    {
      "id": "1",
      "word": "ambition",
      "meaning": "야망, 포부 (n.)",
      "example": {
        "en": "She has a strong ambition to become a doctor.",
        "ko": "그녀는 의사가 되겠다는 강한 야망이 있다."
      },
      "level": "intermediate",
      "learned": false,
      "stats": {
        "correctCount": 0,
        "wrongCount": 0,
        "lastReviewed": null
      }
    }
  ]
}
```

---

## Implementation Phases

### Phase 1: 기본 구조
- plugin.json 작성
- 폴더 구조 생성

### Phase 2: 단어 리서처
- word-researcher agent
- /research command

### Phase 3: 퀴즈 시스템
- quiz-master agent
- /quiz command (4가지 유형)

### Phase 4: 학습 현황
- /status command
