import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    Image,
    View,
    Button,
} from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';
import Config from 'react-native-config'

class SignInFields extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '' };
        this.handleButtonPress = this.handleButtonPress.bind(this);
    }

    handleButtonPress() {
        var details = {
            'client_id': Config.CLIENT_ID,
            'client_secret': Config.CLIENT_SECRET,
            'grant_type': 'password',
            'username': this.state.username,
            'password': this.state.password
        };
        const formBody = Object.keys(details).map(key=>encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

        fetch('https://online-go.com/oauth2/token/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        })
        .then((response) => response.json())
        .then((responseJson) => {
            // TODO parse JSON
            // {
            //     'access_token': '',
            //     'scope': 'read',
            //     'expires_in': '123456789',
            //     'refresh_token': '',
            // }
            console.log('access token: ' +  responseJson.access_token);
            console.log('refresh token: ' +  responseJson.refresh_token);
            console.log('token expires in: ' +  responseJson.expires_in_token);
        })
        .catch((error) => {
            console.error(error);
        });
    };

    render() {
        return (
            <View>
                <TextInput style={{height: 40, width: 300}}
                    keyboardType="default"
                    autoCapitalization="none"
                    autoCorrect={false}
                    multiline={false}
                    placeholder="Username or Email"
                    returnKeyType="next"
                    onChangeText={(text) => this.setState({username: text})}/>
                <TextInput style={{height: 40, width: 300}}
                    keyboardType="default"
                    autoCapitalization="none"
                    autoCorrect={false}
                    multiline={false}
                    placeholder="Username or Email"
                    returnKeyType="next"
                    secureTextEntry={true}
                    placeholder="Password"
                    onChangeText={(text) => this.setState({password: text})}/>
                <Button title="Sign In" onPress={ () => this.handleButtonPress() }/>
            </View>
        );
    }
}

class AltSignInOptions extends Component {
    render() {
        return (
            <View style={{flexDirection: 'row'}}>
                <Text>Facebook logo</Text>
                <Text>Google logo</Text>
                <Text>Twitter logo</Text>
            </View>
        );
    }
}

class HomeScreen extends Component {
    static navigationOptions = {
        title: 'online-go.com',
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                <View style={{flex: 1, height: 100, width: 250, justifyContent: 'center', paddingVertical: 20}}>
                    <Button onPress={ () => navigate('SignIn') } 
                        title="Sign In"/>
                </View>
                <View style={{flex: 6}}/>
            </View>
        );
    }
}


class SignInScreen extends Component {
    static navigationOptions = () => ({
        title: 'Sign In',
    });

    render() {
        const { params } = this.props.navigation.state;
        // TODO 
        // put the sign in stuff in a box with a shadow
        // below the box have a register and forgot password option
        return (
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                <View style={{flex: 1, paddingVertical: 20}}>
                    <SignInFields/>
                </View>
                <View style={{flex: 1, width: 250, paddingVertical: 20}}>
                </View>
            </View>
        );
    }
}

const OnlineGoApp = StackNavigator ({
    Home: { screen: HomeScreen },
    SignIn: { screen: SignInScreen },
});

AppRegistry.registerComponent('OnlineGoApp', () => OnlineGoApp);

// const styles = StyleSheet.create({
//     smallred: {
//         color: 'red',
//         fontSize: 10
//     },
//     bigblue: {
//         color: 'blue',
//         fontWeight: 'bold',
//         fontSize: 30
//     }
// });
// 
// class FlexDirectionBasics extends React.Component {
//     render() {
//         return (
//             <View style={{flex: 1, flexDirection: 'row'}}>
//               <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}}/>
//               <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}}/>
//               <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}}/>
//             </View>
//         );
//     }
// }
// 
// class Blink extends React.Component {
//     constructor(props) {
//         super(props);
//         // Start off True
//         this.state = {showText: true};
// 
//         // Run the function passed in as first argument every 1000 milliseconds
//         setInterval(() => {
//             // setState calls the render function again
//             this.setState({ showText: !this.state.showText });
//         }, 1000);
//     }
// 
//     render() {
//         // Check what the state is every time this renders
//         let display = this.state.showText ? this.props.text : ' ';
//         return (
//             <Text>{display}</Text>
//         );
//     }
// }
// 
// class Greeting extends React.Component {
//     render() {
//         return (
//             <Text>Hello {this.props.name}!</Text>
//         )
//     }
// }
// 
// class OnlineGoApp extends React.Component {
//     render() {
//         let pic = {
//             uri: 'http://c10.nrostatic.com/sites/default/files/styles/original_image_with_cropping/public/uploaded/donald-trump-grow-up.jpg?itok=n1PW3Myr'
//         };
//         return (
//             <View style={{flex: 1}}>
//               <View style={{alignItems: 'center'}}>
//                 <Text>Hello world!</Text>
//                 <Image source={pic} style={{width: 193, height: 110}}/>
//                 <Greeting name='Matthew'/>
//                 <Blink text='This is blinking text!'/>
//                 <Text style={styles.smallred}>small red text</Text>
//                 <Text style={[styles.smallred, styles.bigblue]}>BIG BLUE TEXT</Text>
//               </View>
//               <View style={{flex: 1, backgroundColor: 'powderblue'}}/>
//               <View style={{flex: 2}}>
//                 <FlexDirectionBasics/>
//               </View>
//               <View style={{flex: 3, backgroundColor: 'steelblue'}}/>
//             </View>
//         );
//     }
// }
// 
// AppRegistry.registerComponent('OnlineGoApp', () => OnlineGoApp);
