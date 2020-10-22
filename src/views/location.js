//------------------ REACT ---------------------------------------------+
import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import moment from 'moment';
import ActionButton from 'react-native-action-button';
//----------------- CONFIG------------------------------
import { Config } from '../config';


// ----------  REUX ------------------------
import { connect } from 'react-redux';


//-------------------- axios ------------
import axios from 'axios';

class Location extends Component{
    constructor(props){
        super(props);
        this.state = {
            locations : []
        }
    }

    async componentDidMount(){

        const { data } = await axios.get('https://appxiapi.loginweb.dev/customer-locations?customer.id='+this.props.user.customer.id);
        this.setState( {locations: data} );
        this.props.setLocations(data);
    }

    
    render() {
        return (
            <>
                <ScrollView style={{ marginTop: Location.statusBarHeight }}>
                    {/* <View style={{ flex: 1, backgroundColor: Config.color.secondary, borderRadius: 10, padding: 10, margin: 5 }}>
                        <Text style={{ color: Config.color.textSecondary }}>Seleccione una Ubicacion para Pedir Transporte</Text>
                    </View> */}
                    {/* <Text>{JSON.stringify(this.props.locations)}</Text> */}
                    {
                        
                        this.props.locations.map((item, index) => (
                            <TouchableOpacity
                                key = {item.id}
                                style = {{ padding: 10, backgroundColor: Config.color.primary, margin: 5, borderRadius: 10 }}
                                // onPress = {() => this.alertItemName(item)}
                                >
                                <View style={{ flexDirection: 'row', margin: 1 }}>
                                    <Image
                                        source={{
                                        uri:
                                            Config.API+item.location.image.url
                                        }}
                                        style={{ resizeMode: 'stretch', margin: 1, padding: 15 }}
                                    />
                                    {/* <View style={{ flexDirection: 'column', margin: 5 }}> */}
                                        <Text style={{ color: Config.color.textMuted }}>
                                            {item.location.title} 
                                            {"\n"}
                                            Creado: {moment.duration(item.created_at).humanize()}
                                        </Text>
                                        {/* <Text style={{ color: Config.color.textMuted }}>
                                            {item.location.title} 
                                        </Text>
                                    </View> */}
                                </View>
                              
                                <Text style={{ color: Config.color.textSecondary, fontSize: 25,  margin: 1 }}>
                                    {item.direction}
                                </Text>
                                
                            </TouchableOpacity>
                        ))
                    }
                    {/* <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'center' }}> */}
                        {/* <TouchableOpacity 
                        onPress = {() => this.alertItemName1()}
                        style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 10, margin: 5, height: 40, backgroundColor: Config.color.secondary, borderWidth: 0.5, borderColor: '#ffff', marginLeft: 'auto' }}>
                            <Image
                                source={{
                                uri:
                                    'https://mystorage.loginweb.dev/storage/Projects/appxi/google-maps-logo.png',
                                }}
                                style={{ width: 40, height: 40, margin: 5, padding: 5 }}
                            />
                            <View style={{ backgroundColor: '#fff', width: 1, height: 40 }} />
                            <Text style={{ color: '#fff', margin: 10, fontSize: 20 }}>
                                Crear Nueva Ubicación
                            </Text>
                        </TouchableOpacity> */}
                    {/* </View> */}
                  
                </ScrollView>
                <ActionButton
                    position="right"
                    buttonColor={Config.color.secondary}
                    onPress={() => { this.props.navigation.navigate('LocationCreate')}}
                />
            </>
        );
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Location);


