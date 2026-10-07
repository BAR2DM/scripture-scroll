function syncPathChrome(){
  document.body.classList.toggle("path-on", mode === "path");
}
function jumpToBook(i){
  if(i < 0) i = BOOKS.length - 1;
  if(i >= BOOKS.length) i = 0;
  path = { i: i, ch: 1, idx: 0 };
  back = { i: i, ch: 1, before: 0 };
  save(LS.path, path);
  closeSheet();
  if(mode !== "path"){
    mode = "path";
    save(LS.mode, mode);
    document.querySelectorAll("[data-mode]").forEach(b => b.classList.toggle("on", b.dataset.mode === "path"));
  }
  syncPathChrome();
  flash(BOOKS[i][1]);
  resetFeed();
}
function closeSheet(){
  document.getElementById("sheet").classList.remove("open");
}
function renderBooks(q){
  q = (q || "").toLowerCase().trim();
  const list = document.getElementById("booklist");
  list.innerHTML = "";
  const groups = [["Old Testament", 0, 39],["New Testament", 39, 66]];
  groups.forEach(function(g){
    const wrap = document.createElement("div");
    let any = false;
    const label = document.createElement("div");
    label.className = "grp";
    label.textContent = g[0];
    wrap.appendChild(label);
    for(let i=g[1]; i<g[2]; i++){
      const name = BOOKS[i][1];
      if(q && name.toLowerCase().indexOf(q) < 0 && BOOKS[i][0].indexOf(q) < 0) continue;
      any = true;
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = name;
      if(path.i === i) b.className = "here";
      b.addEventListener("click", function(){ jumpToBook(i); });
      wrap.appendChild(b);
    }
    if(any) list.appendChild(wrap);
  });
}
function openSheet(){
  renderBooks("");
  document.getElementById("bookq").value = "";
  document.getElementById("sheet").classList.add("open");
  setTimeout(function(){ document.getElementById("bookq").focus(); }, 50);
}
function parseRef(ref){
  const m = String(ref || "").match(/(\d+):(\d+)(?:[\u2013-](\d+))?/);
  if(!m) return { ch: 1, v1: 1, v2: 1 };
  return { ch: +m[1], v1: +m[2], v2: m[3] ? +m[3] : +m[2] };
}
let back = null;
let prepending = false;
let touchY = 0;
let touchTop = 0;
function armBack(card){
  const i = BOOKS.findIndex(function(b){ return b[0] === card.dataset.slug; });
  const p = parseRef(card.dataset.ref);
  back = { i: i < 0 ? 0 : i, ch: p.ch, before: p.v1 - 1 };
}
function spanEndingAt(verses, endIdx){
  let start = endIdx;
  while(start > 0 && (endIdx - start + 1) < 5 && !endsSentence(verseText(verses[start - 1]))) start--;
  const parts = [];
  for(let i = start; i <= endIdx; i++){
    const t = verseText(verses[i]);
    if(t) parts.push(t);
  }
  return { text: parts.join(" "), v1: verses[start].v, v2: verses[endIdx].v, start: start };
}
async function prependOne(){
  if(mode !== "path" || prepending || !back) return false;
  if(back.i <= 0 && back.ch <= 1 && back.before <= 0) return false;
  prepending = true;
  const anchor = visibleCard();
  const beforeTop = anchor ? anchor.getBoundingClientRect().top : 0;
  try {
    let i = back.i, ch = back.ch, before = back.before;
    if(before <= 0){
      ch -= 1;
      if(ch < 1){
        i -= 1;
        if(i < 0) return false;
        ch = BOOKS[i][2];
      }
      const prev = await fetchChapter(BOOKS[i][0], ch);
      if(!prev.length) return false;
      before = prev.length;
    }
    const verses = await fetchChapter(BOOKS[i][0], ch);
    if(!verses.length) return false;
    const endIdx = Math.min(verses.length - 1, before - 1);
    if(endIdx < 0) return false;
    const span = spanEndingAt(verses, endIdx);
    if(!span.text) return false;
    const pick = { slug: BOOKS[i][0], name: BOOKS[i][1], ch: ch };
    const node = makeCard(makeItem(pick, span));
    feed.insertBefore(node, feed.firstElementChild);
    if(anchor && anchor.isConnected){
      const drift = anchor.getBoundingClientRect().top - beforeTop;
      if(drift) feed.scrollTop += drift;
    }
    back = { i: i, ch: ch, before: span.v1 - 1 };
    shown++;
    label();
    return true;
  } catch(e){ console.error(e); return false; }
  finally { prepending = false; }
}
async function continueFromCard(card){
  buffer = [];
  while(card.previousElementSibling) card.previousElementSibling.remove();
  while(card.nextElementSibling) card.nextElementSibling.remove();
  armBack(card);
  feed.style.scrollSnapType = "none";
  await Promise.all([appendCards(3), prependOne(), prependOne()]);
  feed.scrollTop = card.offsetTop;
  feed.style.scrollSnapType = "";
}
function stepOne(dir){
  const card = visibleCard();
  if(!card) return;
  const target = dir < 0 ? card.previousElementSibling : card.nextElementSibling;
  if(!target){
    if(dir < 0) prependOne();
    return;
  }
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}
syncPathChrome();
document.getElementById("modes").addEventListener("click", function(e){
  const pathBtn = e.target.closest('[data-mode="path"]');
  if(!pathBtn) return;
  if(mode === "path"){
    e.stopImmediatePropagation();
    openSheet();
    return;
  }
  const card = visibleCard();
  if(!card || !anchorPathToCard(card)) return;
  e.stopImmediatePropagation();
  mode = "path";
  save(LS.mode, mode);
  document.querySelectorAll("[data-mode]").forEach(b => b.classList.toggle("on", b.dataset.mode === "path"));
  syncPathChrome();
  continueFromCard(card);
}, true);
document.getElementById("jump").addEventListener("click", function(e){
  e.preventDefault();
  e.stopPropagation();
  openSheet();
});
document.getElementById("prevbook").addEventListener("click", function(e){
  e.preventDefault(); e.stopPropagation();
  jumpToBook((path.i || 0) - 1);
});
document.getElementById("nextbook").addEventListener("click", function(e){
  e.preventDefault(); e.stopPropagation();
  jumpToBook((path.i || 0) + 1);
});
document.getElementById("bookq").addEventListener("input", function(e){ renderBooks(e.target.value); });
document.getElementById("sheet").addEventListener("click", function(e){
  if(e.target.id === "sheet") closeSheet();
});
feed.addEventListener("touchstart", function(e){
  if(mode !== "path" || !e.touches[0]) return;
  touchY = e.touches[0].clientY;
  touchTop = feed.scrollTop;
}, { passive: true });
feed.addEventListener("touchend", function(e){
  if(mode !== "path" || !e.changedTouches[0]) return;
  const dy = e.changedTouches[0].clientY - touchY;
  if(Math.abs(dy) < 36) return;
  if(Math.abs(feed.scrollTop - touchTop) > window.innerHeight * 0.85){
    const card = visibleCard();
    const backTo = dy > 0 ? card && card.previousElementSibling : card && card.nextElementSibling;
    if(backTo) backTo.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    stepOne(dy > 0 ? -1 : 1);
  }
}, { passive: true });
feed.addEventListener("scroll", function(){
  if(mode !== "path") return;
  const card = visibleCard();
  if(card && !card.previousElementSibling && feed.scrollTop < 24) prependOne();
}, { passive: true });
const _resetFeed = resetFeed;
resetFeed = function(){
  syncPathChrome();
  _resetFeed();
};
