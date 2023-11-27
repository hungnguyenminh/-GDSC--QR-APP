import {ref, set} from 'firebase/database';
import {db} from '../configs/firebase';

interface IDataUser {
  id: string;
  email: string;
  name: string;
}

function writeData(key: string, user: IDataUser) {
  return set(ref(db, 'class/' + key + '/' + user.id), {
    id: user.id,
    name: user.name,
    email: user.email,
  });
}

export {writeData};
