import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Dimensions, ScrollView, FlatList, AsyncStorage} from 'react-native';
import Post from './Post';

const screen = Dimensions.get('screen').width;
type Props = {};

export default class Feed extends React.Component {

  constructor() {
    super();
    this.state = {
      fotos: [],
    }
  }

  componentDidMount() {
    //const uri = 'http://instalura-api.herokuapp.com/api/public/fotos';
    const uri = 'http://instalura-api.herokuapp.com/api/public/fotos/rafael';

    AsyncStorage.getItem('token')
      .then(token => {

        return {
          headers: new Headers({
            "X-AUTH-TOKEN": token
          })
        }

      })
      .then(requestInfo => fetch(uri, requestInfo))
      .then(resposta => resposta.json())
      .then(json => this.setState({fotos: json}))
      .catch(e => {
        console.warn('Não foi possível carregar as fotos: ' + e);
        this.setState({status: 'ERRO'})
      })
  }
  
  like(idFoto) {
    const foto = this.state.fotos.find(foto => foto.id === idFoto);

    let novaLista = []

    if(!foto.likeada){
      novaLista = [
        ...foto.likers,
        {login: 'meuUsuário'}
      ]
    } else {
      novaLista = foto.likers.filter(liker => {
        return liker.login !== 'meuUsuário'
      })  
    }

    const fotoAtualizada = { 
      ...foto,
      likeada: !foto.likeada,
      likers: novaLista
    }

    const fotos = this.state.fotos
      .map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto)

    this.setState({fotos: fotos})
  }

  comenta(idFoto, valorComentario, inputComentario) {
    
    if(valorComentario === ''){
      alert('Digite seu comentário!');
      return 
    }

    const foto = this.state.fotos.find(foto => foto.id === idFoto);
    
    let login = ['Mitaly', 'Thiago','Winicius','João','Guilherme','Mc Lan'];

    let comentarioAtualizado = [
        ...foto.comentarios, 
        {
          id: idFoto,
          login: login[Math.floor(Math.random() * login.length)],
          texto: valorComentario
        }
    ];

    let fotoAtualizada = {
      ...foto, 
      comentarios: comentarioAtualizado
    }

    const fotos = this.state.fotos
      .map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto)

    this.setState({fotos: fotos});
    inputComentario.clear();
  }


  render() {
    return (
      <FlatList
        keyExtractor={(item) => item.id.toString()} 
        data={this.state.fotos}
        renderItem={({item}) => 
          <Post foto={item} 
            likeCallback={this.like.bind(this)}
            comentarioCallback={this.comenta.bind(this)}/>
        }
      />
    );
  }
}

