async function continueFromCard(card){
  buffer = [];
  while(card.previousElementSibling) card.previousElementSibling.remove();
  while(card.nextElementSibling) card.nextElementSibling.remove();
  armBack(card);
  lastScroll = 0;
  feed.style.scrollBehavior = "auto";
  feed.style.scrollSnapType = "none";
  await appendCards(4);
  for(let n = 0; n < 6; n++){ if(!(await prependOne())) break; }
  feed.scrollTop = card.offsetTop;
  feed.style.scrollSnapType = "";
  feed.style.scrollBehavior = "";
}
