import { ScrollView, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { database } from './component/firebaseconfig';

interface Participant {
  ID: number,
  Name: String,
  Age: Number,
  Email: String,
  LinkQR: String,
  Valid: boolean
}

export default function App() {

  const [data, setData] = useState<Participant>({
      ID: 0,
      Name: '',
      Age: 0,
      Email: '',
      LinkQR: '',
      Valid: false
  });

  useEffect(() => {
    const sheetRef = ref(database,'142Ei6ewo87GYD-f6qzL_V-KmKtBQN5s6cDObMkgsBXI/Sheet1');
    onValue(sheetRef, (snapshot) => {
      console.log(snapshot.val());
      setData(snapshot.val());
    });
    
  }, []);

  return (
    <ScrollView>
      {Object.entries(data).map(([key, value]) => (
        <View key={key}>
          <Text>{value.ID}</Text>
          <Text>{value.Name}</Text>
          <Text>{value.Age}</Text>
          <Text>{value.Email}</Text>
          <Text>{value.LinkQR}</Text>
          <Text>{value.Valid}</Text>
        </View>
      ))}
    </ScrollView>
  );
}