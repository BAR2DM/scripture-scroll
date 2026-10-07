const PLAN = [
  ["matthew", 5, "Matthew 5"],
  ["john", 1, "John 1"],
  ["psalms", 23, "Psalm 23"],
  ["isaiah", 40, "Isaiah 40"],
  ["romans", 8, "Romans 8"],
  ["luke", 15, "Luke 15"],
  ["revelation", 21, "Revelation 21"]
];
const LSX = { resume: "ss_resume", notes: "ss_notes" };
let notes = load(LSX.notes, {});
let speaking = false;
let nightOn = false;
function dayIndex(){
  const start = new Date(new Date().getFullYear(), 0, 0);
  const n = Math.floor((Date.now() - start) / 86400000);
  return n % PLAN.length;
}
function rememberCard(){
  const card = visibleCard();
  if(!card || !card.dataset.ref || !card.dataset.slug) return;
  const resume = {
    ref: card.dataset.ref,
    text: card.dataset.text,
    slug: card.dataset.slug,
    book: card.dataset.book
  };
  save(LSX.resume, resume);
  const chip = document.getElementById("resume");
  if(chip){
    const short = card.dataset.ref.replace(/:.*/, "").replace(/\s+\d+$/, "");
    chip.textContent = "Resume " + short;
    chip.hidden = false;
  }
}
function resumePath(){
  const resume = load(LSX.resume, null);
  if(!resume) return;
  const card = document.createElement("div");
  card.dataset.slug = resume.slug;
  card.dataset.ref = resume.ref;
  if(!anchorPathToCard(card)) return;
  const nums = String(resume.ref).match(/(\d+):(\d+)/);
  if(nums) path = { i: path.i, ch: +nums[1], idx: Math.max(0, +nums[2] - 1) };
  save(LS.path, path);
  mode = "path";
  save(LS.mode, mode);
  document.querySelectorAll("[data-mode]").forEach(b => b.classList.toggle("on", b.dataset.mode === "path"));
  if(typeof syncPathChrome === "function") syncPathChrome();
  flash("resume");
  resetFeed();
}
function startPlan(){
  const day = PLAN[dayIndex()];
  const i = BOOKS.findIndex(b => b[0] === day[0]);
  if(i < 0) return;
  path = { i, ch: day[1], idx: 0 };
  back = { i, ch: day[1], before: 0 };
  save(LS.path, path);
  mode = "path";
  save(LS.mode, mode);
  document.querySelectorAll("[data-mode]").forEach(b => b.classList.toggle("on", b.dataset.mode === "path"));
  if(typeof syncPathChrome === "function") syncPathChrome();
  flash("day " + (dayIndex() + 1) + " · " + day[2]);
  resetFeed();
}
function stopSpeech(){
  if(window.speechSynthesis) speechSynthesis.cancel();
  speaking = false;
  const btn = document.getElementById("listen");
  if(btn) btn.classList.remove("on");
}
function readCurrent(){
  const card = visibleCard();
  if(!card || !card.dataset.text || !window.speechSynthesis){
    flash("audio unavailable");
    return;
  }
  if(speaking){ stopSpeech(); return; }
  const utter = new SpeechSynthesisUtterance(card.dataset.ref + ". " + card.dataset.text);
  utter.rate = 0.92;
  utter.onend = stopSpeech;
  speaking = true;
  document.getElementById("listen").classList.add("on");
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}
function armNight(){
  if(nightOn) return;
  nightOn = true;
  document.body.classList.add("night");
}
function openNote(){
  const card = visibleCard();
  if(!card || !card.dataset.ref) return;
  const box = document.getElementById("note-box");
  document.getElementById("note-ref").textContent = card.dataset.ref;
  document.getElementById("note-input").value = notes[card.dataset.ref] || "";
  box.classList.add("open");
  setTimeout(function(){ document.getElementById("note-input").focus(); }, 40);
}
function closeNote(){
  document.getElementById("note-box").classList.remove("open");
}
function storeNote(){
  const card = visibleCard();
  if(!card) return;
  const text = document.getElementById("note-input").value.trim();
  if(text) notes[card.dataset.ref] = text;
  else delete notes[card.dataset.ref];
  save(LSX.notes, notes);
  if(text && !isSaved(card.dataset.ref)){
    saves.unshift({ ref: card.dataset.ref, text: card.dataset.text, slug: card.dataset.slug, book: card.dataset.book, note: text, ts: Date.now() });
    save(LS.saves, saves);
    syncHeart();
  } else {
    saves = saves.map(s => s.ref === card.dataset.ref ? Object.assign({}, s, { note: text }) : s);
    save(LS.saves, saves);
  }
  const existing = card.querySelector(".note");
  if(text){
    const n = existing || document.createElement("p");
    n.className = "note";
    n.textContent = text;
    if(!existing) card.querySelector(".content").appendChild(n);
  } else if(existing) existing.remove();
  closeNote();
  flash(text ? "note saved" : "note cleared");
}
function wrapText(ctx, text, x, y, max, line){
  const words = String(text || "").split(/\s+/);
  let row = "";
  const lines = [];
  words.forEach(function(w){
    const test = row ? row + " " + w : w;
    if(ctx.measureText(test).width > max && row){ lines.push(row); row = w; }
    else row = test;
  });
  if(row) lines.push(row);
  lines.slice(0, 8).forEach(function(ln, i){ ctx.fillText(ln, x, y + i * line); });
}
async function shareCard(){
  const card = visibleCard();
  if(!card) return;
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, 1080, 1350);
  const img = card.querySelector("img");
  try {
    if(img && img.complete && img.naturalWidth){
      const size = 860;
      const x = (1080 - size) / 2;
      ctx.drawImage(img, x, 90, size, size);
    }
  } catch(_){}
  ctx.fillStyle = "#d4a017";
  ctx.font = "600 28px system-ui, sans-serif";
  ctx.fillText(card.dataset.ref + "  ·  KJV", 90, 1020);
  ctx.fillStyle = "#faf7f2";
  ctx.font = "42px Georgia, serif";
  wrapText(ctx, card.dataset.text, 90, 1080, 900, 54);
  const blob = await new Promise(function(resolve){ canvas.toBlob(resolve, "image/jpeg", 0.92); });
  if(!blob){ flash("could not share"); return; }
  const file = new File([blob], "scripture.jpg", { type: "image/jpeg" });
  try {
    if(navigator.canShare && navigator.canShare({ files: [file] })){
      await navigator.share({ files: [file], title: card.dataset.ref });
      return;
    }
  } catch(e){
    if(e && e.name === "AbortError") return;
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "scripture.jpg";
  a.click();
  flash("image saved");
}
const _makeCard = makeCard;
makeCard = function(item){
  const node = _makeCard(item);
  const note = item.note || notes[item.ref];
  if(note){
    const n = document.createElement("p");
    n.className = "note";
    n.textContent = note;
    node.querySelector(".content").appendChild(n);
  }
  return node;
};
const _share = document.getElementById("share");
_share.replaceWith(_share.cloneNode(true));
document.getElementById("share").addEventListener("click", shareCard);
let lastSave = 0;
saveBtn.addEventListener("click", function(e){
  const now = Date.now();
  if(now - lastSave < 450){
    e.stopImmediatePropagation();
    openNote();
  }
  lastSave = now;
}, true);
document.getElementById("resume").addEventListener("click", resumePath);
document.getElementById("plan").addEventListener("click", startPlan);
document.getElementById("listen").addEventListener("click", readCurrent);
document.getElementById("note-save").addEventListener("click", storeNote);
document.getElementById("note-cancel").addEventListener("click", closeNote);
feed.addEventListener("scroll", function(){
  rememberCard();
  stopSpeech();
  if(feed.scrollTop > 40) armNight();
}, { passive: true });
const stored = load(LSX.resume, null);
if(stored && stored.ref){
  const chip = document.getElementById("resume");
  chip.hidden = false;
  chip.textContent = "Resume " + stored.ref.replace(/:.*/, "").replace(/\s+\d+$/, "");
}
