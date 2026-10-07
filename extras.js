function toggleNight(){
  nightOn = !nightOn;
  document.body.classList.toggle("night", nightOn);
}
let tapAt = 0;
let tapX = 0;
let tapY = 0;
feed.addEventListener("pointerup", function(e){
  if(e.target.closest("button, a, input, textarea")) return;
  const now = Date.now();
  const near = Math.abs(e.clientX - tapX) < 28 && Math.abs(e.clientY - tapY) < 28;
  if(now - tapAt < 320 && near){
    toggleNight();
    tapAt = 0;
    return;
  }
  tapAt = now;
  tapX = e.clientX;
  tapY = e.clientY;
});
feed.addEventListener("scroll", function(){
  rememberCard();
  queueVoice();
}, { passive: true });
const stored = load(LSX.resume, null);
if(stored && stored.ref){
  const chip = document.getElementById("resume");
  chip.hidden = false;
  chip.textContent = "Resume " + stored.ref.replace(/:.*/, "").replace(/\s+\d+$/, "");
}
