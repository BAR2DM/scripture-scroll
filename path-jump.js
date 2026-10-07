function syncPathChrome(){
  document.body.classList.toggle("path-on", mode === "path");
}
function jumpToBook(i){
  if(i < 0) i = BOOKS.length - 1;
  if(i >= BOOKS.length) i = 0;
  path = { i: i, ch: 1, idx: 0 };
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
  resetFeed();
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
const _resetFeed = resetFeed;
resetFeed = function(){
  syncPathChrome();
  _resetFeed();
};
