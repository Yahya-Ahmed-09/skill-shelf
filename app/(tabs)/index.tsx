import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { googleSignOut } from '@/Redux/Actions/GoogleSignOutAction'
import { useDispatch } from 'react-redux'
import { useRouter } from 'expo-router'
import auth from '@react-native-firebase/auth'


const Home = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const handleSignOut =()=>{
        
        dispatch(googleSignOut())
        auth()
  .signOut()
  .then(() => console.log('User signed out!'));
        router.navigate('/SignUp')
        
    }
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} >
      <Text>Home</Text>
        <TouchableOpacity onPress={handleSignOut} style={{backgroundColor: 'blue', padding: 20,}}>
            <Text style={{color: 'white'}}>Signout</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})