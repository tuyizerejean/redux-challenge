import { ADD_ATTENDEE, DELETE_ATTENDEE, EDIT_ATTENDEE, GET_ATTENDEE } from "../actions/attendee-action";

const INITIAL_STATE = [];

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ATTENDEE:
           return state;

        case ADD_ATTENDEE:
           return [...state, action.payload]

         case EDIT_ATTENDEE:
            state.map((attendee) => {
                if(attendee.id === action.payload.id){
                    attendee = action.payload.newData;
                }
            })
            return state;
         case DELETE_ATTENDEE:
            const newStateAfterDelete = state.filter((attendee) => {
                return attendee.id !== action.payload
            })
            return newStateAfterDelete
        default: return state;
    }
};
export default reducer;