//------------------ REACT ---------------------------------------------+
import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-community/async-storage';

//----------------- CONFIG------------------------------
import { Config } from '../config';


// ----------  REUX ------------------------
import { connect } from 'react-redux';

class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount(){
        this.props.navigation.setOptions({
            title: 'Mi Perfil',
            // headerRight: () => (
            //     // <Button onPress={() => this.props.navigation.navigate('Profile')} title="Edit" />
            //     <Icon.Button name="edit" backgroundColor="#3b5998" onPress={() => this.props.navigation.navigate('Profile')} />
            //   ),
        });
    }

    mylogut(){
        // console.log('hola');
        AsyncStorage.removeItem('db_login');
        // this.props.navigation.navigate('Login');
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
            key: null,
        }); 
    }
    render() {
        return (
             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                 <Text>Profile</Text>
                 <Icon.Button
                    name="trash"
                    backgroundColor={Config.color.delete}
                    onPress={() => 
                        {Alert.alert(
                            'Salir de '+ Config.appName,
                            'Estas Segur@ de Salir',
                            [
                                {
                                text: 'SI',
                                onPress: this.mylogut.bind(this)
                                },
                                {
                                text: 'NO',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel'
                                },
                                // { text: 'OK', onPress: () => console.log('OK Pressed') }
                            ],
                            { cancelable: false }
                        );
                        }
                    }
                >
                <Text style={{ color: Config.color.textPrimary }}>Salir</Text>
                </Icon.Button>

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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);


