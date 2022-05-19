import { combineReducers } from 'redux';
import attendeeReducer from './attendee-reducer';
const rootReducer = combineReducers({
    attendees: attendeeReducer,
});
export default rootReducer;