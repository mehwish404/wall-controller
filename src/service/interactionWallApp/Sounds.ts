import PongAudio from "/src/assets/sounds/pong.wav";
import BallonAudio from "/src/assets/sounds/ballon.wav"
let audio = new Audio();

function setAudioOnFirstInteraction(){
    window.addEventListener('touchstart', setAudio);
}
function setAudio(){
    audio=new Audio();
    window.removeEventListener('touchstart', setAudio);
}
function playAudio(name:string){
    switch(name){
        case "PONG":{
            audio.src=PongAudio;
            audio.play();
            break;
        }
        case "BALLON":{
            audio.src=BallonAudio;
            audio.play();
            break;
        }
    }
}

export function useSounds(){
    return{
        setAudioOnFirstInteraction,
        playAudio
    }
}