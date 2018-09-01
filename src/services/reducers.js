import globalReducer from './global/reducer';
import userReducer from './user/reducer';
import challengeRedcuer from './challenge/reducer';

export default {
    globalVars: globalReducer,
    userReducer,
    challenge: challengeRedcuer,
}