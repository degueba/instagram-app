import React, {Component} from 'react';
import {
	StyleSheet, 
	View,
	Image,  
	TouchableOpacity,
	TextInput} from 'react-native';


type Props = {};

export default class InputComentario extends Component<Props> {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	valorComentario: ''
	  };
	}

	render() {
		return (
			<View style={[styles.comentario, styles.addComment]}>
				<TextInput 
				  style={styles.input} 
				  placeholder="Adicione um comentário..."
				  ref={input => this.inputComentario = input}
				  onChangeText={texto => this.setState({valorComentario: texto})}
				  underlineColorAndroid="transparent"
				/>
				
				<TouchableOpacity onPress={() => {
						this.props.comentarioCallback(this.props.idFoto, this.state.valorComentario, this.inputComentario)
						this.setState({valorComentario: ''})
					}
				}>
				  <Image style={styles.buttonSend} 
					source={require('../../assets/btn-send.png')}
				  />
				</TouchableOpacity>
		  </View>
		)
	}
}

const styles = StyleSheet.create({
  comentario: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 15
  },
  addComment: {
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d9'
  },
  buttonSend: {
    width: 30,
    height: 30
  }
});