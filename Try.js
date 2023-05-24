import React from "react";
import { useState } from "react";
import { ref,uploadBytes } from "firebase/storage";
import {Text,View,TouchableOpacity} from "react-native"
import { storage } from "./component/firebaseconfig";

export default function App() {
     const [image, setImage] = useState('');
     const submitData = () => {
          const storageRef = ref(storage, 'image');
          // 'file' comes from the Blob or File API
          uploadBytes(storageRef, image)
          .then((snapshot) => {
               console.log('Uploaded a blob or file!');
          })
          .catch((error) => {
          console.log('jkdjkd',error);
     }).catch((error) => {
          console.log('Error while capturing QR code', error);
        });
};

const handleChange = (e) => {
     if (e.target.files[0]) {
          setImage(e.target.files[0])
     }
};
return (
     <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
           <Text style = {{color: 'red'}}>kfdkfjk</Text>
          <TouchableOpacity type="file" onPress={handleChange} style = {{width: 10,height: 20, borderColor: 'red'}}>choosefile</TouchableOpacity>
          <button style={{width: 10,height: 20, borderColor: 'red'}} type="button" onClick={submitData}>uploade</button>
     </View>
);
}