'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const notesBtn = document.querySelector('.btn-notes'),
          lettersBtn = document.querySelector('.btn-letters'),
          pianoKey = document.querySelectorAll('.piano-key:not(.none');

    notesBtn.addEventListener('click', (e) => {
        e.preventDefault();

        notesBtn.classList.add('btn-active');
        lettersBtn.classList.remove('btn-active');
        pianoKey.forEach(item => {
            item.classList.remove('letters');
        });
    });

    lettersBtn.addEventListener('click', (e) => {
        e.preventDefault();

        notesBtn.classList.remove('btn-active');
        lettersBtn.classList.add('btn-active');
        pianoKey.forEach(item => {
            item.classList.add('letters');
        });
    });



    const fullScreenBtn = document.querySelector('.fullscreen');

    fullScreenBtn.addEventListener('click', () => {
        if(!document.fullscreenElement){
            document.documentElement.requestFullscreen();
        } else{
            document.exitFullscreen();
        }
    });

    if(document.fullscreenElement){
        document.addEventListener('keydown', (e) => {
            if(e.code == 'Escape'){
                document.exitFullscreen();
            }
        }, false);
    }

    function loadAndPlayAudio(fileName){
        let audio = new Audio(`assets/audio/${fileName}.mp3`);
        audio.addEventListener('canplaythrough', () => {
            audio.play();
        });
    }

    let keys = [];
    pianoKey.forEach(item => {
        keys.push(item.getAttribute('data-letter'));
    });


    const piano = document.querySelector('.piano');
    piano.addEventListener('mousedown', (e) => {
        if(keys.indexOf(e.target.getAttribute('data-letter')) != -1){
            loadAndPlayAudio(e.target.getAttribute('data-note'));
            e.target.classList.add('piano-key-active');
        }
    });
    piano.addEventListener('mouseover', (e) => {
        if(e.which == 1 && keys.indexOf(e.target.getAttribute('data-letter')) != -1){
            loadAndPlayAudio(e.target.getAttribute('data-note'));
            e.target.classList.add('piano-key-active');
        }
    });
    piano.addEventListener('mouseout', (e) => {
        if(e.which == 1 && keys.indexOf(e.target.getAttribute('data-letter')) != -1){
            e.target.classList.remove('piano-key-active');
        }
    });
    piano.addEventListener('mouseup', (e) => {
        if(keys.indexOf(e.target.getAttribute('data-letter')) != -1){
            e.target.classList.remove('piano-key-active');
        }
    });

    
    window.addEventListener('keydown', (e) => {
        let letter = e.code.slice(-1);
        if(keys.indexOf(letter) != -1){
            const key = document.querySelector(`[data-letter=${letter}]`);
            loadAndPlayAudio(key.getAttribute('data-note'));
            key.classList.add('letter-click', 'piano-key-active');
        }
    });


    window.addEventListener('keyup', (e) => {
        let letter = e.code.slice(-1);
        if(keys.indexOf(letter) != -1){
            const key = document.querySelector(`[data-letter=${letter}]`);
            key.classList.remove('letter-click', 'piano-key-active');
        }
    });


});