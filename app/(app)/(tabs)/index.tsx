import { Link, router, Stack } from 'expo-router';
import { useState } from 'react';
import {  Pressable, Text, TextInput, View } from 'react-native';
import { supabase } from '~/utils/supabase';


export default function Home() {
  const [search,setSearch] = useState("")
  const performSearch =() =>{
    console.warn("Search:",search)
    router.push("/search")
  }
  return (
    <>
      <Stack.Screen options={{ title: 'Search'  }} />
      <View className='flex-row gap-3 p-3  '>
     <TextInput 
     value={search}
     onChangeText={setSearch}
     placeholder='Search for a Product' className=' flex-1 rounded-md p-3 bg-white border border-gray-300'/>
     <Pressable onPress={performSearch} className='bg-teal-500 p-3 rounded-md'>
      <Text>Search</Text>
     </Pressable>
     </View>
    
    </>
  );
}

