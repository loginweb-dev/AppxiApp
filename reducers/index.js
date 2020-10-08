const reducerApp = (
    state = {
        user: {},
    }, action
) => {
switch (action.type) {
    case 'SET_USER':
        return {...state, user: action.payload};
}
return state;
}

export default reducerApp;