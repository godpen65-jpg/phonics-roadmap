// 파닉스 로드맵 소리 (index.html, blend.html, sight.html 같이 씀)
// 녹음 파일이 있으면 원어민 녹음, 없으면 브라우저 음성으로 읽는다.
(function () {
  var supported = 'speechSynthesis' in window;
  var enVoice = null;

  // Real native-speaker recordings (generated via Higgsfield).
  // PH_FILES: isolated grapheme *sounds* (b -> a short "b" sound, not the word "bee").
  // WORD_FILES: full real words used elsewhere on the page (example words, sight words, etc).
  // Falls back to browser TTS for anything not covered by either map.
  var AUDIO_BASE = "https://d8j0ntlcm91z4.cloudfront.net/user_3GqZcHoywjFz5HqKOvMDvy8580Y/hf_";
  var WORD_FILES = {
    bus:"20260724_034300_aa0f424e-9254-45e8-9e71-0c827967b37c",cat:"20260724_034335_a8f53eff-8863-4526-b390-d7a8e96ed5b0",
    dog:"20260724_034340_3deff7b6-fbb3-4557-b014-3ab2bb7cb7cf",fan:"20260724_034357_f3ef2903-e23a-4ee7-8c3e-a2a07057ee1a",
    gum:"20260724_034458_e3ab3a3e-27cd-48f8-9ca1-ed7d1bbc98cd",hat:"20260724_034502_6e1b6580-8db7-486d-a36b-e79acbcdf8ef",
    jam:"20260724_034505_3e8b66bc-95ae-4972-ac64-42c1395efd8b",kite:"20260724_034509_4fd34ab6-320a-4cfc-a377-b9a365e01d76",
    leg:"20260724_034513_71d0bb56-9f30-4fc8-95f1-0912726ffa85",map:"20260724_034516_dbf21ef4-c4c5-4b7d-8598-6e4376055613",
    nose:"20260724_034526_c74628b1-45ec-4d8b-a269-07cf7d7fe658",pen:"20260724_034533_9311d66f-3dda-4e3f-8cc5-d3eef407d4b8",
    queen:"20260724_034536_9d4ee6fc-e9d5-4164-a470-fd0ca01947a0",run:"20260724_034544_c83d993e-794d-4b89-87b6-3840ce8fec5a",
    sun:"20260724_034548_92be191e-980f-498e-b037-2acd82d0c32c",top:"20260724_034551_e7ac549e-af4b-47ae-9c4b-09493713f346",
    van:"20260724_034555_f87ac9cb-48df-403f-ae21-fa81f585544e",web:"20260724_034558_1f703f44-9c15-4cc1-a910-1825506dfab9",
    box:"20260724_034604_5d76e123-b90d-444c-87d6-f519a3515e26",yes:"20260724_034608_b4960921-ac58-4ea9-bcb8-63ba148126a0",
    zoo:"20260724_034612_a6868e11-6855-4585-8cfa-003f33c07b48",bed:"20260724_034616_bd4237e7-4e6e-46af-a6d5-01eabde04dc9",
    pig:"20260724_034620_ec813eba-4da1-49d1-8f22-0e8ca042351c",ship:"20260724_034627_88578b5d-f371-4ea8-997e-886e43091492",
    chip:"20260724_034630_7219be4a-77d2-4897-89fd-6e85add0b3b1",this:"20260724_034633_a44594af-5b50-4330-b5be-23e35ead9b7f",
    whale:"20260724_034636_a5614322-6ec0-405e-97ed-ca4bf28cef03",back:"20260724_034639_1c1db6a6-030c-4dca-b5ef-925c11c482ef",
    ring:"20260724_034646_b0bdc31b-407a-4d3b-8459-1e24637e7803",black:"20260724_034653_f5c43a45-75f0-4ff2-a58f-5beb9d9324c3",
    clap:"20260724_034656_b02fefdd-a2ce-4544-83cd-b27c8ae6b759",flag:"20260724_034659_c044877f-bab6-4363-b599-b10eb5c040ec",
    glad:"20260724_034703_5258eef3-8b14-403f-b501-c65be7b3d316",plan:"20260724_034706_3a0eb07d-6432-4e0e-994f-13501ad9b740",
    sled:"20260724_034709_122c4c42-3714-407e-b8e5-afba4245e7e8",brush:"20260724_034718_24c66351-cfe4-4dd1-a507-e37a639b06dd",
    crab:"20260724_034721_3d3157e5-37dd-493d-891f-7e2b418e120e",drum:"20260724_034724_8c05aef3-1967-47e5-9e08-295e9e00d8a7",
    frog:"20260724_034728_44d6cb88-3128-498b-a1cf-e88f35dedd0a",green:"20260724_034730_06a612db-6d31-49ad-b4fc-5bccfe1db551",
    prize:"20260724_034734_3d958297-f75f-4174-9f63-810f2d2e2c8d",train:"20260724_034740_d3171853-6662-401a-9bcd-53cfafab334d",
    scan:"20260724_034747_727321de-e5bd-41a4-9194-f0ae634ca914",skip:"20260724_034750_5f2c75e2-7ce1-4e98-9c26-24d5d7e3b23e",
    smile:"20260724_034902_35da0d21-221c-4cba-a7ce-bf27827b7d2f",snake:"20260724_034905_d2779a03-d63a-4d89-9c09-72bbebacf54d",
    spin:"20260724_034909_209e2445-aed5-4f50-9fd0-fc1201babc22",stop:"20260724_034912_31ce3b52-f7ac-48d2-a8fe-e20a3804330d",
    swim:"20260724_034916_cab0034b-3bf8-486d-b801-82a76a1cb1e3",at:"20260724_035050_919f9932-931c-4b85-a746-ef88a3818a65",
    hop:"20260724_035054_ef55e67b-391e-4e0f-9a58-fc6db9a8621f",net:"20260724_035057_b2593b37-5b68-4da1-9142-94cd0fb566e6",
    fox:"20260724_035100_00e41085-9ba7-4c53-85a4-7adc9f73b0e2",cap:"20260724_035104_6a8152e1-5d7f-454a-98a4-a336797e6e4b",
    cape:"20260724_035107_6690adc6-1c71-4f81-97c7-8ce7dfa724b1",kit:"20260724_035119_2bb54dba-0faa-47fa-abb6-8170953f6221",
    hope:"20260724_035122_a904669b-4be5-4118-8e4f-4b1f23121fdb",cut:"20260724_035131_6aa5e84d-d722-4aab-9db4-8c3331bca41b",
    cute:"20260724_035135_18f1ead2-834e-4593-a6e8-955b83d496a2",pin:"20260724_035138_c7ac9c75-73dc-4389-8f18-fe65931a4db9",
    pine:"20260724_035141_f8417b16-f29b-43e1-8dd2-68aa31e5fcfd",rain:"20260724_035146_bd63f3f4-e87a-45c4-b9bd-c56bded213f8",
    day:"20260724_035149_edb770a9-9dd9-4002-9c9b-77d07c8c7f43",tree:"20260724_035201_49807111-1aa9-49c9-9213-b8521d10e1ac",
    eat:"20260724_035204_4810e80e-6ba1-4ff6-9833-261265106c84",boat:"20260724_035207_02c57b03-e061-4bf0-a04e-efbde4cdfec6",
    snow:"20260724_035211_0a2e91b8-ca14-45a7-b886-b8c2417ac4c0",moon:"20260724_035215_b1c6f432-b49f-4d92-b285-127014d9e165",
    book:"20260724_035221_1276367f-59bb-44b3-be63-6edfd4e6773c",out:"20260724_035225_9217fe20-5873-4e9a-8ebc-a9b5f3c85839",
    cow:"20260724_035229_327e7062-d563-402e-b7b8-da37baff2786",coin:"20260724_035232_b5166d60-8e9e-4cb8-b292-98ee9cf6721f",
    boy:"20260724_035236_c1761bc7-6e95-4a47-a7d2-0c5b1c2681d1",light:"20260724_035239_0f42fee7-83f6-438a-9c67-c9ab98bfcbf8",
    night:"20260724_035242_0633bd13-4859-45f1-8abc-3535a6427de3",car:"20260724_035248_cc225121-8de4-4cf5-ab5c-3d25a8a90ec1",
    star:"20260724_035252_c133412c-776f-43b2-b8ac-bdc4dc728622",her:"20260724_035255_bfcc4dd5-a8bd-4f5c-8ed5-d2778232395f",
    bird:"20260724_035258_0e78bbc9-7300-4f7a-83ba-ea58d3df0f58",turn:"20260724_035302_5fa49a54-d698-4c50-8fcf-0dfd4801e104",
    corn:"20260724_035305_3c67ae4c-136d-4ff1-aeb5-1fc3bf7f66a6",for:"20260724_035313_d715b50f-9391-4393-aa7c-dfc2a32ff0a3",
    the:"20260724_035317_b4398f76-25a7-44cc-a438-8990480e1f6a",said:"20260724_035321_91ae3135-db20-497d-8c73-c0c7c648d9c8",
    was:"20260724_035325_346fdf45-33d6-4db8-ace2-f456b826a19c",of:"20260724_035329_27c531bb-3032-4279-9e1a-6bb01ffb2d9c",
    one:"20260724_035333_6a41b28b-531d-4031-9cea-e71cd2986ef7",to:"20260724_035336_5fff87ad-c0ec-445f-ad80-5a89e9c0fd1a",
    do:"20260724_035340_e22af3c8-d1eb-452b-a49a-86dcb2c8ebc0",are:"20260724_035343_39b819a8-bfc9-4842-9ab1-b31a8d2e8f86",
    come:"20260724_035346_09b7e1b4-d2e6-4b70-8a02-bb1992180288",you:"20260724_035818_c4ea7d54-9ea8-4966-ada4-373ddbb56b32"
  };
  var PH_FILES = {
    b:"20260724_044959_26e86207-34dc-4777-8b50-d5e5345f0eda",
    c:"20260725_003216_645427d2-7c6f-49c1-a3d9-796c65e98b2b",
    k:"20260725_003216_645427d2-7c6f-49c1-a3d9-796c65e98b2b",
    ck:"20260725_003216_645427d2-7c6f-49c1-a3d9-796c65e98b2b",
    d:"20260725_003220_25e4934b-5593-4fda-8972-c9dae569db77",
    f:"20260725_003223_ae1e3bd2-3fa2-4fd8-93d2-a11adaefc233",
    g:"20260725_003227_206638e0-2e38-4788-9134-94344b171ec0",
    h:"20260725_003231_5046c0e4-7b66-487c-8cf6-a2d74c31219a",
    j:"20260725_003234_3e892a90-9675-4c0f-bfd7-26471e8719dc",
    l:"20260725_003237_bca70846-55e3-454e-8a15-332f3f0a5788",
    r:"20260725_003237_bca70846-55e3-454e-8a15-332f3f0a5788",
    m:"20260725_003241_8a7e1bc3-c5ea-4205-a5f9-533e907efb0a",
    n:"20260725_003250_64f2645c-f039-49b2-86ce-5b84e92b330e",
    p:"20260725_003254_3d9822f2-5cad-441d-9a1a-374dca222364",
    qu:"20260725_003302_99bfc8a5-69e6-49c2-ba5d-49751c373092",
    s:"20260724_044513_664b67ef-ca6a-4fef-86c0-7baeff0292f9",
    t:"20260725_003305_4c9fed1c-7b97-4a28-bda9-4d1ea3484d51",
    v:"20260725_003309_80d0a1dc-75ab-49a5-9112-f9d6cc5a67c2",
    w:"20260725_003313_cae0ca67-9545-45ec-a250-5d4767c09ab8",
    x:"20260724_045424_7c914e24-81ac-4b85-9e9a-7e9d84915478",
    y:"20260725_003317_639fb3fc-46a5-417a-90db-6824d4522fee",
    z:"20260725_003320_8311ea24-224d-4cf9-b39d-a6ab37093f49",
    a:"20260724_044817_c01aee04-f4a0-474a-97b4-5a8a29854e5d",
    e:"20260725_003325_3d928fce-134f-4767-8452-fdedbc1e8c45",
    i:"20260725_003328_4958fa20-2cc5-4b4a-802e-4c5edcd52f04",
    o:"20260725_003334_e4b83c28-e91d-4f25-a63a-166681bdf926",
    u:"20260725_003900_328eb967-e2a0-4d32-a663-d7f7bcc478bf",
    sh:"20260725_003342_870b262b-ac13-46ff-8868-b1e4821aa57c",
    ch:"20260725_003346_af8d625e-c102-48a7-acaf-33583f6bebad",
    th:"20260725_003350_fdcd657a-8c03-4b79-a082-9daa75ca7521",
    wh:"20260725_003354_0fee9615-b8a9-44b7-8f0f-f8782b5d9ad6",
    ng:"20260724_044521_de5f9799-11c2-4884-b50f-1f74344c4677",
    bl:"20260725_003358_155ed6a5-3d13-41e0-a7a0-1950273a67e7",
    cl:"20260725_003401_076fb440-0a29-494f-9cb0-23ea365aeedc",
    fl:"20260725_003408_59ea5878-91da-4fb0-979f-77448828bb2c",
    pl:"20260725_003408_59ea5878-91da-4fb0-979f-77448828bb2c",
    gl:"20260725_003412_cce5966b-1991-4795-828b-480791c02b2f",
    sl:"20260725_003419_8532f834-7fa1-4a3d-b3d6-4082673b8d17",
    br:"20260725_003423_8af6c3b4-bcf5-4052-91c5-64497becc5af",
    cr:"20260725_003427_8e600a20-f54b-4f4c-9e35-70959651af91",
    dr:"20260725_003434_27763887-9af1-477f-8abe-50022e2dc703",
    fr:"20260725_003437_4b097193-6664-4452-be8d-643bc7b1dd8f",
    pr:"20260725_003437_4b097193-6664-4452-be8d-643bc7b1dd8f",
    gr:"20260725_003440_120bf8ff-6d04-482d-8580-0ee97e636530",
    tr:"20260725_003443_b543f1eb-ce5a-4231-8e71-d525bdd9ad0a",
    sc:"20260725_003456_80739ce6-b767-4395-a276-d4ae2f2518dc",
    sk:"20260725_003456_80739ce6-b767-4395-a276-d4ae2f2518dc",
    sm:"20260725_003501_48354dfb-b03b-40da-8bd1-6c092de17994",
    sn:"20260725_003504_770931cf-f8fe-4985-9246-37c9dd0c5e5b",
    sp:"20260725_003508_ab0d98e9-6e9e-44d8-8358-b6fb41b6f157",
    st:"20260725_003511_88a20cbe-5ad5-404f-8e6c-f7f025c4b139",
    sw:"20260725_003515_a54d77aa-1259-43e4-94a8-9d1e76ad8ae0"
  };
  var realAudio = new Audio();

  var koVoice = null;
  // A few graphemes came back sounding wrong/garbled from the generated English audio;
  // for those, read the Korean approximation (already shown on the chip) instead.
  var KO_OVERRIDE = {
    d: '드', j: '즈', n: '은',
    bl: '블', cl: '클', fl: '플', gl: '글', pl: '플',
    br: '브르', cr: '크르', dr: '드르', fr: '프르', gr: '그르', pr: '프르', tr: '트르',
    sc: '스크', sk: '스크', sm: '스므', sn: '스느', sp: '스프', st: '스트', sw: '스워',
    tw: '트워',
    scr: '스크르', spl: '스플', spr: '스프르', squ: '스쿼', str: '스트르', thr: '뜨르', shr: '쉬르'
  };

  function pickVoice() {
    if (!supported) return;
    var voices = window.speechSynthesis.getVoices();
    // Prefer known high-quality neural voices (same heuristic as the wordup400 app);
    // plain "any en-US voice" often picks a low-quality robotic default on some devices.
    enVoice = voices.find(function (v) { return /en[-_]US/i.test(v.lang) && /google|natural|aria|jenny|zira/i.test(v.name); }) ||
              voices.find(function (v) { return /en[-_]US/i.test(v.lang); }) ||
              voices.find(function (v) { return /^en/i.test(v.lang); }) ||
              null;
    koVoice = voices.find(function (v) { return /ko/i.test(v.lang); }) || null;
  }
  if (supported) {
    pickVoice();
    window.speechSynthesis.onvoiceschanged = pickVoice;
  }

  function speakFallback(word, cb) {
    if (!supported) { cb(); return; }
    var u = new SpeechSynthesisUtterance(word);
    u.lang = 'en-US';
    u.rate = 0.85;
    if (enVoice) u.voice = enVoice;
    u.onend = cb;
    u.onerror = cb;
    window.speechSynthesis.speak(u);
  }

  function speakKorean(text, el) {
    var done = function () { if (el) el.classList.remove('speaking'); };
    if (!supported) { done(); return; }
    var u = new SpeechSynthesisUtterance(text);
    u.lang = 'ko-KR';
    u.rate = 0.85;
    if (koVoice) u.voice = koVoice;
    u.onend = done;
    u.onerror = done;
    window.speechSynthesis.speak(u);
  }

  function playQueue(items, el, i) {
    i = i || 0;
    if (i >= items.length) {
      if (el) el.classList.remove('speaking');
      return;
    }
    var item = items[i];
    var next = function () { playQueue(items, el, i + 1); };
    var fname = (item.type === 'ph' ? PH_FILES : WORD_FILES)[item.key];
    if (fname) {
      realAudio.onended = next;
      realAudio.onerror = function () { speakFallback(item.key, next); };
      realAudio.src = AUDIO_BASE + fname + '.mp3';
      realAudio.play().catch(function () { speakFallback(item.key, next); });
    } else {
      speakFallback(item.key, next);
    }
  }

  function say(rawText, el) {
    if (!rawText) return;
    if (supported) window.speechSynthesis.cancel();
    realAudio.pause();
    if (el) {
      document.querySelectorAll('.speaking').forEach(function (n) { n.classList.remove('speaking'); });
      el.classList.add('speaking');
    }
    // Bare grapheme codes (b, sh, bl, ...) get the isolated *sound*; a few of
    // those came back wrong from the generated audio, so those read the Korean
    // approximation instead; everything else (real words, comma-joined example
    // lists) plays as real word audio.
    if (KO_OVERRIDE.hasOwnProperty(rawText)) {
      speakKorean(KO_OVERRIDE[rawText], el);
      return;
    }
    if (PH_FILES.hasOwnProperty(rawText)) {
      playQueue([{ type: 'ph', key: rawText }], el, 0);
      return;
    }
    var words = rawText.split(',').map(function (s) { return s.trim().toLowerCase(); }).filter(Boolean);
    playQueue(words.map(function (w) { return { type: 'word', key: w }; }), el, 0);
  }


  // 문장은 녹음이 없어서 브라우저 음성으로 읽는다
  function sentence(text, el, cb) {
    if (supported) window.speechSynthesis.cancel();
    realAudio.pause();
    if (el) el.classList.add('speaking');
    var done = function () { if (el) el.classList.remove('speaking'); if (cb) cb(); };
    if (!supported) { done(); return; }
    var u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.8;
    if (enVoice) u.voice = enVoice;
    u.onend = done;
    u.onerror = done;
    window.speechSynthesis.speak(u);
  }

  // 소리 조각을 차례로: [{type:'ph', key:'b'}, {type:'word', key:'bad'}]
  // KO_OVERRIDE 조각은 칩에 적힌 한국어 소리로 읽는다
  function seq(items, el, cb) {
    stop();
    if (el) el.classList.add('speaking');
    var i = 0;
    var step = function () {
      if (i >= items.length) { if (el) el.classList.remove('speaking'); if (cb) cb(); return; }
      var it = items[i++];
      var next = function () { setTimeout(step, 250); };
      if (it.type === 'ph' && KO_OVERRIDE.hasOwnProperty(it.key)) {
        if (!supported) { next(); return; }
        var u = new SpeechSynthesisUtterance(KO_OVERRIDE[it.key]);
        u.lang = 'ko-KR'; u.rate = 0.85;
        if (koVoice) u.voice = koVoice;
        u.onend = next; u.onerror = next;
        window.speechSynthesis.speak(u);
        return;
      }
      var fname = (it.type === 'ph' ? PH_FILES : WORD_FILES)[it.key];
      if (!fname) { speakFallback(it.key, next); return; }
      realAudio.onended = next;
      realAudio.onerror = function () { speakFallback(it.key, next); };
      realAudio.src = AUDIO_BASE + fname + '.mp3';
      realAudio.play().catch(function () { speakFallback(it.key, next); });
    };
    step();
  }

  function stop() { if (supported) window.speechSynthesis.cancel(); realAudio.pause(); }

  // 낱말로 읽기 (a, I 처럼 글자 소리와 겹치는 낱말도 낱말 소리로)
  function word(w, el, cb) { seq([{ type: 'word', key: w }], el, cb); }

  window.Sound = { say: say, sentence: sentence, seq: seq, word: word, stop: stop, supported: supported,
                   hasWord: function (w) { return WORD_FILES.hasOwnProperty(w); } };
})();
