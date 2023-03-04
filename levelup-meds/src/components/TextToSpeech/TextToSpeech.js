import Speech from 'react-text-to-speech';
import "../../App.css";
// import "./TexttoSpeech.css";
import { IconButton } from '@mui/material';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Info from '@mui/icons-material/Info';

const TexttoSpeech = ({id, textToRead, icon}) => {
    
    var startSpeech;
    switch(icon)
    {
        case 'Volume':
            startSpeech = <IconButton><VolumeUpIcon color='primary' fontSize='large'/></IconButton>
            break;

        default:
            startSpeech = <IconButton><Info color='primary' fontSize='large'/></IconButton>
    }
    
    const startSpeechBtn = startSpeech;
    const stopSpeech = <IconButton><VolumeOffIcon color='primary' fontSize='large'/></IconButton>
    return (
        <>
            <Speech id={id} text={textToRead} startBtn={startSpeechBtn} stopBtn={stopSpeech}></Speech>
        </>
    )
}

export default TexttoSpeech;