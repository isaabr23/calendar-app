// Para convertir Strings a objetos tipo Date()

import moment from "moment";

export const prepareEvents = ( events = [] ) => {
    
    return events.map(
        (e) => ({
            ...e,
        end: moment( e.end ).toDate(),  // Fri Apr 16 2021 14:00:00 GMT-0500 (hora de verano central)
            start: moment( e.start ).toDate(),
        })
    );
}