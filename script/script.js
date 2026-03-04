const loadLesson=()=>{
  const url="https://openapi.programming-hero.com/api/levels/all"
   fetch(url)//promise of response
   .then(res=>res.json()) //promise of json data
   .then(Json=>disPlayLesson(Json.data)
   )
}
const removeActive=()=>{
  const lessonButtons=document.querySelectorAll(".lesson-btn");
  lessonButtons.forEach(btn=>btn.classList.remove("active"))
}
const loadLevelWord=(id)=>{
  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
  .then(res=>res.json())
  .then(data=>{
    removeActive();//remove all active class
    const clickBtn=document.getElementById(`lesson-btn-${id}`)
    clickBtn.classList.add('active'); //add active class
    disPlayLevelWord(data.data)
  }
  )
}
const disPlayLevelWord=(words)=>{
  const wordContainer=document.getElementById('word-container');
  wordContainer.innerHTML="";
  if(words.length ==0){
    wordContainer.innerHTML=`
    <div class="text-center col-span-full space-y-3  py-10">
       <img src="./assets/alert-error.png" class="max-w-[96px] mx-auto" alt="">
      <p class="text-sm font-bangla font-medium text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <h2 class="font-bangla text-3xl font-medium ">নেক্সট Lesson এ যান</h2>
    </div>
    `
    return
  }
  words.forEach(word=>{
    const card=document.createElement("div");
    card.innerHTML=`
    <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
        <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
        <p class="font-semibold">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি" }</p>
        <div class="font-bangla text-2xl font-medium">${word.pronunciation ?word.pronunciation : "Pronunciation পাওয়া যায়নি" }</div>
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
  levelContainer.innerHTML="";
   //2. get into every lessons
  for(lesson of lessons){
    //3. create Element
    const levelBtn=document.createElement("div")
    levelBtn.innerHTML=`
      <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
    <i class="fa-solid fa-book-open"></i>Lesson -${lesson.level_no}
    </button>
    `
       //4. append into container
     levelContainer.append(levelBtn)
  }
}

loadLesson()