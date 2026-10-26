// 사이트워드 읽기 데이터 (sight.html, print.html 같이 씀)
// 단어는 누구나 쓰는 Dolch 첫 단계(Pre-Primer) 40개. 문장은 이 앱에서 새로 쓴 것.
// 문장에는 앞에서 배운 사이트워드와, 소리 내어 읽을 수 있는 세 글자 단어(cat, dog...)만 쓴다.
var SIGHT = [
  ['a',     ['A cat.', 'A dog.', 'A hat.', 'A pig.', 'A bug.', 'A hen.']],
  ['I',     ['I sit.', 'I hop.', 'I nap.', 'I dig.', 'I hug.', 'I run.']],
  ['see',   ['I see a cat.', 'I see a dog.', 'I see a pig.', 'I see a fox.', 'I see a sun.', 'I see a bus.']],
  ['the',   ['I see the cat.', 'The dog sits.', 'The cat naps.', 'The fox hops.', 'The pig digs.', 'I see the sun.']],
  ['can',   ['I can sit.', 'I can hop.', 'I can run.', 'I can see the cat.', 'The dog can dig.', 'The fox can hop.']],
  ['like',  ['I like the cat.', 'I like the sun.', 'I like jam.', 'I like the red hat.', 'I like the bus.', 'The dog likes the cat.']],
  ['my',    ['My cat naps.', 'I like my dog.', 'I see my mom.', 'My dad can run.', 'I can see my pen.', 'My pig can dig.']],
  ['is',    ['The cat is red.', 'My hat is red.', 'The sun is hot.', 'The pot is hot.', 'My dog is wet.', 'The fox is red.']],
  ['it',    ['It is a cat.', 'It is my hat.', 'It is hot.', 'I like it.', 'I can see it.', 'It is a red bus.']],
  ['and',   ['I see a cat and a dog.', 'Mom and Dad can run.', 'The hen and the pig sit.', 'I like jam and ham.', 'I can hop and run.', 'The sun is hot and red.']],
  ['you',   ['I see you.', 'You can run.', 'You like my hat.', 'I like you.', 'You can see the fox.', 'Can you hop?']],
  ['me',    ['You see me.', 'Can you see me?', 'My mom hugs me.', 'My dog likes me.', 'You and me can run.', 'You can hug me.']],
  ['look',  ['Look! A cat!', 'Look, it is a fox!', 'I look and I see a bug.', 'Look! The dog can dig.', 'Look, Mom!', 'Look! It is my red bus.']],
  ['at',    ['Look at the cat.', 'Look at me.', 'Look at my hat.', 'I look at the sun.', 'The dog looks at the cat.', 'Can you look at the map?']],
  ['big',   ['It is a big dog.', 'Look at the big pig.', 'My dad is big.', 'I see a big red bus.', 'The big cat naps.', 'Is it big?']],
  ['go',    ['I go.', 'Go, dog, go!', 'You can go.', 'The bus can go.', 'Can you go?', 'I can go and you can go.']],
  ['up',    ['Look up!', 'Go up!', 'The cat can go up.', 'I look up at the sun.', 'Up, up, up!', 'The jet can go up.']],
  ['down',  ['Go down!', 'Look down.', 'The cat can go up and down.', 'Sit down.', 'The dog sits down.', 'I look down at my dog.']],
  ['in',    ['The cat is in the box.', 'The pig is in the mud.', 'I can see a bug in the cup.', 'My pen is in the bag.', 'Go in!', 'It is in my hat.']],
  ['run',   ['I can run.', 'Run, run, run!', 'The dog can run and run.', 'You run up and I run down.', 'Can you run?', 'Look at the fox run.']],
  ['to',    ['Go to the bus.', 'I like to run.', 'I go to the box.', 'Run to me!', 'The dog runs to the cat.', 'I like to see the sun.']],
  ['play',  ['I like to play.', 'Can you play?', 'The cat and the dog play.', 'I play in the sun.', 'Mom and I play.', 'Look at the pig play in the mud.']],
  ['here',  ['Here is my cat.', 'Here is a big bug.', 'Here is the bus.', 'Is it here?', 'My dog is here.', 'Look! Here is my hat.']],
  ['come',  ['Come here!', 'Come and play.', 'Come to me.', 'Can you come?', 'Come and see the big fox.', 'The cat can come in.']],
  ['said',  ['Mom said, "Come here."', 'Dad said, "Go to bed."', 'I said, "Look!"', 'The pig said, "I like mud."', 'You said, "I like it."', 'I said, "Run, dog, run!"']],
  ['we',    ['We can play.', 'We like the sun.', 'We go to the bus.', 'We can see the fox.', 'We run and hop.', 'Come, we can play here.']],
  ['are',   ['We are here.', 'You are big.', 'The pigs are in the mud.', 'We are in the bus.', 'Are you here?', 'The bugs are red.']],
  ['not',   ['It is not a cat.', 'The pot is not hot.', 'We are not big.', 'It is not my hat.', 'You are not in the box.', 'The dog is not here.']],
  ['jump',  ['I can jump.', 'Jump, jump, jump!', 'The cat can jump up.', 'We jump in the mud.', 'Can you jump to me?', 'Look at the fox jump.']],
  ['for',   ['It is for you.', 'Here is a hat for you.', 'Is it for me?', 'The jam is for Mom.', 'We are here for the bus.', 'Look! A cup for my dog.']],
  ['find',  ['I can find my cat.', 'Can you find me?', 'Find the bug!', 'We find a big box.', 'I can not find my hat.', 'Look, we can find a fox!']],
  ['help',  ['Help me!', 'I can help you.', 'Can you help me find my cat?', 'We help Mom.', 'Come and help.', 'The dog can help.']],
  ['make',  ['I can make a hat.', 'We make jam.', 'Can you make a cup?', 'Mom and I make a bed.', 'Make it big!', 'I make a map for you.']],
  ['where', ['Where is my cat?', 'Where are you?', 'Where is the bus?', 'Where can we play?', 'Where is Mom?', 'Where are the pigs?']],
  ['funny', ['It is funny.', 'The pig is funny.', 'You are funny!', 'Look at the funny dog.', 'We see a funny hat.', 'My dad is funny.']],
  ['that',  ['That is my cat.', 'Look at that!', 'Is that a fox?', 'I like that hat.', 'That bug is big.', 'Where is that dog?']],
  ['away',  ['Go away!', 'The cat ran away.', 'The bug can run away.', 'Run away, fox!', 'The jet can go up and away.', 'Look! The dog ran away.']],
  ['went',  ['We went to the bus.', 'I went up.', 'The cat went in the box.', 'Mom went to the van.', 'The fox went away.', 'We went to play.']],
  ['with',  ['Come with me.', 'I play with my dog.', 'We went with Mom.', 'Can you play with me?', 'I can make jam with Dad.', 'The cat is with the dog.']],
  ['need',  ['I need my hat.', 'We need a big box.', 'The dog needs a bed.', 'I need help!', 'You need a cup.', 'Mom needs the map.']]
];

