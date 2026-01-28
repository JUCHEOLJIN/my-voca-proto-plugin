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

2. **플러그인 설치 경로 찾기** (중요!):
   - Bash로 실행: `cat ~/.claude/plugins/installed_plugins.json | grep -A5 "my-voca@"`
   - 결과에서 `installPath` 값 추출 (예: `/Users/.../.claude/plugins/cache/my-voca-marketplace/my-voca/1.0.0`)
   - 이 경로를 `PLUGIN_ROOT`로 기억

3. **템플릿 파일 읽기** (중요! 직접 HTML 생성하지 말 것!):
   - `quiz` → Read 도구로 `{PLUGIN_ROOT}/templates/quiz.html` 파일 전체 읽기
   - `dashboard` → Read 도구로 `{PLUGIN_ROOT}/templates/dashboard.html` 파일 전체 읽기
   - **절대로 HTML을 직접 작성하지 말고, 템플릿 파일을 그대로 복사할 것!**

4. **데이터 주입**:
   - `data/vocabulary.json` 읽기
   - 템플릿 HTML의 `<script>` 태그 바로 앞에 데이터 스크립트 삽입

5. **임시 파일 생성**:
   - 데이터가 주입된 HTML을 `data/temp_[type].html`에 Write
   - 템플릿의 모든 내용(스타일, 스크립트, 버튼 등)이 그대로 유지되어야 함!

6. **퀴즈인 경우 동기화 서버 시작** (quiz일 때만):
   - Bash로 백그라운드 실행: `node {PLUGIN_ROOT}/scripts/sync-server.js {DATA_PATH}/vocabulary.json &`
   - `{DATA_PATH}`는 `data` 폴더의 절대 경로
   - 서버가 시작되면 "Voca Sync 서버 시작" 메시지 확인

7. **브라우저 열기**:
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

## 주의사항
- **절대로** HTML을 직접 생성하지 말 것
- **반드시** templates/ 폴더의 파일을 Read로 읽어서 사용
- 템플릿에는 이미 완성된 UI(버튼, 스타일, 기능)가 있음
- 데이터 주입만 하고 나머지는 그대로 유지
