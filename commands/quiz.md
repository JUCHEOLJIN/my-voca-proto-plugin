---
description: 영어 단어 퀴즈 시작
allowed-tools: Read, Write, Bash, AskUserQuestion
argument-hint: [유형] [개수] - 유형: fill-blank, ox, meaning, spelling, choice
---

퀴즈 시작: $ARGUMENTS

## 자동 동기화 (먼저 실행!)

퀴즈 시작 전 브라우저 퀴즈 결과가 있는지 확인:

1. `~/Downloads/voca_sync.json` 파일이 있는지 Bash로 확인
2. 있으면:
   - 파일 읽기
   - `data/vocabulary.json`에 결과 반영 (correctCount/wrongCount 업데이트)
   - sync 파일 삭제
   - "브라우저 퀴즈 결과 동기화: 정답 +N, 오답 +N" 출력
3. 없으면: 조용히 넘어가기

## 중요 규칙 - 먼저 읽을 것
- 사용자가 답하기 전에 절대 정답을 보여주지 말 것 (객관식의 보기 제외)
- 객관식: vocabulary.json의 다른 단어 뜻에서 오답 보기 가져오기
- 보기 순서를 섞어서 정답이 항상 같은 위치에 오지 않게 할 것
- 정답은 기억만 하고, 사용자 답변 후 평가

## 수행 지침

1. **인자 파싱**:
   - 인자 없음: 랜덤 유형, 5문제
   - `fill-blank [n]`: 빈칸 채우기 (주관식)
   - `ox [n]`: 단어-뜻 매칭 OX 퀴즈
   - `meaning [n]`: 영어 → 한국어 뜻 (주관식)
   - `spelling [n]`: 한국어 뜻 → 영어 단어 (주관식)
   - `choice [n]`: 객관식 - 뜻 고르기

2. `data/vocabulary.json`에서 단어 불러오기
   - 단어가 없으면 `/research`를 먼저 실행하라고 안내
   - 객관식은 최소 4개 단어 필요

3. **퀴즈 단어 선택**:
   - 정답률 낮은 단어 우선
   - 복습 안 한 단어 포함 (lastReviewed = null)
   - 순서 섞기

4. **퀴즈 진행** - 한 번에 한 문제씩:

   ### 빈칸 채우기 (주관식, 힌트 없음!)
   ```
   Q1/5. 빈칸에 알맞은 단어를 쓰세요.

   "She has a strong ______ to become a successful entrepreneur."
   ```
   사용자 답변 대기.

   ### OX 퀴즈
   ```
   Q1/5. 단어와 뜻이 맞으면 O, 틀리면 X

   ambition = 성취하다
   ```
   사용자 O/X 답변 대기.

   ### 뜻 쓰기 (주관식)
   ```
   Q1/5. 이 단어의 한국어 뜻은?

   accomplish
   ```
   사용자 답변 대기.

   ### 단어 쓰기 (주관식)
   ```
   Q1/5. 이 뜻의 영어 단어는?

   성취하다, 달성하다 (v.)
   ```
   사용자 답변 대기.

   ### 객관식 - AskUserQuestion 사용
   AskUserQuestion 도구로 4개 보기 제시:
   - 정답 1개 (해당 단어의 실제 뜻)
   - 오답 3개 (vocabulary.json의 다른 단어 뜻에서 가져오기)
   - 반드시 순서 섞기!

   "ambition" 단어 예시:
   ```
   질문: "ambition의 뜻은?"
   보기 (순서 섞음):
   - 성취하다, 달성하다 (v.)
   - 야망, 포부 (n.)
   - 충분한, 적절한 (adj.)
   - 정교한, 상세한 (adj.)
   ```
   위 예시에서 정답은 "야망, 포부". 출력할 때 어떤 게 정답인지 표시하지 말 것.

5. **사용자 답변 후** (메모리에 기록, 아직 저장 안 함):
   - 정답: "정답입니다!" 출력
     → 메모리에 해당 단어의 stats.correctCount += 1 기록
   - 오답: "오답입니다. 정답: [답]" + 예문 표시
     → 메모리에 해당 단어의 stats.wrongCount += 1 기록
   - 메모리에 stats.lastReviewed를 오늘 날짜(YYYY-MM-DD)로 기록
   - 다음 문제 출제 (파일 저장은 퀴즈 끝난 후!)

6. **퀴즈 종료 후 저장** (중요!):
   - 모든 문제가 끝나면 메모리에 기록한 모든 변경사항을
   - **Write 도구로 `data/vocabulary.json`에 한 번만 저장!**

7. **최종 요약**:
   ```
   퀴즈 완료!

   점수: 4/5 (80%)

   정답: ambition, accomplish, adequate, subsequent
   복습 필요: elaborate

   elaborate (정교한, 상세한)
   → "The architect created an elaborate design for the building."
   ```

## 답변 검증
- 한국어 답변은 유연하게 (동의어 허용)
- 스펠링은 사소한 오타 허용하되 언급
- OX는 허용: O, o, X, x, ㅇ, ㅌ
