import axios from 'axios';
import * as ProfileAction from '../../actiontypes/profiles/profile';

const initialState = {
  follows: 0,
  followers: 0,
  username: 'Kyppy',
};
var v = 0;
var h = 0;

async function asyncFunc() {
  const res = await axios.get(' http://127.0.0.1:8000/api/follows/count/Kyppy/');
  return res;
}

export default function Profile(state = initialState, action) {
  let responseValue = 0;
  switch (action.type) {
    case ProfileAction.UPDATE_FOLLOWS:
      axios.get(' http://127.0.0.1:8000/api/follows/count/Kyppy/')
        .then((response) => {
        // handle success
          v = response.data.success[0].follows;
        })
        .catch((error) => {
        // handle error
          console.log('Error fecthing and parsing data', error);
        });
      console.log(v);
      return { ...state, follows: v };

    case ProfileAction.UPDATE_FOLLOWERS:
      axios.get(' http://127.0.0.1:8000/api/follows/count/Kyppy/')
        .then((response) => {
        // handle success
          responseValue = response.data.success[0].followers;
        })
        .catch((error) => {
        // handle error
          console.log('Error fecthing and parsing data', error);
        });
      return [
        ...state,
        {
          followers: responseValue,
        },
      ];
    default:
      return state;
  }
}
