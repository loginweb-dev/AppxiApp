//------------------ REACT ---------------------------------------------
import React, { Component } from 'react';
import { View, Text, Alert, TextInput, ToastAndroid } from 'react-native';


//----------------- CONFIG------------------------------
import { Config } from '../config';


// ----------  REUX ------------------------
import { connect } from 'react-redux';

class Template extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: false,
        }
    }

    componentDidMount(){
        this.props.navigation.setOptions({
            title: 'Mi Perfil',
            // headerRight: () => (
            //     // <Button onPress={() => this.props.navigation.navigate('Profile')} title="Edit" />
            //   ),
        });
    }
    
    render() {
        return (
            <View>
                <Text>Template</Text>
            </View>
        );
    }
}
//---------------- REDUX ------------------------
const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setUser : (newUser) => dispatch({
            type: 'SET_USER',
            payload: newUser
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Template);