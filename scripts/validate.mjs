// data/artists.json 검사: 형식 오류나 중복이 있으면 실패합니다.
import { readFileSync } from 'node:fs';

const file = 'data/artists.json';
const errors = [];
const warnings = [];
let list;
try {
  list = JSON.parse(readFileSync(file, 'utf8'));
} catch (e) {
  console.error(`✗ ${file}을(를) JSON으로 읽을 수 없어요: ${e.message}`);
  process.exit(1);
}
if (!Array.isArray(list)) { console.error('✗ 최상위는 배열이어야 해요.'); process.exit(1); }

const TYPES = ['그룹', '솔로', '유닛', '프로젝트'];
const ids = new Map(), names = new Map();
list.forEach((a, i) => {
  const at = `${i + 1}번째 항목${a && a.nameEn ? ` (${a.nameEn})` : ''}`;
  if (!a || typeof a !== 'object') return errors.push(`${at}: 객체가 아니에요.`);
  if (!a.id || !/^[a-z0-9-]+$/.test(a.id)) errors.push(`${at}: id는 영문 소문자·숫자·하이픈만 쓸 수 있어요.`);
  if (!a.nameEn?.trim()) errors.push(`${at}: nameEn(정식 영문 표기)이 비어 있어요.`);
  if (!a.nameKo?.trim()) errors.push(`${at}: nameKo(한글명)가 비어 있어요.`);
  if (!TYPES.includes(a.type)) errors.push(`${at}: type은 ${TYPES.join('/')} 중 하나여야 해요.`);
  for (const k of ['labels', 'aliases', 'members']) if (!Array.isArray(a[k])) errors.push(`${at}: ${k}는 배열이어야 해요.`);
  (a.members || []).forEach((m, j) => {
    if (!m || typeof m !== 'object') errors.push(`${at}: ${j + 1}번째 멤버 형식이 잘못됐어요.`);
    else if (!m.nameEn?.trim()) warnings.push(`${at}: ${j + 1}번째 멤버(${m.nameKo || '이름 없음'})의 영문명이 비어 있어요.`);
  });
  if (ids.has(a.id)) errors.push(`${at}: id '${a.id}'가 ${ids.get(a.id)}번째 항목과 겹쳐요.`); else ids.set(a.id, i + 1);
  if (names.has(a.nameEn)) errors.push(`${at}: 정식 표기 '${a.nameEn}'가 ${names.get(a.nameEn)}번째 항목과 겹쳐요.`); else names.set(a.nameEn, i + 1);
});

warnings.forEach(w => console.log('! ' + w));
if (errors.length) { errors.forEach(e => console.error('✗ ' + e)); process.exit(1); }
console.log(`✓ ${list.length}팀 검사 통과${warnings.length ? ` (확인 필요 ${warnings.length}건)` : ''}`);
