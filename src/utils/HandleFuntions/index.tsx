import {Idata} from '../../types';
import {ref, onValue, set} from 'firebase/database';
import {database, linkSheet} from '../../configs/firebase/firebaseconfig';

function updateById(docId: string, Object: Idata) {
  console.log();
  
  const docRef = ref(
    database,
    `${linkSheet}/${docId}`
  );
  let doc: Idata;
  onValue(docRef, snapshot => {
    doc = snapshot.val();
  });

  set(
    ref(
      database,
      `${linkSheet}/${docId}`,
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