// 소리 내어 읽을 수 있는 낱말 (그림 힌트)
var SIGHT_PICS = {
  cat: '🐱', dog: '🐶', hat: '🎩', pig: '🐷', bug: '🐞', hen: '🐔', fox: '🦊', sun: '☀️', bus: '🚌',
  jam: '🍓', ham: '🍖', red: '🔴', mom: '👩', dad: '👨', pen: '🖊️', pot: '🍲', hot: '🔥', wet: '💦',
  box: '📦', mud: '🟫', cup: '🥤', bag: '👜', map: '🗺️', jet: '✈️', bed: '🛏️', van: '🚐',
  sit: '🪑', hop: '🐇', nap: '😴', dig: '⛏️', hug: '🤗', ran: '🏃'
};
var SIGHT_DECODABLE = Object.keys(SIGHT_PICS).concat(['run', 'pigs', 'bugs']);

function sightTokens(sentence) {
  return sentence.toLowerCase().replace(/[^a-z ]/g, ' ').split(/\s+/).filter(Boolean);
}
// 그 장에서 처음 나오는 그림 낱말
function sightNewPics(idx) {
  var seen = {};
  for (var i = 0; i < idx; i++) SIGHT[i][1].forEach(function (s) { sightTokens(s).forEach(function (t) { seen[t] = 1; }); });
  var out = [];
  SIGHT[idx][1].forEach(function (s) {
    sightTokens(s).forEach(function (t) {
      var base = SIGHT_PICS[t] ? t : (SIGHT_PICS[t.replace(/s$/, '')] ? t.replace(/s$/, '') : null);
      if (base && !seen[base] && out.indexOf(base) < 0) out.push(base);
      seen[t] = 1;
    });
  });
  return out;
}
