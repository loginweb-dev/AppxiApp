const react = require("react");

import React, { Component } from 'react';
import { View, Text, Alert, Button, TextInput, Image, ScrollView, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button';
import { connect } from 'react-redux';
import axios from 'axios';

import {Picker} from '@react-native-community/picker';
//----------------  MAPS ---------------------------------------------------------------
import MapView, { PROVIDER_GOOGLE, Marker, MAP_TYPES } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';

//------------------------ Config -------------------------------
import { Config } from '../../config';

//-------------------- GEO LOCATION ------------------------------------
Geolocation.getCurrentPosition(info => console.log(info));

class LocationCreate extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            direction: '',
            location_id: '',
            latitude: Config.maps.latitude,
            longitude: Config.maps.longitude,
            locations: [],
        }
        
    }
    async componentDidMount() {
        this.props.navigation.setOptions({
            title: 'Nueva Ubicación',
            headerRight: () => (
                <Icon.Button name="save" backgroundColor="#3b5998" onPress={this.SendForm.bind(this)} />
              ),
        });
        // const  midata = await axios.get('https://appxiapi.loginweb.dev/customer-locations?customer.id=4');
        // console.log(midata.data);
        // console.log(this.props.user.id);
        // console.log('hola');
        // console.log(Config.API+'/locations');
        const { data } = await axios.get(Config.API+'/locations');
        // console.log(Config.API+'locations');
        // console.log(data);
        this.setState({locations: data});
        // console.log(this.state.locations);


        Geolocation.getCurrentPosition(
            position => {
                this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude})
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
        );
    }
    async SendForm()
    {
        let NewLocation = {
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            direction: this.state.direction,
            location: this.state.location_id,
            customer: this.props.user.customer.id

        }
        // console.log(NewLocation);
        try {
            const { data } = await axios.post(Config.API+'/customer-locations', NewLocation);
            // console.log(data)
            
            
            ToastAndroid.showWithGravity(
                'Ubicación Creada: '+data.direction,
                ToastAndroid.SHORT,
                ToastAndroid.TOP
            );
            const data2 = await axios.get('https://appxiapi.loginweb.dev/customer-locations?customer.id='+this.props.user.customer.id);
            this.props.setLocations(data2.data);
            // console.log(this.props.locations);
            // console.log(data2);
            this.props.navigation.navigate('TabMenu',  { screen: 'Ubicaciones' });
        } catch (error) {
            ToastAndroid.showWithGravity(
                error.message,
                ToastAndroid.SHORT,
                ToastAndroid.TOP
            );
        }
    }
    render(){
        return(
                <>
                    <MapView
                        style={{ flex: 3 }}
                        showsUserLocation={true}
                        provider={PROVIDER_GOOGLE}
                        initialRegion={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            latitudeDelta: 0.030,
                            longitudeDelta: 0.030
                        }}
                        region={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            latitudeDelta: 0.030,
                            longitudeDelta: 0.030
                        }}
                        // onRegionChange={}
                    >

                    </MapView>
                    <ScrollView style={{ flex: 1,  marginTop: LocationCreate.statusBarHeight, margin: 10 }}>
                        
                        <Picker
                            selectedValue={this.state.location_id}
                            style={{ width: '100%', borderWidth: 10, borderColor: Config.color.primary }}
                            onValueChange={(itemValue, itemIndex) => this.setState({location_id: itemValue})}
                        >
                            {
                                this.state.locations.map((item, key) =>
                                <Picker.Item label={item.title} value={item.id} key={key} />
                                )
                            }
                        </Picker>

                        {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> */}
                        {/* <Text>Escoje el tipo {this.props.user.id}</Text> */}
                        {/* <TextInput
                            placeholder ="customer_id"
                            style={{ borderColor: Config.color.primary, borderWidth: 1, width: '100%' }}
                            onChangeText={(value) => this.props.user.id}
                            value={this.props.user.id.toString()}
                        /> */}
                        {/* <TextInput
                            placeholder ="latitud"
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 0, marginVertical: 5 }}
                            onChangeText={text => this.setState({password: text})}
                        />
                        <TextInput
                            placeholder ="longitud"
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 0, height: 0, marginVertical: 5 }}
                            onChangeText={text => this.setState({password: text})}
                        /> */}
                        <TextInput
                            multiline={true}
                            placeholder ="Descripcion"
                            numberOfLines={2}
                            style={{ borderColor: Config.color.primary, borderWidth: 1, width: '100%' }}
                            onChangeText={text => this.setState({direction: text})}
                        />
                        
                    {/* </View> */}
                
                </ScrollView>
                {/* <ActionButton
                    position="right"
                    buttonColor={Config.color.secondary}
                    onPress={this.SendForm.bind(this)}
                /> */}
            </>
        );
     }
};


//---------------- REDUX ------------------------
const mapStateToProps = (state) => {
    return {
        user: state.user,
        locations: state.locations,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setUser : (newUser) => dispatch({
            type: 'SET_USER',
            payload: newUser
        }),
        setLocations : (newLocation) => dispatch({
            type: 'SET_LOCATIONS',
            payload: newLocation
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LocationCreate);