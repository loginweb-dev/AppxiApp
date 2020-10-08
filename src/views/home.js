//------------------ REACT ---------------------------------------------+
import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Image } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import CheckBox from '@react-native-community/checkbox';

//----------------- CONFIG------------------------------
import { Config } from '../config';


// ----------  REUX ------------------------
import { connect } from 'react-redux';

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount(){
        this.props.navigation.setOptions({
            title: 'Hola, '+this.props.user.name,
            headerRight: () => (
                // <Button onPress={() => this.props.navigation.navigate('Profile')} title="Edit" />
                <Icon.Button name="edit" backgroundColor="#3b5998" onPress={() => this.props.navigation.navigate('Profile')} />
              ),
        });
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {/* <Text>Home</Text>    */}
                <Text style={{ fontSize: 30, alignItems: 'center', fontWeight: 'bold', textDecorationLine: 'underline' }}>Selecciona el Tipo</Text>
                <Text style={{ fontSize: 30, alignItems: 'center', fontWeight: 'bold', textDecorationLine: 'underline' }}>de Transporte</Text>
                <Text style={{ fontSize: 25, paddingVertical: 10 }}>Moto Taxi</Text>
                <TouchableHighlight onPress={() => {this.props.navigation.navigate('Maps')}} style={{  alignItems: 'center' }}>
                    <Image
                        style={{ width: 150, height:150 }}
                        source={{
                            uri: 'https://mystorage.loginweb.dev/storage/Projects/appxi/suzuki-huracan-125-5-motos-de-trabajo.jpg',
                        }}
                    /> 
                </TouchableHighlight>
                <Text style= {{ fontSize: 25, paddingVertical: 10 }}>Auto Movil</Text>
                <TouchableHighlight onPress={() => {this.props.navigation.navigate('Maps')}}>

                    <Image
                        style={{ width: 150, height:150 }}
                        source={{
                            uri: 'https://mystorage.loginweb.dev/storage/Projects/appxi/descarga.jpg',
                        }}
                    />
                </TouchableHighlight>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);


