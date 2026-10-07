const BOOKS = [
  ["genesis","Genesis",50],["exodus","Exodus",40],["leviticus","Leviticus",27],
  ["numbers","Numbers",36],["deuteronomy","Deuteronomy",34],["joshua","Joshua",24],
  ["judges","Judges",21],["ruth","Ruth",4],["1-samuel","1 Samuel",31],
  ["2-samuel","2 Samuel",24],["1-kings","1 Kings",22],["2-kings","2 Kings",25],
  ["1-chronicles","1 Chronicles",29],["2-chronicles","2 Chronicles",36],
  ["ezra","Ezra",10],["nehemiah","Nehemiah",13],["esther","Esther",10],
  ["job","Job",42],["psalms","Psalms",150],["proverbs","Proverbs",31],
  ["ecclesiastes","Ecclesiastes",12],["song-of-solomon","Song of Solomon",8],
  ["isaiah","Isaiah",66],["jeremiah","Jeremiah",52],["lamentations","Lamentations",5],
  ["ezekiel","Ezekiel",48],["daniel","Daniel",12],["hosea","Hosea",14],
  ["joel","Joel",3],["amos","Amos",9],["obadiah","Obadiah",1],
  ["jonah","Jonah",4],["micah","Micah",7],["nahum","Nahum",3],
  ["habakkuk","Habakkuk",3],["zephaniah","Zephaniah",3],["haggai","Haggai",2],
  ["zechariah","Zechariah",14],["malachi","Malachi",4],
  ["matthew","Matthew",28],["mark","Mark",16],["luke","Luke",24],
  ["john","John",21],["acts","Acts",28],["romans","Romans",16],
  ["1-corinthians","1 Corinthians",16],["2-corinthians","2 Corinthians",13],
  ["galatians","Galatians",6],["ephesians","Ephesians",6],
  ["philippians","Philippians",4],["colossians","Colossians",4],
  ["1-thessalonians","1 Thessalonians",5],["2-thessalonians","2 Thessalonians",3],
  ["1-timothy","1 Timothy",6],["2-timothy","2 Timothy",4],["titus","Titus",3],
  ["philemon","Philemon",1],["hebrews","Hebrews",13],["james","James",5],
  ["1-peter","1 Peter",5],["2-peter","2 Peter",3],["1-john","1 John",5],
  ["2-john","2 John",1],["3-john","3 John",1],["jude","Jude",1],
  ["revelation","Revelation",22]
];
const BOOK_COVER = {"genesis":"photo-1441974230815-cc6e0d4b3b3a","exodus":"photo-1473580044384-7ba9967e16a0","leviticus":"photo-1518684079-3c830dcef090","numbers":"photo-1509316785289-025f5b846b35","deuteronomy":"photo-1469474968028-56623f02e42e","joshua":"photo-1506905925346-21bda4d32df4","judges":"photo-1464822759023-fed622ff2c3b","ruth":"photo-1464226184884-fa280b87c399","1-samuel":"photo-1482192505345-5656af4ab2b4","2-samuel":"photo-1470071459604-3b5ec3a7fe05","1-kings":"photo-1552832230-c0197dd311b5","2-kings":"photo-1542401889-2edc1e369b0c","1-chronicles":"photo-1500534314209-a25ddb2bd429","2-chronicles":"photo-1472214103451-9374bd1c798e","ezra":"photo-1514565131-fce0801d0b52","nehemiah":"photo-1511818966892-d7d671e672a2","esther":"photo-1519681393784-d120267933ba","job":"photo-1419242902214-272b3f66ee7a","psalms":"photo-1507525428034-b723cf961d3e","proverbs":"photo-1447752877765-59780d0d04f2","ecclesiastes":"photo-1493246507130-2bbda1f8871f","song-of-solomon":"photo-1462275646964-a0e33847b0a0","isaiah":"photo-1483728642387-6c3bdd17e60","jeremiah":"photo-1470116945706-e6bf5d5a76ca","lamentations":"photo-1478760329108-5c3ed9d495a0","ezekiel":"photo-1534445867742-43195f401b6c","daniel":"photo-1518837695005-2083093ee35b","hosea":"photo-1500530855697-b586d89ba3ee","joel":"photo-1502082553048-f009c37129b9","amos":"photo-1470252640268-40c871d0280a","obadiah":"photo-1426604966848-d7adac402bff","jonah":"photo-1439066619973-11c14eec78d1","micah":"photo-1501785888041-af3ef285b470","nahum":"photo-1475924156734-496f6cac6ec1","habakkuk":"photo-1418065460487-3e41a6c84dc5","zephaniah":"photo-1444080744255-d19ae4c5e38c","haggai":"photo-1482192505345-5656af4ab2b4","zechariah":"photo-1495616811223-4d98c6e9c869","malachi":"photo-1414609245224-afa02bfb3fda","matthew":"photo-1500534314209-a25ddb2bd429","mark":"photo-1507525428034-b723cf961d3e","luke":"photo-1464226184884-fa280b87c399","john":"photo-1419242902214-272b3f66ee7a","acts":"photo-1469474968028-56623f02e42e","romans":"photo-1473580044384-7ba9967e16a0","1-corinthians":"photo-1509316785289-025f5b846b35","2-corinthians":"photo-1506905925346-21bda4d32df4","galatians":"photo-1464822759023-fed622ff2c3b","ephesians":"photo-1519681393784-d120267933ba","philippians":"photo-1447752877765-59780d0d04f2","colossians":"photo-1472214103451-9374bd1c798e","1-thessalonians":"photo-1502082553048-f009c37129b9","2-thessalonians":"photo-1426604966848-d7adac402bff","1-timothy":"photo-1501785888041-af3ef285b470","2-timothy":"photo-1475924156734-496f6cac6ec1","titus":"photo-1418065460487-3e41a6c84dc5","philemon":"photo-1444080744255-d19ae4c5e38c","hebrews":"photo-1518684079-3c830dcef090","james":"photo-1470252640268-40c871d0280a","1-peter":"photo-1439066619973-11c14eec78d1","2-peter":"photo-1493246507130-2bbda1f8871f","1-john":"photo-1518837695005-2083093ee35b","2-john":"photo-1470116945706-e6bf5d5a76ca","3-john":"photo-1478760329108-5c3ed9d495a0","jude":"photo-1534445867742-43195f401b6c","revelation":"photo-1419242902214-272b3f66ee7a"};
const MAX_SPAN = 5;
const MOOD_BOOKS = {
  gospel: ["matthew","mark","luke","john"],
  wisdom: ["job","psalms","proverbs","ecclesiastes","song-of-solomon","james"],
  lament: ["job","psalms","lamentations","jeremiah","hosea","habakkuk"],
  promise: ["genesis","isaiah","jeremiah","ezekiel","john","romans","hebrews","revelation"],
  command: ["exodus","leviticus","deuteronomy","matthew","romans","james"]
};
const MOOD_WORDS = {
  lament: /\b(woe|weep|tears|desolate|afflict|mourn|sorrow|grief|cry|anguish|broken)\b/i,
  promise: /\b(i will|shall|covenant|everlasting|eternal|inherit|reward|my word)\b/i,
  command: /\b(thou shalt|you shall|go ye|keep|beware|do not|hear ye)\b/i,
  gospel: /\b(jesus|christ|kingdom|disciple|gospel|believe|son of man)\b/i,
  wisdom: /\b(wisdom|proverb|understanding|fool|prudent|instruction)\b/i
};
const LS = { saves:"ss_saves", mode:"ss_mode", mood:"ss_mood", path:"ss_path", streak:"ss_streak" };
function load(key, fallback){
  try { const v = JSON.parse(localStorage.getItem(key)); return v == null ? fallback : v; }
  catch(_){ return fallback; }
}
function save(key, val){ try { localStorage.setItem(key, JSON.stringify(val)); } catch(_){} }
function coverUrl(slug){ return "covers/"+slug+".jpg"; }
function coverFallback(slug){
  const id = BOOK_COVER[slug] || "photo-1473580044384-7ba9967e16a0";
  return "https://images.unsplash.com/"+id+"?auto=format&fit=crop&w=900&h=1600&q=70";
}
function shuffle(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    const t=a[i]; a[i]=a[j]; a[j]=t;
  }
  return a;
}
function verseText(v){ return String((v && v.t) || "").replace(/\s+/g," ").trim(); }
function endsSentence(s){ return /[.!?]["']?$/.test(s); }
function completeSpan(verses, idx){
  let start = idx, end = idx;
  while(start > 0 && (end - start + 1) < MAX_SPAN && !endsSentence(verseText(verses[start-1]))) start--;
  while(end < verses.length-1 && (end - start + 1) < MAX_SPAN && !endsSentence(verseText(verses[end]))) end++;
  const parts = [];
  for(let i=start;i<=end;i++){ const t = verseText(verses[i]); if(t) parts.push(t); }
  return { text: parts.join(" "), v1: verses[start].v, v2: verses[end].v, nextIdx: end + 1 };
}
function todayKey(){
  const d = new Date();
  return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
}
function hash(s){
  let h = 2166136261;
  for(let i=0;i<s.length;i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function touchStreak(){
  const today = todayKey();
  const st = load(LS.streak, { days:0, last:"" });
  if(st.last === today) return st.days;
  const y = new Date(); y.setDate(y.getDate()-1);
  const yk = y.getFullYear()+"-"+String(y.getMonth()+1).padStart(2,"0")+"-"+String(y.getDate()).padStart(2,"0");
  const days = st.last === yk ? (st.days||0)+1 : 1;
  save(LS.streak, { days, last: today });
  return days;
}
const feed = document.getElementById("feed");
const progress = document.getElementById("progress");
const toast = document.getElementById("toast");
const hint = document.getElementById("hint");
const saveBtn = document.getElementById("save");
let buffer=[], loading=false, shown=0, dailyDone=false;
let deck = [];
let lastSlug = "";
let mode = load(LS.mode, "shuffle");
let mood = load(LS.mood, "all");
let path = load(LS.path, { i:0, ch:1, idx:0 });
let saves = load(LS.saves, []);
let saveCursor = 0;
const seen = new Set();
const streakDays = touchStreak();
function pool(){
  if(mood === "all") return BOOKS;
  const slugs = new Set(MOOD_BOOKS[mood] || []);
  const p = BOOKS.filter(b => slugs.has(b[0]));
  return p.length ? p : BOOKS;
}
function fitsMood(text, slug){
  if(mood === "all") return true;
  if((MOOD_BOOKS[mood]||[]).includes(slug)) return true;
  return MOOD_WORDS[mood] ? MOOD_WORDS[mood].test(text) : true;
}
function nextShufflePick(){
  const src = pool();
  if(!deck.length){
    deck = shuffle(src);
    if(deck.length > 1 && deck[0][0] === lastSlug) deck.push(deck.shift());
  }
  const b = deck.shift();
  lastSlug = b[0];
  return { slug:b[0], name:b[1], ch: 1+Math.floor(Math.random()*b[2]), idx: -1 };
}
function nextPathPick(){
  if(path.i < 0 || path.i >= BOOKS.length) path.i = 0;
  const b = BOOKS[path.i];
  if(path.ch < 1 || path.ch > b[2]) { path.ch = 1; path.idx = 0; }
  lastSlug = b[0];
  return { slug:b[0], name:b[1], ch: path.ch, idx: path.idx||0 };
}
function advancePath(span, chapterLen){
  let idx = span.nextIdx, ch = path.ch, i = path.i;
  if(idx >= chapterLen){
    idx = 0; ch += 1;
    if(ch > BOOKS[i][2]){ ch = 1; i = (i+1) % BOOKS.length; }
  }
  path = { i, ch, idx };
  save(LS.path, path);
}
async function fetchChapter(slug,ch){
  const res = await fetch("https://free.bible/bible/kjv/"+slug+"/"+ch+".json");
  if(!res.ok) return [];
  const data = await res.json();
  return data.verses || [];
}
function makeItem(pick, span, extra){
  const ref = span.v1 === span.v2
    ? pick.name+" "+pick.ch+":"+span.v1
    : pick.name+" "+pick.ch+":"+span.v1+"\u2013"+span.v2;
  return Object.assign({ ref, text: span.text, slug: pick.slug, book: pick.name }, extra||{});
}
async function dailyItem(){
  const seed = hash("ss-daily-"+todayKey());
  const b = BOOKS[seed % BOOKS.length];
  const ch = 1 + (seed % b[2]);
  const verses = await fetchChapter(b[0], ch);
  if(!verses.length) return null;
  const span = completeSpan(verses, seed % verses.length);
  return makeItem({ slug:b[0], name:b[1], ch }, span, { badge:"today" });
}
async function fillBuffer(){
  if(loading) return;
  loading = true;
  try {
    if(mode === "saves"){
      if(!saves.length){ loading = false; return; }
      while(buffer.length < 6){
        const item = saves[saveCursor % saves.length];
        saveCursor++;
        buffer.push(Object.assign({}, item, { badge:"saved" }));
        if(saveCursor > saves.length * 3) break;
      }
      loading = false;
      return;
    }
    let attempts = 0;
    while(buffer.length < 8 && attempts < 14){
      attempts++;
      const pick = mode === "path" ? nextPathPick() : nextShufflePick();
      const verses = await fetchChapter(pick.slug, pick.ch);
      if(!verses.length){
        if(mode === "path") advancePath({ nextIdx: 9999 }, 1);
        continue;
      }
      const idx = pick.idx >= 0 ? Math.min(pick.idx, verses.length-1) : Math.floor(Math.random()*verses.length);
      const span = completeSpan(verses, idx);
      if(!span.text) continue;
      if(!fitsMood(span.text, pick.slug) && mode !== "path") continue;
      const key = pick.name+":"+pick.ch+":"+span.v1+"-"+span.v2;
      if(seen.has(key)){
        if(mode === "path") advancePath(span, verses.length);
        continue;
      }
      seen.add(key);
      buffer.push(makeItem(pick, span));
      if(mode === "path") advancePath(span, verses.length);
    }
  } catch(e){ console.error(e); }
  loading = false;
}
function isSaved(ref){ return saves.some(s => s.ref === ref); }
function visibleCard(){
  const cards = feed.children;
  let best = cards[0], bestDist = Infinity;
  for(const c of cards){
    const d = Math.abs(c.getBoundingClientRect().top);
    if(d < bestDist){ bestDist = d; best = c; }
  }
  return best;
}
function syncHeart(){
  const card = visibleCard();
  saveBtn.classList.toggle("on", !!(card && isSaved(card.dataset.ref)));
}
function makeCard(item){
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.ref = item.ref;
  card.dataset.text = item.text;
  card.dataset.slug = item.slug;
  card.dataset.book = item.book || "";
  const badge = item.badge ? "<span class=\"badge\">"+item.badge+"</span>" : "";
  card.innerHTML =
    '<img class="scene" alt="" src="'+coverUrl(item.slug)+'" data-slug="'+item.slug+'" onerror="if(!this.dataset.fb){this.dataset.fb=1;this.src=coverFallback(this.dataset.slug);}else{this.style.display=\'none\';}">' +
    '<div class="content"><div class="ref">'+item.ref+badge+'</div><p class="verse">'+item.text+'</p></div>';
  return card;
}
function flash(msg){
  toast.textContent = msg;
  toast.classList.add("on");
  setTimeout(()=>toast.classList.remove("on"), 1400);
}
function label(){
  const bits = ["KJV", mode, mood === "all" ? "" : mood];
  if(streakDays) bits.push(streakDays+"d");
  bits.push(shown+" drawn");
  progress.textContent = bits.filter(Boolean).join(" · ");
}
function anchorPathToCard(card){
  if(!card || !card.dataset.slug) return false;
  const i = BOOKS.findIndex(b => b[0] === card.dataset.slug);
  if(i < 0) return false;
  const nums = (card.dataset.ref || "").match(/\d+/g) || [];
  const ch = nums.length >= 2 ? +nums[nums.length-2] : 1;
  const endV = nums.length ? +nums[nums.length-1] : 1;
  path = { i, ch, idx: endV };
  save(LS.path, path);
  lastSlug = card.dataset.slug;
  seen.add(card.dataset.slug+":"+ch+":"+endV);
  return true;
}
async function shareCurrent(){
  const card = visibleCard();
  if(!card || !card.dataset.ref) return;
  const payload = card.dataset.ref + " (KJV)\n" + card.dataset.text + "\n" + location.href;
  try {
    if(navigator.share) await navigator.share({ title: card.dataset.ref + " — KJV", text: payload });
    else { await navigator.clipboard.writeText(payload); flash("copied"); }
  } catch(e){
    if(e && e.name === "AbortError") return;
    try { await navigator.clipboard.writeText(payload); flash("copied"); }
    catch(_){ flash("could not share"); }
  }
}
function toggleSave(){
  const card = visibleCard();
  if(!card || !card.dataset.ref) return;
  const ref = card.dataset.ref;
  if(isSaved(ref)){
    saves = saves.filter(s => s.ref !== ref);
    flash("removed");
  } else {
    saves.unshift({ ref, text: card.dataset.text, slug: card.dataset.slug, book: card.dataset.book, ts: Date.now() });
    if(saves.length > 200) saves = saves.slice(0,200);
    flash("saved");
  }
  save(LS.saves, saves);
  syncHeart();
}
function resetFeed(){
  feed.innerHTML = "";
  buffer = [];
  seen.clear();
  shown = 0;
  dailyDone = mode !== "shuffle";
  deck = [];
  saveCursor = 0;
  appendCards(mode === "saves" ? Math.min(6, Math.max(1, saves.length)) : 6);
}
document.getElementById("share").addEventListener("click", shareCurrent);
saveBtn.addEventListener("click", toggleSave);
document.getElementById("modes").addEventListener("click", (e)=>{
  const btn = e.target.closest("[data-mode]");
  if(!btn) return;
  const next = btn.dataset.mode;
  const prev = mode;
  if(next === prev) return;
  const card = visibleCard();
  mode = next;
  save(LS.mode, mode);
  document.querySelectorAll("[data-mode]").forEach(b => b.classList.toggle("on", b.dataset.mode === mode));
  if(typeof syncPathChrome === "function") syncPathChrome();
  if(next === "path" && card && anchorPathToCard(card)){
    buffer = [];
    label();
    syncHeart();
    return;
  }
  if(mode === "saves" && !saves.length) flash("nothing saved");
  resetFeed();
});
document.getElementById("moods").addEventListener("click", (e)=>{
  const btn = e.target.closest("[data-mood]");
  if(!btn) return;
  mood = btn.dataset.mood;
  save(LS.mood, mood);
  document.querySelectorAll("[data-mood]").forEach(b => b.classList.toggle("on", b.dataset.mood === mood));
  if(mode !== "saves") resetFeed();
});
document.querySelectorAll("[data-mode]").forEach(b => b.classList.toggle("on", b.dataset.mode === mode));
document.querySelectorAll("[data-mood]").forEach(b => b.classList.toggle("on", b.dataset.mood === mood));
let holdTimer = null;
feed.addEventListener("pointerdown", ()=>{ holdTimer = setTimeout(()=> document.body.classList.add("linger"), 380); });
function endHold(){ clearTimeout(holdTimer); document.body.classList.remove("linger"); }
feed.addEventListener("pointerup", endHold);
feed.addEventListener("pointercancel", endHold);
feed.addEventListener("pointerleave", endHold);
async function appendCards(n){
  if(mode === "shuffle" && !dailyDone){
    dailyDone = true;
    const d = await dailyItem();
    if(d){ feed.appendChild(makeCard(d)); shown++; }
  }
  await fillBuffer();
  for(let i=0;i<n && buffer.length;i++){ feed.appendChild(makeCard(buffer.shift())); shown++; }
  hint.textContent = (mode === "saves" && !saves.length && !feed.children.length) ? "save a verse first" : "swipe · hold to linger";
  label();
  syncHeart();
}
feed.addEventListener("scroll", ()=>{
  syncHeart();
  const last = feed.lastElementChild;
  if(!last) return;
  if(last.getBoundingClientRect().top < window.innerHeight*2.2) appendCards(4);
});
if(!window.matchMedia("(display-mode: standalone)").matches && /iPhone|iPad|iPod/.test(navigator.userAgent)){
  setTimeout(()=> flash("share · add to home screen"), 1800);
}
appendCards(6);
