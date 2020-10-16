//------------------ REACT ---------------------------------------------+
import React, { Component } from 'react';
import { View, Text, Image, TextInput, Alert, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

//----------------- CONFIG------------------------------
import { Config } from '../config';

// ----------  REUX ------------------------
import { connect } from 'react-redux';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false,
            checked: true
        }
    }

    componentDidMount(){
        this.props.navigation.setOptions({
            title: 'Bienvenido a '+ Config.appName,
            // headerLeft: () => (
            //     <Text>Bienvenido a Appxi</Text>
            // ),
            headerRight: () => (
                // <Button onPress={() => this.props.navigation.navigate('Profile')} title="Edit" />
                <Icon.Button name="edit" backgroundColor="#3b5998" onPress={() => this.props.navigation.navigate('Register')}>
                    Nuevo
                </Icon.Button>
              ),
        });
        // AsyncStorage.getItem('db_login')
        // .then((value)=>{
        //     console.log(value)
        //     if (value !== null) {
        //         const db_login = JSON.parse(value);
        //         this.props.setUser(db_login);
        //         console.log(db_login);
        //         this.props.navigation.reset({
        //             index: 0,
        //             routes: [{ name: 'TabMenu' }],
        //             key: null,
        //         }); 
        //     }
        // })
        // .catch((error)=>{
        //     console.log(error);
        // })
    }

   
    async SetLogin() {
        this.setState({loading: true});
        
        try {
            const { data } = await axios.post(Config.API+'/auth/local', {
                identifier: this.state.email,
                password: this.state.password,
            });

            let user = {
                id: data.user.id,
                username: data.user.username,
                email: data.user.email,
                created_at: data.user.created_at,
                updated_at: data.user.updated_at,
                jwt: data.jwt
            }
            this.props.setUser(user);
            AsyncStorage.setItem('db_login', JSON.stringify(user))
            .then(()=>{
                console.log('db_login saved');
            })
            .catch((error)=>{
                console.log(error);
            })
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'TabMenu' }],
                key: null,
            }); 

        } catch (error) {
            ToastAndroid.showWithGravity(
                error.message,
                ToastAndroid.SHORT,
                ToastAndroid.TOP
            );
            this.setState({loading: false, password: ''});
        }
    }
    render() {
        return (
             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                 <Image
                    style={{ width: 200, height:200 }}
                    source={{
                        uri: 'https://mystorage.loginweb.dev/storage/Projects/appxi/icon-512x512.png',
                    }}
                />
                <TextInput
                    placeholder ="Correo"
                    style={{ height: 40, borderColor: Config.color.primary, borderWidth: 1, width: 300, marginVertical: 10  }}
                    onChangeText={text => this.setState({email: text})}
                    value={this.state.email}
                />
                <TextInput
                    placeholder ="pin"
                    secureTextEntry={true}
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 300, marginVertical: 10 }}
                    onChangeText={text => this.setState({password: text})}
                    value={this.state.password}
                />
                <View style={{ flexDirection: 'row' }}>
                    <CheckBox
                        value={this.state.checked}
                        onValueChange={() => this.setState({ checked: !this.state.checked })}
                    />
                    <Text style={{ marginRight: 10 }}> Guardar Sesion</Text>
                    <Icon.Button
                        name="user"
                        backgroundColor={Config.color.primary}
                        onPress={this.SetLogin.bind(this)}
                    >
                    <Text style={{ color: Config.color.textPrimary }}>{this.state.loading ? 'Enviando...' : 'Login'}</Text>
                    </Icon.Button>
                </View>
                <Text style={{ padding: 5 }}>O</Text>
                <Icon.Button
                    name="facebook"
                    backgroundColor="#3b5998"
                    onPress={this.loginWithFacebook}
                >
                    Login con Facebook
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);


