import Speech from 'react-text-to-speech';
import "../../App.css";
import "./TexttoSpeech.css";

const TexttoSpeech = ({id, label, textToRead}) => {
    const startSpeech = <button>{label}</button>
    return (
        <>
            <Speech id={id} text={textToRead} startBtn={startSpeech}></Speech>
        </>
    )
}

export default TexttoSpeech;