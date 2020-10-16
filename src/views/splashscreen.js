//------------------ REACT ---------------------------------------------
import React, { Component } from 'react';
import { View, Text, Alert, TextInput, ToastAndroid, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

//----------------- CONFIG------------------------------
import { Config } from '../config';


// ----------  REUX ------------------------
import { connect } from 'react-redux';

class SplashScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: false,
        }
       
    }

    componentDidMount(){
        // this.bootstrapAsync();
        AsyncStorage.getItem('db_login')
        .then((value)=>{
            // console.log(value)
            if (value !== null) {
                const db_login = JSON.parse(value);
                this.props.setUser(db_login);
                console.log(db_login);
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'TabMenu' }],
                    key: null,
                }); 
            }else{
                this.props.navigation.navigate('Login')
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    
    bootstrapAsync = async () => {
        // const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        setTimeout(()=>{
            this.setState({
                // isLoggedIn: isLoggedIn == '1' ? true : false,
                // isLoading: false
            }, () => {
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                    key: null,
                });
            });
        }, 2300);
    };

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    style={{ width: 200, height:200 }}
                    source={{
                        uri: 'https://mystorage.loginweb.dev/storage/Projects/appxi/icon-512x512.png',
                    }}
                />
                <Text> Powere By: LoginWeb 2020 </Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);