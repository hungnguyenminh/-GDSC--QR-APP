import {Idata} from '../../types';
import {ref, onValue, set} from 'firebase/database';
import {database} from '../../configs/firebase/firebaseconfig';

function updateById(docId: string, Object: Idata) {
  const docRef = ref(
    database,
    '142Ei6ewo87GYD-f6qzL_V-KmKtBQN5s6cDObMkgsBXI/Sheet1/' + docId,
  );
  let doc: Idata;
  onValue(docRef, snapshot => {
    doc = snapshot.val();
  });

  set(
    ref(
      database,
      '142Ei6ewo87GYD-f6qzL_V-KmKtBQN5s6cDObMkgsBXI/Sheet1/' + docId,
    ),
    {
      ID: Object.ID,
      Name: Object.Age,
      Age: Object.Age,
      Email: Object.Email,
      LinkQR: Object.LinkQR,
      Valid: Object.Valid,
    },
  )
  .then((res) => {
    console.log("success");
  })
  .catch((res) => {
    console.log("failed!");
  });
}

export {updateById};
