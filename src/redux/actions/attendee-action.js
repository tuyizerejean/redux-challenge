import { v4 as uuidv4 } from 'uuid';
export const ADD_ATTENDEE = 'ADD_ATTENDEE';
export const GET_ATTENDEE = 'GET_ATTENDEE';
export const EDIT_ATTENDEE = 'EDIT_ATTENDEE';
export const DELETE_ATTENDEE = 'DELETE_ATTENDEE';

export const getAttendee = () => {
    return {
        type: GET_ATTENDEE,
    };
};

export const addAttendee = (data) => {
    const id = uuidv4()
    data.id = id;
    return {
       type: ADD_ATTENDEE,
       payload: data
    };
};

export const editAttendee = (id, newData) => {
    return {
       type: EDIT_ATTENDEE,
       payload: {
           id,
           newData
       }
    };
};

export const deleteAttendee = (id) => {
    console.log(id)
    return {
       type: DELETE_ATTENDEE,
       payload: id
    };
};