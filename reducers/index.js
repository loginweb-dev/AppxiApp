const reducerApp = (
    state = {
        user: {},
        locations: [],
    }, action
) => {
switch (action.type) {
    case 'SET_USER':
        return {...state, user: action.payload};
    case 'SET_LOCATIONS':
        return {...state, locations: action.payload};
}
return state;
}

export default reducerApp;