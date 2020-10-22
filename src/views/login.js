//------------------ REACT ---------------------------------------------+
import React, { Component } from 'react';
import { View, Text, Image, TextInput, Alert, ToastAndroid, ScrollView, TouchableOpacity } from 'react-native';
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
            email: 'percy.alvarez.2017@gmail.com',
            password: 'password',
            loading: false,
            checked: true
        }
    }

    componentDidMount(){    
        AsyncStorage.getItem('db_login')
        .then((value)=>{
            // console.log(value)
            if (value !== null) {
                const db_login = JSON.parse(value);
                this.props.setUser(db_login);
                // console.log(db_login);
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'TabMenu' }],
                    key: null,
                }); 
            }
        })
        .catch((error)=>{
            console.log(error);
        })
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
                customer: data.user.customer,
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
            <>
             <ScrollView style={{ flex: 1,  marginTop: Login.statusBarHeight }}>
                <View style={{ flex: 1 }}>
                    <Image
                        style={{ width: "100%", height:150 }}
                        source={{
                            uri: 'https://mystorage.loginweb.dev/storage/Projects/appxi/icon-512x512.png',
                        }}
                    />
                </View>
               
                <View style={{ flex: 1, margin: 10 }}>
                    <Text style={{ fontSize: 20 }}>Telefono o Correo</Text>  
                    <TextInput
                        placeholder ="Correo"
                        style={{ borderColor: Config.color.textPrimary, borderWidth: 1, width: '100%'  }}
                        onChangeText={text => this.setState({email: text})}
                        value={this.state.email}
                    />
                </View>
                <View style={{ flex: 1, margin: 10 }}>
                    <Text style={{ fontSize: 20 }}>Contraseña</Text>  
                    <TextInput
                        placeholder ="pin"
                        secureTextEntry={true}
                        style={{ borderColor: 'gray', borderWidth: 1, width: '100%' }}
                        onChangeText={text => this.setState({password: text})}
                        value={this.state.password}
                    />
                </View>
                <View style={{ flex:1, flexDirection: 'row', justifyContent: 'center', margin: 10 }}>
                    <CheckBox
                        value={this.state.checked}
                        onValueChange={() => this.setState({ checked: !this.state.checked })}
                    />
                    <Text style={{ marginRight: 10 }}> Guardar Sesion</Text>
                    {/* <Icon.Button
                        name="user"
                        backgroundColor={Config.color.primary}
                        onPress={this.SetLogin.bind(this)}
                    >
                    <Text style={{ color: Config.color.textSecondary }}>{this.state.loading ? 'Enviando...' : 'Login'}</Text>
                    </Icon.Button> */}
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 5, margin: 5, height: 40, backgroundColor: Config.color.primary, borderWidth: 0.5, borderColor: '#fff' }} onPress={this.SetLogin.bind(this)}>
                        <Image
                            source={{
                            uri:
                                'https://mystorage.loginweb.dev/storage/Projects/appxi/User_icon.png',
                            }}
                            style={{ resizeMode: 'stretch', width: 25, height: 25, margin: 5, padding: 10 }}
                        />
                        <View style={{ backgroundColor: '#fff', width: 1, height: 40 }} />
                        <Text style={{ color: '#fff', marginBottom: 4, marginLeft: 10,  marginRight: 10 }}>
                            {this.state.loading ? 'Enviando...' : 'Login'}
                        </Text>
                    </TouchableOpacity>
                 
                </View>
                {/* <Text style={{ padding: 10, alignSelf: 'center' }}>O</Text> */}

                <View style={{ flex: 1, alignSelf: 'center' }}>
                    {/* <Icon
                        name="facebook"
                        backgroundColor={Config.rrss.facebook}
                        onPress={this.loginWithFacebook}
                    >
                        <Text>Login con Facebook</Text>
                    </Icon>
                    <Text></Text>
                    <Icon.Button
                        name="google"
                        backgroundColor={Config.rrss.google}
                        onPress={this.loginWithFacebook}
                    >
                        Login con Google
                    </Icon.Button>
                    <Text></Text>
                    <Text style={{ color: 'blue' }}
                        onPress={() => this.props.navigation.navigate('Register')}>
                        ¿ Crear Cuenta Nueva ?
                    </Text> */}
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 5, margin: 5, height: 40, backgroundColor: '#485a96', borderWidth: 0.5, borderColor: '#fff' }}>
                        <Image
                            source={{
                            uri:
                                'https://mystorage.loginweb.dev/storage/Projects/appxi/facebook.png',
                            }}
                            style={{ resizeMode: 'stretch', width: 25, height: 25, margin: 5, padding: 10 }}
                        />
                        <View style={{ backgroundColor: '#fff', width: 1, height: 40 }} />
                        <Text style={{ color: '#fff', marginBottom: 4, marginLeft: 10,  marginRight: 10 }}>
                            Login Using Facebook
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 5, margin: 5, height: 40, backgroundColor: '#dc4e41', borderWidth: 0.5, borderColor: '#fff', }}>
                        <Image
                            source={{
                            uri:
                                'https://mystorage.loginweb.dev/storage/Projects/appxi/google-plus.png',
                            }}
                            style={{ resizeMode: 'stretch', width: 25, height: 25, margin: 5, padding: 10 }}
                        />
                        <View style={{ backgroundColor: '#fff', width: 1, height: 40 }} />
                        <Text style={{ color: '#fff', marginBottom: 4, marginLeft: 10,  marginRight: 10 }}>
                            Login Using Google
                        </Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'blue', alignSelf: 'center' }}
                        onPress={() => this.props.navigation.navigate('Register')}>
                        ¿ Crear Cuenta Nueva ?
                    </Text>
                </View>
             </ScrollView>
             </>
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


