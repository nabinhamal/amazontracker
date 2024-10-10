import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Link, router, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import {  Pressable, Text, TextInput, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useAuth } from '~/context/AuthContext';
import { supabase } from '~/utils/supabase';


dayjs.extend(relativeTime)

export default function Home() {
  const [search,setSearch] = useState("")
  const {user} = useAuth()
  const [history,setHistory] = useState([])

  const fetchHistory = () =>{
    supabase.from("searches").select('*').eq("user_id",user?.id).order('created_at',{ascending : false}).then(({data}) =>setHistory(data))
  }

  useEffect(() =>{
    fetchHistory()
  },[])


  const performSearch =async () =>{
    console.warn("Search:",search)

    const {data,error} = await supabase.from('searches').insert({
      query: search,
      user_id:user?.id,

    }).select().single();
    if(data){

      router.push(`/search/${data.id}`)
    }
  }
  return (
    <View className='flex-1 bg-white'>
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
    <FlatList
    contentContainerClassName='p-3 g-2'
    onRefresh={fetchHistory}
    refreshing={false}
    data={history}
    renderItem={({item}) =>(
      <View className='border-b pb-2 border-gray-200'>
         <Text className='font-semibold text-lg'>{item.query}</Text>
         <Text className='color-gray-700'>{dayjs(item.created_at).fromNow()}</Text>
      </View>
     

    )}
    />
    </View>
  );
}

