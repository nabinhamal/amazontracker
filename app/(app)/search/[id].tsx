import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Linking, Pressable, Text, View } from "react-native";
import dummyProducts from "~/assets/search.json"
import { supabase } from "~/utils/supabase";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)



const products= dummyProducts.slice(0,20)


export default function SearchResultScreen(){
const {id} = useLocalSearchParams()
const [search,setSearch] = useState()
useEffect(()=>{
supabase.from('searches').select('*').eq('id',id).single().then(({data})=> setSearch(data))
},[id])


if(!search){
    return <ActivityIndicator/>
}


    return (
    <View>
        <View className="bg-white p-2 rounded shadow-sm">

        <Text className="font-semibold text-4xl">{search?.query}</Text>
        <Text>{dayjs(search.created_at).fromNow()}</Text>
        <Text>{search.status}</Text>
        </View>
<FlatList
data={products}
contentContainerClassName="gap-2 p-2  "
keyExtractor={(item) => item.asin}
renderItem={({item}) =>(
    <Pressable onPress={() => Linking.openURL(item.url)}>
    <View className="bg-white p-3 flex-row gap-2 rounded-md">
        <Image source={{uri: item.image}} className="h-20 w-20 rounded-md"/>
        <Text className="flex-1" numberOfLines={4}>{item.name}</Text>
        <Text>$ {item.final_price}</Text>
    </View>
    </Pressable>
    
    )}
/>
    </View>
    )
}