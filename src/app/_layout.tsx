import { Stack } from "expo-router";

export default function RootLayout(){
    return <Stack>
        <Stack.Screen name="(shop)" options={{headerShown: false, title: "Shop"}}></Stack.Screen>
        <Stack.Screen name="categories" options={{headerShown: true, title: "Categories"}}></Stack.Screen>
        <Stack.Screen name="product" options={{headerShown: true, title: "Product"}}></Stack.Screen>
        <Stack.Screen name="cart" options={{presentation: "modal", title: "Shopping Cart"}}></Stack.Screen>
        <Stack.Screen name="auth" options={{headerShown: true}}></Stack.Screen>
        <Stack.Screen name="+not-found" />
    </Stack>
}