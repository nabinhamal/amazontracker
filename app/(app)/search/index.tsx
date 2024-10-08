import { FlatList, Image, Linking, Pressable, Text, View } from "react-native";
import dummyProducts from "~/assets/search.json"

const products= dummyProducts.slice(0,20)


export default function SearchResultScreen(){

    return (
    
    <View>
        <Text className="text-4xl m-3 text-center uppercase">Result</Text>
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