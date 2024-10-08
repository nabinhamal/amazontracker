import { router, Stack } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text,TextInput,View } from "react-native";
import { supabase } from "~/utils/supabase";


export default function LoginScreen (){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const onSignIn = async() =>{
        const {data ,error} = await supabase.auth.signInWithPassword({
            email,password
        })
        if(error){
            Alert.alert("Error on SignIn  ",error.message)
        } 
    }   
    const onSignUp =async () =>{
      const {data,error} =  await supabase.auth.signUp({
email,password,
        })
        if(error){
            Alert.alert("Error creating the account ",error.message)
        }
        console.log(data)
    }


    return (
        <View className="gap-3 p-3 bg-sky-700 h-screen ">
        <Stack.Screen options={{title: 'Sigh In'}}/>
            <TextInput 
            value={email}
            onChangeText={setEmail}
            className=" rounded border border-gray-300 bg-white p-5 " placeholder="Email"/>
            <TextInput 
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className=" rounded border border-gray-300 bg-white p-5 " placeholder="Password"/>
            <View className="gap-2 flex-row">

<Pressable
onPress={onSignIn}
className='bg-teal-500 p-4 rounded-md flex-1 items-center  ' >
    <Text className="font-bold color-white">Sign In</Text>
</Pressable>
<Pressable
onPress={onSignUp}
className='bg-teal-500 p-4 rounded-md flex-1 items-center'>
    <Text className="font-bold color-white">Sign Up</Text>
</Pressable>
            </View>
        </View>
    )
}