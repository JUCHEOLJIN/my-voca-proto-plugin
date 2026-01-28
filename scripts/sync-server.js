#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 9876;
const VOCAB_PATH = process.argv[2] || path.join(__dirname, '..', 'data', 'vocabulary.json');

const server = http.createServer((req, res) => {
  // CORS 허용
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Preflight 요청 처리
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/sync') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const syncData = JSON.parse(body);
        const result = updateVocabulary(syncData);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));

        // 동기화 완료 후 서버 종료
        console.log('동기화 완료! 서버를 종료합니다.');
        setTimeout(() => process.exit(0), 100);

      } catch (error) {
        console.error('동기화 오류:', error.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: error.message }));
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

function updateVocabulary(syncData) {
  // vocabulary.json 읽기
  const vocabRaw = fs.readFileSync(VOCAB_PATH, 'utf-8');
  const vocab = JSON.parse(vocabRaw);

  let correctCount = 0;
  let wrongCount = 0;
  const updatedWords = [];

  // 각 결과 반영
  for (const result of syncData.results) {
    const word = vocab.words.find(w => w.word === result.word);
    if (word) {
      // stats 객체 초기화 (없으면)
      if (!word.stats) {
        word.stats = { correctCount: 0, wrongCount: 0, lastReviewed: null };
      }

      if (result.correct) {
        word.stats.correctCount++;
        correctCount++;
      } else {
        word.stats.wrongCount++;
        wrongCount++;
      }
      word.stats.lastReviewed = result.reviewedAt;
      updatedWords.push(result.word);
    }
  }

  // 저장
  fs.writeFileSync(VOCAB_PATH, JSON.stringify(vocab, null, 2), 'utf-8');

  return {
    success: true,
    correctCount,
    wrongCount,
    updatedWords
  };
}

server.listen(PORT, () => {
  console.log(`Voca Sync 서버 시작: http://localhost:${PORT}`);
  console.log(`Vocabulary 경로: ${VOCAB_PATH}`);
  console.log('퀴즈 완료를 기다리는 중...');
});

// 30분 후 자동 종료 (안전장치)
setTimeout(() => {
  console.log('타임아웃: 30분 경과로 서버를 종료합니다.');
  process.exit(0);
}, 30 * 60 * 1000);
