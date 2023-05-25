import React, {useState, useRef, useEffect, ReactElement} from 'react';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import {ref as refStorage, uploadBytes, getDownloadURL} from 'firebase/storage';
import {storage} from '../src/configs/firebase/firebaseconfig';
import { updateById } from '../DataInterface/updateById';

interface IQRCodeGenerator {
  item: any;
  itemKey: number;
}
function QRCodeGenerator(props: IQRCodeGenerator): ReactElement {
  const {item, itemKey} = props;
  const [urlQR, setIUrlQR] = useState<string>("")
  const qrRef = useRef<any>();

  const uploadQrCode = async () => {
    try {
      qrRef.current
        .capture()
        .then(uri => {
          console.log(uri);
          fetch(uri)
            .then(response => response.blob())
            .then(blob => {
              //Upload imageFile lên Firebase tại đây
              const imageRef = refStorage(storage, `images/${itemKey}`); // Sử dụng hàm ref từ firebaseconfig
              uploadBytes(imageRef, blob).then(snapshot => {
                console.log('uploadBytes');
                getDownloadURL(snapshot.ref).then(url => {
                  console.log(url);
                  setIUrlQR(url);
                });
              });
            });
        })
        .catch(error => {
          console.log('Error while capturing QR code', error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const newObj = {
    Age: item.Age,
    Email: `${item.Age}@gdsc.com-check`,
    ID: item.ID,
    LinkQR: urlQR,
    Name: item.Name,
    Valid: item.Valid,
  };

  useEffect(() => {
    uploadQrCode();
  }, []);
  updateById(itemKey.toString(), newObj);

  return (
    <ViewShot ref={qrRef}>
      <QRCode value={item.ID.toString()} />
    </ViewShot>
  );
}

export default QRCodeGenerator;
