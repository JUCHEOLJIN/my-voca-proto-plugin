# My Voca - English Vocabulary Learning Plugin

Claude Code 플러그인으로 영어 단어를 학습하세요.

## Installation

### 마켓플레이스에서 설치 (권장)

```bash
# 1. 마켓플레이스 추가
/plugin marketplace add JUCHEOLJIN/my-voca-proto-plugin

# 2. 플러그인 설치
/plugin install my-voca
```

### 로컬 테스트

```bash
claude --plugin-dir /path/to/my-voca-plugin
```

## Commands

### `/research [topic]` - 단어 연구
웹에서 단어 정보를 검색하여 학습 데이터를 생성합니다.

```bash
/research TOEIC 필수 단어 30개
/research GRE vocabulary
/research 비즈니스 영어 표현
```

### `/quiz [type] [count]` - 퀴즈
4가지 유형의 퀴즈로 단어를 연습합니다.

```bash
/quiz                  # 랜덤 유형, 5문제
/quiz fill-blank 10    # 빈칸 채우기 10문제
/quiz ox 5             # OX 퀴즈 5문제
/quiz meaning          # 뜻 쓰기
/quiz spelling         # 단어 쓰기
```

**퀴즈 유형:**
| Type | Description |
|------|-------------|
| `fill-blank` | 예문 빈칸에 단어 채우기 |
| `ox` | 단어-뜻 매칭 O/X |
| `meaning` | 영어 → 한국어 뜻 |
| `spelling` | 한국어 뜻 → 영어 단어 |

### `/status [filter]` - 학습 현황
학습 진행 상황을 확인합니다.

```bash
/status          # 전체 현황
/status weak     # 취약 단어 목록
/status today    # 오늘 학습 현황
```

## Data Storage

단어 데이터는 `data/vocabulary.json`에 저장됩니다.

```json
{
  "metadata": {
    "name": "TOEIC Essential",
    "createdAt": "2025-01-27",
    "totalWords": 50
  },
  "words": [
    {
      "word": "ambition",
      "meaning": "야망, 포부 (n.)",
      "example": {
        "en": "She has a strong ambition to succeed.",
        "ko": "그녀는 성공하겠다는 강한 야망이 있다."
      },
      "level": "intermediate",
      "learned": false,
      "stats": {
        "correctCount": 3,
        "wrongCount": 1,
        "lastReviewed": "2025-01-27"
      }
    }
  ]
}
```

## Workflow

1. `/research`로 학습할 단어 수집
2. `/quiz`로 반복 학습
3. `/status`로 진행 상황 확인
4. `/status weak`로 취약 단어 집중 복습
