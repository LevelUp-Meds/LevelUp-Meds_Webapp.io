/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {db, auth} from '../firebase/firebase';
import {collection, doc, query, where, getDocs, onSnapshot, getFirestore} from 'firebase/firestore';

const localizer = momentLocalizer(moment);
//const db = getFirestore();

const getEvents = async() => {

}

const calEvents = [
    {
        start: new Date(2022, 4, 3, 12, 3, 12),
        end: new Date(2022, 4, 14, 10, 50, 0),
        title: "Hey! It's Spyro!"
        //2022, 4, 14, 13, 21, 25
    },
    {
        start: new Date(),
        end: new Date(),
        title: "Banjo-Kazooie"
    }
]

const LevelUpMedsCalendar = () => {
    return (
       <>
        <Calendar 
            events={calEvents}
            localizer={localizer}
            startAccessor="start"
            style={{height:700}}
            defaultView='day'
            defaultDate={moment().toDate()}
         />
       </>
    );
}

export default LevelUpMedsCalendar;