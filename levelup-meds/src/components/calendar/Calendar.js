/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { auth, db} from "../firebase/firebase";

const localizer = momentLocalizer(moment);

const LevelUpMedsCalendar = () => {
    return (
       <>
        <Calendar 
            //events={}
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
            style={{height:500}}
            defaultView='day'
         />
       </>
    );
}

export default LevelUpMedsCalendar;