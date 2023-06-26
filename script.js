let textarea = document.querySelector('#text')
let voiceList = document.querySelector('#voice-select')
let speechBtn = document.querySelector('.submit')

let synth=speechSynthesis
let isSpeaking = true;
function voicespeech()
{
    for (let voice of synth.getVoices()){
        let option = document.createElement('option')
        option.text = voice.name
        voiceList.add(option)
        console.log(option)
    }
}
synth.addEventListener('voiceschanged', voicespeech)
function texttospeech(text){
    let utterance = new SpeechSynthesisUtterance(text)

    for(let voice of synth.getVoices()){
        if (voice.name === voiceList.value){
            utterance.voice = voice
        }
    }
    speechSynthesis.speak(utterance)
}
speechBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    if(textarea.value !== ' ' ){
        if(!synth.speaking){
            texttospeech(textarea.value)
        }
        if (textarea.value.length > 80) {
            if (isSpeaking) {
                synth.resume()
                isSpeaking = false
                speechBtn.innerHTML = ' pause speech'
            }
            else{
                synth.pause()
                isSpeaking = true
                speechBtn.innerHTML = 'Resume speech'
            }
            setInterval(() => {
                if (!synth.speaking && isSpeaking ) {
                    isSpeaking = true
                    speechBtn.innerHTML = ' convert to speech' 
                }
            })
        }else{
            speechBtn.innerHTML = ' convert to speech'
        }
    }
})
