import React ,{useState}  from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher'; 
import AsyncStorage from '@react-native-async-storage/async-storage';



const Space = () => (
  <View style={styles.space} />
);

export default function App() {

  const [data, setData] = React.useState('Type here!');
  let [content, setContent] = React.useState(''); 

  const saveContent = async () => {     
    
    const directory = FileSystem.documentDirectory + 'file.txt'; 
    await FileSystem.writeAsStringAsync(directory, content, { encoding: 'utf8'});
    const reading = await FileSystem.readAsStringAsync(directory, { encoding: 'utf8'});
    
    setData(reading);
    
    
    FileSystem.getContentUriAsync(directory).then(cUri => {
      console.log(cUri);
      IntentLauncher.startActivityAsync('android.intent.action.VIEW', {  
        data: cUri,
        flags: 1, 
      });
    }); 
    
    
  }

  return (    
 
    <View style={styles.container}>
        <Image
        source={require("./assets/logo_CA1.png")}
        style={{ width: 200, height: 200, marginTop: 64 }}
        resizeModo="contain"
      />
    <Text style={styles.title}>{data}</Text>

     <Space/>

    <TextInput
    style={styles.textInput}
    onChangeText={content => setContent(content)}
    value={content}/>
    <Space/>

    <Button onPress={saveContent} title = "Save data" color= '#2DE2FF'/>
    </View>
  
 
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    textDecorationColor:'#fff',
    marginVertical: 8,
    color: 'black',
    fontSize: 20,
    letterSpacing: 2,
    
    fontWeight: 'bold',
    fontFamily: 'verdana',
  },
  space: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textInput:{
    height: 60, 
    borderColor: 'gray', 
    borderWidth: 1, 
    width: 225,
    fontSize: 20,
    fontFamily: 'Roboto',
    letterSpacing: 1,
  },
  
});

