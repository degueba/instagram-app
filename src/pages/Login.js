import Expo from 'expo';
import React, {Component} from 'react';
import { StyleSheet, 
				 Dimensions,
				 View, 
				 Text, 
				 TextInput, 
				 Button, 
				 AsyncStorage} from 'react-native';

import { createStackNavigator } from 'react-navigation';


import Feed from '../components/Feed';



const width = Dimensions.get('screen').width;

type Props = {};

export default class Login extends Component<Props> {

	constructor(props) {
		super(props);
	
		this.state = {
			usuario: '',
			senha: '',
			mensagem: ''
		};
	}

	async _storeData(key) {
	  try {
			await AsyncStorage.multiSet(key);
	  } catch (error) {
		// Error saving data
		console.warn('error: ', error)
	  }
	}

	efetuaLogin() {
		const uri = 'http://instalura-api.herokuapp.com/api/public/login'; 
		const requestInfo = {
			method: 'post',
			body: JSON.stringify({
				login: this.state.usuario,
				senha: this.state.senha
			}),
			headers: new Headers({
				'Content-type': 'application/json'
			})
		};

		fetch(uri, requestInfo)
			.then(response => {
				if(response.ok)
					return response.text()

				throw new Error("Não foi possível efetuar o login!");
			})
			.then(token => {
				const { push, replace } = this.props.navigation;

				this._storeData(
				[
					['token', token],
					['usuario', this.state.usuario]
				])


				/// GO TO FEED PAGE
				replace('Home')
			})
			.catch(e => this.setState({mensagem: e.message}))
	}

	// methods
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Instagram</Text>
				<View style={styles.form}>
					<TextInput style={styles.input} 
						placeholder="Usuário"
						onChangeText={texto => this.setState({usuario: texto})} 
						autoCapitalize="none"
						underlineColorAndroid="transparent"/>
					<TextInput style={styles.input}
						placeholder="Senha"
						onChangeText={texto => this.setState({senha: texto})}
						secureTextEntry={true}
						underlineColorAndroid="transparent"/>

					<Button style={styles.button} title="Login" onPress={this.efetuaLogin.bind(this)}/>
				</View>
				
				<Text style={styles.mensagem}>
					{this.state.mensagem}
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	title: {
		fontWeight: 'bold',
		fontSize: 25,
		marginBottom: 20 
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	form: {
		width: width * 0.8, // 80%
	},
	input: {
		height: 40,
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
		marginBottom: 20
	},
	button: {
	},
	mensagem: {
		marginTop: 15,
		color: '#e74c3c'
	}
})