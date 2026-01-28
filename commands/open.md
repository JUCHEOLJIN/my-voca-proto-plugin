---
description: 브라우저에서 학습 UI 열기
allowed-tools: Read, Write, Bash
argument-hint: [dashboard|quiz|cards] - 열 화면 선택
---

브라우저에서 학습 UI 열기: $ARGUMENTS

## 수행 지침

1. **인자 파싱**:
   - `dashboard` 또는 인자 없음: 대시보드 열기
   - `quiz`: 퀴즈 UI 열기
   - `cards`: 플래시카드 열기 (미구현 시 대시보드)

2. **데이터 주입**:
   - `data/vocabulary.json` 읽기
   - HTML 템플릿에 데이터 주입

3. **HTML 생성**:
   - `templates/` 폴더의 해당 HTML 템플릿 읽기
   - `window.VOCA_DATA = [vocabulary.json 데이터]` 스크립트 추가
   - 임시 HTML 파일 생성: `data/temp_[type].html`

4. **브라우저 열기**:
   - macOS: `open data/temp_[type].html`
   - Windows: `start data/temp_[type].html`
   - Linux: `xdg-open data/temp_[type].html`

## 데이터 주입 예시

원본 HTML의 `<script>` 부분 앞에 다음 추가:
```html
<script>
window.VOCA_DATA = {
  "metadata": {...},
  "words": [...]
};
</script>
```

## 출력 예시
```
학습 대시보드를 브라우저에서 엽니다...

브라우저에서 열렸습니다!
- 총 단어: 40개
- 학습 완료: 15개
- 정답률: 75%

팁: 퀴즈를 풀려면 `/open quiz`를 실행하세요.
```
