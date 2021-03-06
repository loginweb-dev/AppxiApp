//------------------ REACT ---------------------------------------------+
import React, { Component } from 'react';
import { View, Text, Alert, TextInput, ToastAndroid, Picker, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

//----------------- CONFIG------------------------------
import { Config } from '../config';


// ----------  REUX ------------------------
import { connect } from 'react-redux';


//------------ Components -----------
import TextInputAlt from "./components/TextInputAlt";

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            username: '',
            email: '',
            password: '',
            confirmed: true
        }
    }

    componentDidMount(){
        this.props.navigation.setOptions({
            title: 'Registrar Nueva Cuenta',
            // headerRight: () => (
            //     // <Button onPress={() => this.props.navigation.navigate('Profile')} title="Edit" />
            //     <Icon.Button name="edit" backgroundColor="#3b5998" onPress={() => this.props.navigation.navigate('Profile')} />
            //   ),
        });
    }

    async SendForm(){
        this.setState({loading: true});

        //------------ Users ----------------
        let login ={
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            confirmed: this.state.confirmed
        };
        const data = await axios.post('https://appxiapi.loginweb.dev/users', login);
        if (data) {
            console.log(data.data);
            
        } else {
            console.log('algo mal paso');
        }

        //------------ Token ----------------
        let login2 = {
            identifier: this.state.email,
            password: this.state.password
        };
        const data2 = await axios.post('https://appxiapi.loginweb.dev/auth/local', login2);
        if (data2) {
            console.log(data2.data);
            let user = {
                id: data2.data.user.id,
                username: data2.data.user.username,
                email: data2.data.user.email,
                created_at: data2.data.user.created_at,
                updated_at: data2.data.user.updated_at,
                jwt: data2.data.jwt
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
        } else {
            console.log('algo mal paso');
        }

        //------------ Customers ----------------
        let login3 = {
            first_name: this.state.username,
            user_id:  data2.data.user.id
        };
        const data3 = await axios.post('https://appxiapi.loginweb.dev/customers', login3);
        if (data3) {
            console.log(data3.data);
        } else {
            console.log('algo mal paso');
        }
    }

    SaveRedux(response){
        console.log(response)
    }

    render() {
        return (
            <>
            <ScrollView style={{  flex: 1, marginTop: Register.statusBarHeight }}>
                <View style={{ margin: 5, flex: 1 }}>
                    <Text>Nombres (Obligatorio)</Text>
                    <TextInput
                        placeholder ="Nombres"
                        style={{ borderColor: Config.color.textPrimary, borderWidth: 1, width: '100%' }}
                        onChangeText={text => this.setState({username: text})}
                        value={this.state.username}
                    />
                </View>
               
                <View style={{ margin: 5, flex: 1 }}>
                    <Text>Apellidos (Obligatorio)</Text>
                    <TextInput
                        placeholder ="Apellidos"
                        style={{ borderColor: Config.textPrimary, borderWidth: 1, width: '100%' }}
                        onChangeText={text => this.setState({username: text})}
                        value={this.state.username}
                    />
                </View>

                <View style={{ margin: 5, flex: 1 }}>
                    <Text>Telefono (Obligatorio)</Text>
                    <TextInput
                        placeholder ="Telefono"
                        style={{ borderColor: Config.color.textPrimary, borderWidth: 1, width: '100%' }}
                        onChangeText={text => this.setState({username: text})}
                        value={this.state.username}
                    />
                </View>
                <View style={{ margin: 5, flex: 1 }}>
                    <Text>Correo (Opcional)</Text>
                    <TextInput
                        placeholder ="Telefono"
                        style={{ borderColor: Config.textPrimary, borderWidth: 1, width: '100%' }}
                        onChangeText={text => this.setState({username: text})}
                        value={this.state.username}
                    />
                </View>

                <View style={{ margin: 5, flex: 1 }}>
                    <Text>Contraseña (Obligatorio)</Text>
                    <TextInput
                        placeholder ="Telefono"
                        style={{ borderColor: Config.textPrimary, borderWidth: 1, width: '100%' }}
                        onChangeText={text => this.setState({username: text})}
                        value={this.state.username}
                    />
                </View>
                
            
                {/* <Text>Telefono (*)</Text>
                <TextInput
                    placeholder ="Apellidos"
                    style={{ borderColor: Config.textPrimary, borderWidth: 1, width: '100%', marginVertical: 10 }}
                    onChangeText={text => this.setState({username: text})}
                    value={this.state.username}
                />
                <TextInput
                    placeholder ="Correo Electronico"
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 300, marginVertical: 5 }}
                    onChangeText={text => this.setState({email: text})}
                    value={this.state.email}
                />
                <TextInput
                    placeholder ="Contraseña"
                    secureTextEntry={true}
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 300, marginVertical: 5 }}
                    onChangeText={text => this.setState({password: text})}
                    value={this.state.password}
                />
                <Icon.Button
                    name="send"
                    backgroundColor="#3b5998"
                    onPress={this.SendForm.bind(this)}
                >
                    {this.state.loading ? 'Enviando...' : 'Enviar'}
                </Icon.Button> */}
                
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);


