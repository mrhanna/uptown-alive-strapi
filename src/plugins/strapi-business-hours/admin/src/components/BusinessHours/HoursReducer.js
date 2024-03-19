const HoursReducer = (state, action) => {
    const newState = {...state};

    switch (action.type) {
        case 'TOGGLE_CLOSED':
            newState[action.day].closed = !state[action.day].closed;
            newState[action.day].allDay = false;
            newState[action.day].hours = [{ from: '', to: '' }];
            break;

        case 'TOGGLE_24':
            newState[action.day].allDay = !state[action.day].allDay;
            newState[action.day].hours = [{ from: '', to: '' }];
            break;

        case 'ADD_SLOT':
            newState[action.day].hours.push({ from: '', to: '' });
            break;

        case 'REMOVE_SLOT':
            if (state[action.day].hours.length > 1) {
                newState[action.day].hours = [
                    ...state[action.day].hours.slice(0, action.slot),
                    ...state[action.day].hours.slice(action.slot + 1),
                ];
            }
            break;
        
        case 'EDIT':
            newState[action.day].hours[action.slot][action.side] = action.value;
            break;

        case 'REPLACE':
            newState[action.day] = {...action.value};
            newState[action.day].hours = action.value.hours.map((a) => ({...a}));
            break;
    }

    return newState;
}

export default HoursReducer;