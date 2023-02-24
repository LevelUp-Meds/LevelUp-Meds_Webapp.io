import Speech from 'react-text-to-speech';
import "../../App.css";
import "./TexttoSpeech.css";

const TexttoSpeech = ({id, label, textToRead}) => {
    const startSpeech = <button id="speechButton">{label}</button>
    const stopSpeech = <button id="stopButton">Stop Speech</button>
    return (
        <>
            <Speech id={id} text={textToRead} startBtn={startSpeech} stopBtn={stopSpeech}></Speech>
        </>
    )
}

export default TexttoSpeech;