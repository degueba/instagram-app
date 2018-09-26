/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform, 
    StyleSheet, 
    Text, 
    View,
    Image, 
    Dimensions, 
    ScrollView, 
    FlatList, 
    TouchableOpacity,
    TextInput} from 'react-native';

import InputComentario from './InputComentario';
import Likes from './Likes';

const screen = Dimensions.get('screen').width;
type Props = {};

export default class Post extends Component<Props> {

  exibeLegenda(foto) {
    if(foto.comentario === '') return

    return(
      <View style={styles.comentario}>
        <Text style={styles.tituloComentario}>{foto.loginUsuario}</Text>
        <Text>{foto.comentario}</Text>
      </View>
    )
  }

  exibeComentarios(foto) {
    return (
        <FlatList 
          data={foto.comentarios}
          keyExtractor={item => item.id.toString()}
          renderItem={ ({item}) => 
              <View style={styles.comentario}>
                  <Text style={styles.tituloComentario}>{item.login}</Text>
                  <Text>{item.texto}</Text>
              </View>
        }/>
    )
  }


  render() {
    const { foto, likeCallback, comentarioCallback } = this.props;

    return ( 
      <View>
        <View style={styles.profileView}>
          <Image 
            style={styles.profileImage}
            source={{uri: foto.urlPerfil}} 
          />
          <Text>{foto.loginUsuario}</Text>
        </View>
        
        <Image 
          style={styles.profilePost}
          source={{uri: this.props.foto.urlFoto}} 
        />

        <View style={styles.rodape}>
          <Likes 
            likeCallback={likeCallback} 
            foto={foto}/>

          {this.exibeLegenda(foto)}
          {this.exibeComentarios(foto)}
          
          <InputComentario idFoto={foto.id}
            comentarioCallback={comentarioCallback}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rodape: {
    margin: 10
  },
  profileView: {
    margin: 10, flexDirection: 'row', alignItems: 'center'
  },
  profileImage: {
    marginRight: 10, borderRadius: 20, width: 40, height: 40
  },
  profilePost: {
    width: screen, height: screen
  },
  comentario: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  tituloComentario: {
    fontWeight: 'bold',
    marginRight: 10
  }
});
