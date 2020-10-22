//------------------ REACT ---------------------------------------------+
import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Image, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import CheckBox from '@react-native-community/checkbox';

//----------------- CONFIG------------------------------
import { Config } from '../config';


// ----------  REUX ------------------------
import { connect } from 'react-redux';
import { ColorAndroid } from 'react-native/Libraries/StyleSheet/PlatformColorValueTypesAndroid';

  const renderItem = ({ item }) => (
    <View style={{ flex: 2, flexDirection: 'row' }}>
      <Text style={{ fontSize: 25 }}>{item.id}</Text>
      <Text style={{ fontSize: 25 }}>{item.title}</Text>
    </View>
  );
//   const Item = ({ item }) => (
//     <View style={{ flex: 2, flexDirection: 'row' }}>
//       <Text style={{ fontSize: 25 }}>{item.title}</Text>
//       <Text style={{ fontSize: 25 }}>{item.id}</Text>
//     </View>
//   );
class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            history : [
                {
                  id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
                  title: 'First Item',
                },
                {
                  id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
                  title: 'Second Item',
                },
                {
                  id: '58694a0f-3da1-471f-bd96-145571e29d72',
                  title: 'Third Item',
                },
              ]
        }
    }

    componentDidMount(){
    }

    
    render() {
        return (
            <>
                <View style={{ flex: 1 }}>
                    {/* <Text>Home</Text>    */}
                    {/* <Text style={{ fontSize: 30, alignItems: 'center', fontWeight: 'bold', textDecorationLine: 'underline' }}>Selecciona el Tipo</Text> */}
                    {/* <Text style={{ fontSize: 30, alignItems: 'center', fontWeight: 'bold', textDecorationLine: 'underline' }}>CUAL PREFIERES ?</Text>
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
                    </TouchableHighlight> */}
                    {
                        this.state.history.map((item, index) => (
                            <TouchableOpacity
                                key = {item.id}
                                style = {{ padding: 10, backgroundColor: Config.color.primary, marginTop: 5 }}
                                onPress = {() => this.alertItemName(item)}>
                                <Text style={{ color: Config.color.textSecondary }}>
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);


