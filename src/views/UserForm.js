import React, {useContext, useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import UsersContext from '../context/UsersContext';

export default ({route, navigation}) => {
  const [user, setUser] = useState(route.params ? route.params : {});

  const {dispatch} = useContext(UsersContext);

  return (
    <View style={styles.form}>
      <Text style={styles.text}>Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={name => setUser({...user, name})} // Pega todos os atributos do usuário e sobreescreve o valor de name
        placeholder="Informe o nome"
        value={user.name}
      />

      <Text style={styles.text}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={email => setUser({...user, email})} // Pega todos os atributos do usuário e sobreescreve o valor de email
        placeholder="Informe o Email"
        value={user.email}
      />

      <Text style={styles.text}>Url do Avatar</Text>
      <TextInput
        style={styles.input}
        onChangeText={avatarUrl => setUser({...user, avatarUrl})} // Pega todos os atributos do usuário e sobreescreve o valor de avatar
        placeholder="Informe a URL do Avatar"
        value={user.avatarUrl}
      />

      <Button
        title="Salvar"
        onPress={() => {
          dispatch({
            type: user.id ? 'updateUser' : 'createUser',
            payload: user,
          });
          //Não funfou ;-;
          navigation.goBack();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 15,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: '#888',
  },
});
