"use strict";
console.log("welcome to spotify");
//Intitalization of variable
let songIndex = 0;
let progress=0;
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgress = document.getElementById('myProgress');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from (document.getElementsByClassName('songlist'));
// console.log(songItems)




let songs = [
    {    songName:"ApniToJaiseTaise",filePath:"1.mp3",coverPath:"cover/1.jpg"
    },
    {    songName:"ApniToJaiseTaise",filePath:"2.mp3",coverPath:"cover/2.jpg"
    },
    {    songName:"Sapno Ki Rani Kab",filePath:"3.mp3",coverPath:"cover/3.jpg"
    },
    {    songName:"Dil Kya Kare",filePath:"4.mp3",coverPath:"cover/4.jpg"
    },
    {    songName:"Meri Bheegi Bheegi",filePath:"5.mp3",coverPath:"cover/5.jpg"
    },
    {    songName:"Sagar kinare ",filePath:"6.mp3",coverPath:"cover/6.jpg"
    },
    {    songName:"Gum Hai Kisi Ke Pyar",filePath:"7.mp3",coverPath:"cover/7.jpg"
    },
    {    songName:"Saagar-Sagar Jaisi Aankhon Wali",filePath:"8.mp3",coverPath:"cover/1.jpg"
    },
    {    songName:"Dekha Ek Khwab To",filePath:"9.mp3",coverPath:"cover/1.jpg"
}
// {    songName:"Tu Tu Hey Wohi",filePath:"old_YVR-Tu Tu Hey Wohi.mp3",coverPath:"cover/1.jpg"
// },
]


//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentSrc<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play'); 
        masterPlay.classList.add('fa-pause');
        gif.style.opacity=1; 

    }
    else{
        audioElement.pause();
        masterPlay.classList.add('fa-play'); 
        masterPlay.classList.remove('fa-pause');
        gif.style.opacity=0; 
    }
})
//Listen to Events

audioElement.addEventListener('timeupdate',()=>{
    // console.log('timeupdate');
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress);
    myProgress.value=progress;
})



myProgress.addEventListener('change',()=>{
    audioElement.currentTime=(myProgress.value * audioElement.duration)/100;
})

songItems.forEach( (element,i) => {
    // console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    
});


const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        
        // Check if the element has either 'fa-backward' or 'fa-forward' class
        if (element.classList.contains('fa-backward') || element.classList.contains('fa-forward')) {
            ;
            // element.classList.remove('fa-pause');
            // element.classList.add('fa-play');
        } else {
            element.classList.remove('fa-pause');
            element.classList.add('fa-play');
        }
    });
}


Array.from(document.getElementsByClassName('SongListPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src = `${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    })

})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})
