import React, {Component} from 'react';
import {
	StyleSheet, 
	View,
	Image,
	Text,  
	TouchableOpacity} from 'react-native';


type Props = {};

export default class Likes extends Component<Props> {
	constructor(props) {
		super(props);
	
		this.state = {
		};
	}

  carregaIcone(like) {
    return like ? require('../../assets/s2-fill.png') : 
      require('../../assets/s2.png')
  }

  exibeLikes(likers) {
    if(likers.length <= 0) return;

    return (
      <Text style={styles.likes}>
        {likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'}
      </Text>
    );
  }

	render() {
		const {foto, likeCallback} = this.props;

		return (
			<View>
				<TouchableOpacity onPress={() => {likeCallback(foto.id)}}>
					<Image
						style={styles.btnLike}
						source={this.carregaIcone(foto.likeada)}
					/>
				</TouchableOpacity>
				{this.exibeLikes(foto.likers)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	btnLike: {
    width: 40,
    height: 40,
    marginBottom: 10
  },
  likes: {
    fontWeight: 'bold'
  },
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










