//----------------------  REACT NATIVE------------------------------------------------------------------
import React, { Component } from 'react';
import { View, Text, Alert, Button, StyleSheet, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

//----------------  MAPS ---------------------------------------------------------------
import MapView, { PROVIDER_GOOGLE, Marker, MAP_TYPES } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';

//------------------------ REDUX -------------------------------
import { connect } from 'react-redux';

//------------------------ Config -------------------------------
import { Config } from '../config';

//-------------------- GEO LOCATION ------------------------------------
Geolocation.getCurrentPosition(info => console.log(info));

class Maps extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            location: null,
            latitude: Config.maps.latitude,
            longitude: Config.maps.longitude
        }
    }
    
    componentDidMount() {
        this.props.navigation.setOptions({
            title: '¿Donde Quieres Ir?',
            headerRight: () => (
                <Icon.Button name="pencil" backgroundColor={Config.color.secondary} onPress={() => this.props.navigation.navigate('Example')} >
                    <Text style={{ color: Config.color.textPrimary }}>Solicitar</Text>
                </Icon.Button>
              ),
        });

        Geolocation.getCurrentPosition(
			position => {
				const location = JSON.stringify(position);
                this.setState({ location });
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }
                });
			},
			error => Alert.alert(error.message),
			{ enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
        );

        Geolocation.watchPosition(
            position => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            }, 
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
        );
        
    }
    
     render(){
        return(
            <View style={{ flex: 1 }}>
                <MapView
                    style={{ flex: 1 }}
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
                    <MapView.Marker
                        coordinate={{ "latitude": this.state.latitude,   
                        "longitude": this.state.longitude }}
                        title={ this.props.user.name }
                    />
                    <MapViewDirections
                        origin={{ latitude: this.state.latitude, longitude: this.state.longitude }}
                        language='es'
                        mode='DRIVING'
                        destination={{ latitude: -14.839733, longitude: -64.909949 }}
                        apikey='AIzaSyBGfY28kVR1D4-WK_g_FwXG7bXCHIvpCjQ'
                        strokeWidth = { 4 } 
                        strokeColor = "hotpink" 
                        waypoints= {[{ 
                            latitude: -14.839733, longitude: -64.909949
                         }]}
                         onReady={result => {
                            console.log('Distance:' + result.distance + 'km')
                            console.log('Duration:' + result.duration + 'min.')
                          }}
                    />
                </MapView>

                <ScrollView horizontal={true} style={{ position: "absolute", bottom: 0 }}>
                    <TouchableOpacity 
                        style={{ opacity: 0.6, padding: 8, backgroundColor: Config.color.primary, alignItems: "center", }} 
                        onPress = {() => {
                            this.setState({
                                latitude: -14.839733,
                                longitude: -64.909949
                            });
                            ToastAndroid.showWithGravity(
                                "Locacion Establecida",
                                ToastAndroid.SHORT,
                                ToastAndroid.TOP
                            );
                        }}
                    >
                        <Icon.Button
                            name="home"
                            backgroundColor="#3b5998" 
                            onPress = {() => {
                                this.setState({
                                    latitude: -14.839733,
                                    longitude: -64.909949,
                                    latitudeDelta: 0.090,
                                    longitudeDelta: 0.090
                                });
                            }}
                        >
                        </Icon.Button>
                        <Text style={{ color: "#FFFFFF" }}>Location #1</Text>
                    </TouchableOpacity>  
                    <TouchableOpacity 
                        style={{ opacity: 0.6, padding: 8, backgroundColor: "#002746", alignItems: "center", }}
                        onPress = {() => {
                            this.setState({
                                latitude: -14.810000,
                                longitude: -64.950049
                            });
                        }}
                    >
                        <Icon.Button
                            name="graduation-cap"
                            backgroundColor="#3b5998" 
                            onPress = {() => {
                                this.setState({
                                    latitude: -14.810000,
                                    longitude: -64.950049
                                });
                            }}
                        >
                        </Icon.Button>
                        <Text style={{ color: "#FFFFFF" }}>Location #2</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity 
                        style={{ opacity: 0.6, padding: 8, backgroundColor: "#002746", alignItems: "center", }}
                        onPress={() => this.props.navigation.navigate('LocationCreate', {
                            latitude: this.state.latitude,
                            longitud: this.state.longitude
                        })}
                    >
                    <Icon.Button name="plus" backgroundColor="#242526" />
                    <Text style={{ color: "#FFFFFF" }}>Nuevo</Text>
                    </TouchableOpacity>

                </ScrollView>
                        
                <ScrollView horizontal={false} style={{ position: "absolute", paddingVertical: 0 }}>
                    <TouchableOpacity 
                        style={{ opacity: 0.6, padding: 6, backgroundColor: "#002746", alignItems: "center", }} 
                        onPress = {() => {
                            this.setState({
                                latitude: -14.839733,
                                longitude: -64.909949
                            });
                        }}
                    >
                        <Icon.Button
                            name="search"
                            backgroundColor="#3b5998" 
                            size={20} 
                            onPress = {() => {
                                this.setState({
                                    latitude: -14.839733,
                                    longitude: -64.909949
                                });
                            }}
                        >
                        </Icon.Button>
                        <Text style={{ color: "#FFFFFF" }}>Buscar</Text>
                    </TouchableOpacity>  
                 
                </ScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(Maps);