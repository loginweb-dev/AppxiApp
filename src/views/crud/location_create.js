const react = require("react");

import React, { Component } from 'react';
import { View, Text, Alert, Button, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

class LocationCreate extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            data: [
                {
                    label: 'Casa o Domicilio',
                    value: "I'm not same as label",
                    color: '#002746',
                    disabled: false,
                    size: 32,
                },
                {
                    label: 'Oficina o Trabajo',
                    value: "I'm not same as label",
                    color: '#002746',
                    disabled: false,
                    size: 32,
                },
                {
                    label: 'Deportes o Diversion',
                    value: "I'm not same as label",
                    color: '#002746',
                    disabled: false,
                    size: 32,
                },
                {
                    label: 'Otros',
                    value: "I'm not same as label",
                    color: '#002746',
                    disabled: false,
                    size: 32,
                }
            ]
        }
        
    }
    componentDidMount() {
        this.props.navigation.setOptions({
            title: 'Nueva Ubicación',
            headerRight: () => (
                <Icon.Button name="save" backgroundColor="#3b5998" onPress={() => this.props.navigation.navigate('Profile')} />
              ),
        });
        console.log(this.props.user.id);
    }
    onPress = data => this.setState({ data });
    render(){
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Escoje el tipo {this.props.user.id}</Text>
                <TextInput
                    placeholder ="customer_id"
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 300, marginVertical: 5 }}
                    onChangeText={(value) => this.props.user.id}
                    value={this.props.user.id.toString()}
                />
                <TextInput
                    placeholder ="latitud"
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 300, marginVertical: 5 }}
                    onChangeText={text => this.setState({password: text})}
                />
                <TextInput
                    placeholder ="longitud"
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 300, marginVertical: 5 }}
                    onChangeText={text => this.setState({password: text})}
                />
                <TextInput
                    multiline={true}
                    placeholder ="Descripcion de la nueva locacion"
                    // numberOfLines={2}
                    style={{ height: 60, borderColor: 'gray', borderWidth: 1, width: 300, marginVertical: 5 }}
                    onChangeText={text => this.setState({password: text})}
                />
                
            </View>
        );
     }
};


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
export default connect(mapStateToProps, mapDispatchToProps)(LocationCreate);