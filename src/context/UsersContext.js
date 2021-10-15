import React, {createContext, useReducer} from 'react';
import users from '../data/users';

const UsersContext = createContext({}); // Craindo o contexto com um objeto vazio

const initialState = {users};
const actions = {
  createUser(state, action) {
    const user = action.payload;
    user.id = Math.random();
    return {
      ...state,
      user: [...state.users, user],
    };
  },
  updateUser(state, action) {
    const updated = action.payload;
    return {
      ...state,
      users: state.users.map(u => (u.id === updated.is ? updated : u)),
    };
  },
  deleteUser(state, action) {
    const user = action.payload;
    return {
      ...state,
      users: state.users.filter(u => u.id !== user.id),
    };
  },
};

export const UsersProvider = props => {
  function reducer(state, action) {
    const fn = actions[action.type];
    return fn ? fn(state, action) : state;
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    // Criando um provider dentro desse contexto, e que recebe uma lista de elementos (props.children)
    <UsersContext.Provider value={{state, dispatch}}>
      {props.children}
    </UsersContext.Provider>
    //Então, ele disponibiliza, via contexto, a lista de usuários para a aplicação inteira, pois o App.js estará envolvido nele (props.children)
  );
};

export default UsersContext;
