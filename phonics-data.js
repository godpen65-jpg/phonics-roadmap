// 단모음 소리 합치기 데이터 (blend.html, print.html 같이 씀)

// 모음별 단어 가족: 끝소리 묶음(rime)과 앞에 붙는 첫소리. 진짜 단어만 넣었다.
var VOWELS = ['a', 'e', 'i', 'o', 'u'];
var VOWEL_KO = { a: '애', e: '에', i: '이', o: '아', u: '어' };
var FAMILIES = {
  a: [['at', 'bcfhmprs'], ['ad', 'bdhmps'], ['an', 'cfmprv'], ['ap', 'cmnt'], ['ag', 'brtw'], ['am', 'hjry']],
  e: [['et', 'bgjlmnpsw'], ['en', 'dhmpt'], ['ed', 'bflrw'], ['eg', 'blp']],
  i: [['it', 'bfhklps'], ['ig', 'bdfpw'], ['in', 'bfptw'], ['ip', 'dhlrstz'], ['id', 'dhkl']],
  o: [['ot', 'cdghlnp'], ['op', 'chmpt'], ['og', 'dfhjl'], ['ox', 'bf']],
  u: [['ug', 'bdhjmrt'], ['un', 'bfrs'], ['ut', 'bchn'], ['ub', 'chrst'], ['ud', 'bm']]
};

// 그림으로 보여줄 수 있는 단어
var EMOJI = {
  bat: '🦇', cat: '🐱', hat: '🎩', rat: '🐀', dad: '👨', fan: '🪭', man: '🧍', pan: '🍳', van: '🚐',
  cap: '🧢', map: '🗺️', nap: '😴', bag: '👜', ham: '🍖', jam: '🍓', yam: '🍠',
  jet: '✈️', net: '🥅', wet: '💦', hen: '🐔', pen: '🖊️', ten: '🔟', bed: '🛏️', red: '🔴', leg: '🦵',
  sit: '🪑', kit: '🧰', big: '🐘', dig: '⛏️', pig: '🐷', wig: '💇', pin: '📌', win: '🏆', lip: '👄', zip: '🤐', kid: '🧒',
  hot: '🔥', pot: '🍲', hop: '🐇', mop: '🧹', top: '🔝', dog: '🐶', fog: '🌫️', log: '🪵', box: '📦', fox: '🦊',
  bug: '🐞', hug: '🤗', mug: '☕', bun: '🍞', fun: '🎉', run: '🏃', sun: '☀️', cut: '✂️', hut: '🛖', nut: '🥜',
  cub: '🐻', tub: '🛁', mud: '🟫', bud: '🌱'
};

// 한글 유사 음가: 첫소리, 모음, 끝소리(받침)
var KO_ONSET = { b: 'ㅂ', c: 'ㅋ', d: 'ㄷ', f: 'ㅍ', g: 'ㄱ', h: 'ㅎ', j: 'ㅈ', k: 'ㅋ', l: 'ㄹ', m: 'ㅁ', n: 'ㄴ',
                 p: 'ㅍ', r: 'ㄹ', s: 'ㅅ', t: 'ㅌ', v: 'ㅂ', w: 'ㅇ', y: 'ㅇ', z: 'ㅈ' };
var KO_VOWEL = { a: 'ㅐ', e: 'ㅔ', i: 'ㅣ', o: 'ㅏ', u: 'ㅓ' };
var KO_CODA = { b: 'ㅂ', d: 'ㄷ', g: 'ㄱ', m: 'ㅁ', n: 'ㄴ', p: 'ㅍ', t: 'ㅌ', x: 'ㄱㅅ' };

// 한글로 읽기: bad → 밷, cat → 캣, fox → 팍스
var CHO = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
var JUNG = { a: 1, e: 5, i: 20, o: 0, u: 4 };              // ㅐ ㅔ ㅣ ㅏ ㅓ
var JUNG_W = { a: 10, e: 15, i: 16, o: 9, u: 14 };         // 왜 웨 위 와 워
var JUNG_Y = { a: 3, e: 7, i: 20, o: 2, u: 6 };            // 얘 예 이 야 여
var JONG = { b: 17, d: 7, g: 1, m: 16, n: 4, p: 17, t: 19, x: 1 };   // 받침은 소리 나는 대로 (t → ㅅ, p → ㅂ)
function koRead(word) {
  var c = word[0], v = word[1], k = word[2];
  var cho = CHO.indexOf(KO_ONSET[c]);
  var jung = c === 'w' ? JUNG_W[v] : c === 'y' ? JUNG_Y[v] : JUNG[v];
  var s = String.fromCharCode(0xAC00 + (cho * 21 + jung) * 28 + JONG[k]);
  return k === 'x' ? s + '스' : s;
}
function koParts(word) {
  return KO_ONSET[word[0]] + ' + ' + KO_VOWEL[word[1]] + ' + ' + KO_CODA[word[2]];
}
function familyWords(vowel) {
  var out = [];
  FAMILIES[vowel].forEach(function (f) {
    f[1].split('').forEach(function (c) { out.push({ w: c + f[0], rime: f[0], onset: c }); });
  });
  return out;
}
