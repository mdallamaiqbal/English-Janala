const loadLesson=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
    .then(res=>res.json()) //promise of json data
    .then(Json=>disPlayLesson(Json.data)
    )
}
const loadLevelWord=(id)=>{
    const url=`
     https://openapi.programming-hero.com/api/level/${id}
    `
    fetch(url)
    .then(res=>res.json())
    .then(data=>disPlayLevelWord(data.data))
}
const disPlayLevelWord=(words)=>{
  const wordContainer=document.getElementById('word-container');
  wordContainer.innerHTML='';
  words.forEach(word=>{
  const card=document.createElement("div");
  card.innerHTML=`
    <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
        <h2 class="font-bold text-2xl">${word.word}</h2>
        <p class="font-semibold">${word.meaning}</p>
        <div class="font-bangla text-2xl font-medium">${word.pronunciation}</div>
        <div class="flex justify-between items-center">
          <button class="btn bg-[#1A91FF]/10 hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-[#1A91FF]/10 hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></i></button>
        </div>
      </div>
  `
  wordContainer.append(card)
    
  })
}
const disPlayLesson=(lessons)=>{
  //1. get the container  & empty
  const levelContainer=document.getElementById('level-container');
  levelContainer.innerHTML='';
   //2. get into every lessons
  for(let lesson of lessons){
   //3. create Element
   const btnDiv=document.createElement("div");
   btnDiv.innerHTML=`
    <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
    <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
    </button>
   `
  //4. append into container
  levelContainer.append(btnDiv)
  }
    
}
loadLesson()