//------------------ REACT ---------------------------------------------+
import React, { Component } from 'react';
import { View, Text, Image, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-community/async-storage';

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
            // headerRight: () => (
            //     <Button onPress={() => this.props.navigation.navigate('Profile')} title="Edit" />
            //     <Icon.Button name="edit" backgroundColor="#3b5998" onPress={() => this.props.navigation.navigate('Profile')} />
            //   ),
        });

        // let userDetails = {
        //     id: '35',
        //     name: 'percy alvarez'
        // }
        //---------------------------
        // AsyncStorage.setItem('db_login', JSON.stringify(userDetails))
        // .then(()=>{
        // console.log('data saved');
        // })
        // .catch((error)=>{
        // console.log(error);
        // })
        // -----------------

        AsyncStorage.getItem('db_login')
        .then((value)=>{
            console.log(value)
            if (value !== null) {
                const db_login = JSON.parse(value);
                this.props.setUser(db_login);
                console.log(db_login);
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
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
   
        fetch('https://appxi.loginweb.dev/api/user/'+this.state.email+'/'+this.state.password)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if(res.error){
                Alert.alert(res.error, 'Intentalo de nuevo');
                this.setState({loading: false});
            }else
            {
                let user = {
                    id: res.user.id,
                    name: res.user.name,
                    email: res.user.email,
                    avatar: res.user.avatar,
                    created_at: res.user.created_at,
                    updated_at: res.user.updated_at
                }
                this.props.setUser(user)
    
                AsyncStorage.setItem('db_login', JSON.stringify(user))
                .then(()=>{
                    console.log('db_login saved');
                })
                .catch((error)=>{
                    console.log(error);
                })
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                    key: null,
                }); 
            }
        
        })
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


