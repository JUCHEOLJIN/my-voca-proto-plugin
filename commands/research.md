---
description: 영어 단어를 검색하고 학습 데이터 생성
allowed-tools: WebSearch, Read, Write
argument-hint: [주제 또는 단어 목록]
---

단어 연구 주제: $ARGUMENTS

## 수행 지침

1. 먼저 `data/vocabulary.json` 파일을 읽어서 기존 단어 확인

2. WebSearch로 사용자 요청에 맞는 단어 검색:
   - 숫자가 지정된 경우 (예: "TOEIC 단어 50개") 해당 개수만큼 찾기
   - 숫자 미지정 시 10-20개 단어 찾기

3. 각 단어별로 수집할 정보:
   - **word**: 영어 단어
   - **meaning**: 품사 포함 한국어 뜻 (예: "성취하다 (v.)" 또는 "야망 (n.)")
   - **example.en**: 단어를 활용한 자연스러운 영어 예문
   - **example.ko**: 예문의 한국어 번역
   - **level**: 난이도 - "beginner", "intermediate", "advanced" 중 선택

4. `data/vocabulary.json` 업데이트:
   - metadata.name에 주제 입력
   - metadata.createdAt에 오늘 날짜 입력
   - words 배열에 새 단어 추가 (기존 단어와 중복 금지)
   - metadata.totalWords 개수 업데이트

5. 결과 보고:
   - 추가된 새 단어 개수
   - 현재 총 단어 개수
   - 추가된 단어 중 3-5개 샘플

## 출력 예시
```
TOEIC 단어 20개 추가 완료!

총 단어: 45개

추가된 단어 샘플:
- accomplish (성취하다) - "She accomplished her goal of running a marathon."
- adequate (충분한) - "The budget was adequate for the project."
- ambition (야망) - "His ambition drove him to start his own company."
```
