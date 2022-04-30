console.log("hello");

//intilaising

let playButton=document.getElementById("musicPlayerButton");
let myProgressBar=document.getElementById("progressBar");
let gif= document.getElementById("gif");
let songItemClasses= Array.from(document.getElementsByClassName("songItem"));
let itemPlayer=Array.from(document.getElementsByClassName("itemPlay"));

let songs=[
         {SongName:"Song-1",filePath:"songs/song1.mp3",coverPath:"coversMusic/cover1.jpg",dur:"2:48"},
         {SongName:"Song-2",filePath:"songs/song2.mp3",coverPath:"coversMusic/cover2.gif",dur:"2:51"},
         {SongName:"Song-3",filePath:"songs/song3.mp3",coverPath:"coversMusic/cover3.jfif",dur:"3:52"},
         {SongName:"Song-4",filePath:"songs/song4.mp3",coverPath:"coversMusic/cover4.jfif",dur:"3:09"},
         {SongName:"Song-5",filePath:"songs/song1.mp3",coverPath:"coversMusic/cover5.jfif",dur:"5:36"},
         {SongName:"Song-6",filePath:"songs/song1.mp3",coverPath:"coversMusic/cover6.jpg",dur:"7:36"},
        ]
let songsIndex=0;
let audioElement = new Audio("songs/song2.mp3");

songItemClasses.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByTagName("span")[0].innerText=songs[i].SongName;
    element.getElementsByTagName("span")[2].innerText=songs[i].dur;
  });


var currentRunning=0;
function makePlay(e){
    let index=parseInt(e.target.id);

    if(currentRunning!=0 && currentRunning==index){
        currentRunning=index;
        audioElement.pause();
        playButton.classList.remove("fa-pause-circle");
        playButton.classList.add("fa-play-circle"); 
        gif.style.opacity=0; 
        gif.style.display="none";
        return;
    }

    currentRunning=index;

  

    e.target.classList.remove('fa-play-circle');
    e.target.classList.add('fa-pause-circle');

    
    
    audioElement.src=songs[index].filePath;
    myProgressBar.value=0;
    audioElement.play();

    gif.getElementsByTagName("div")[1].innerText=songs[index].SongName;
    if(audioElement.paused || audioElement.currentTime<=0)
    {
    audioElement.play();
    playButton.classList.remove("fa-play-circle");
    playButton.classList.add("fa-pause-circle");
    gif.style.opacity=1;
    gif.style.display="flex";
    }
    else
    {
        audioElement.pause();
        playButton.classList.remove("fa-pause-circle");
        playButton.classList.add("fa-play-circle"); 
        gif.style.opacity=0; 
        gif.style.display="none";    
    }
  
    
}

function makePauseAll(){
   
    itemPlayer.forEach((element)=>{
      element.classList.remove('fa-pause-circle');
      element.classList.add('fa-play-circle');
    })
   
};


itemPlayer.forEach((element)=>{
element.addEventListener('click',(e)=>{
makePauseAll();
makePlay(e);
//console.log(e);

});

});


//controling songs play





playButton.addEventListener('click',()=>{
if(audioElement.paused || audioElement.currentTime<=0)
{
audioElement.play();
playButton.classList.remove("fa-play-circle");
playButton.classList.add("fa-pause-circle");
gif.style.opacity=1;
gif.style.display="flex";
}
else
{
    audioElement.pause();
    playButton.classList.remove("fa-pause-circle");
    playButton.classList.add("fa-play-circle"); 
    gif.style.opacity=0; 
    gif.style.display="none";    
}
});

//progressBar

audioElement.addEventListener('timeupdate',()=>{
   // console.log('timeupdate');
let songPercentageDuration = ((audioElement.currentTime/audioElement.duration)*100);
myProgressBar.value=songPercentageDuration;
});

myProgressBar.addEventListener('change',()=>{
audioElement.currentTime=myProgressBar.value*audioElement.duration/100;

});