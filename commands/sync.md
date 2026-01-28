---
description: 브라우저 퀴즈 결과 동기화
allowed-tools: Read, Write, Bash
---

브라우저에서 진행한 퀴즈 결과를 vocabulary.json에 동기화합니다.

## 수행 지침

1. **sync 파일 찾기**:
   - `~/Downloads/voca_sync.json` 파일 확인
   - 없으면: "동기화할 데이터가 없습니다." 출력 후 종료

2. **sync 파일 읽기**:
   ```json
   {
     "syncedAt": "2025-01-28T10:30:00.000Z",
     "results": [
       { "word": "ambition", "correct": true, "reviewedAt": "2025-01-28" },
       { "word": "elaborate", "correct": false, "reviewedAt": "2025-01-28" }
     ]
   }
   ```

3. **vocabulary.json 업데이트**:
   - `data/vocabulary.json` 읽기
   - 각 result에 대해:
     - 해당 word 찾기
     - `correct: true` → stats.correctCount += 1
     - `correct: false` → stats.wrongCount += 1
     - stats.lastReviewed = reviewedAt
   - 변경된 vocabulary.json 저장

4. **sync 파일 삭제**:
   - `rm ~/Downloads/voca_sync.json`

5. **결과 출력**:
   ```
   동기화 완료!

   반영된 결과:
   - 정답: 3개 (ambition, adequate, accomplish)
   - 오답: 1개 (elaborate)

   현재 학습 현황:
   - 총 단어: 40개
   - 학습 완료: 18개
   - 정답률: 78%
   ```

## 주의사항
- sync 파일이 없으면 아무것도 하지 않음
- 이미 동기화된 결과는 중복 반영되지 않도록 sync 파일 삭제
