import { Stack } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications";

export default function RootLayout(){
    return  <ToastProvider>
         <Stack>
            <Stack.Screen name="auth" options={{headerShown: true}}></Stack.Screen>
            <Stack.Screen name="(shop)" options={{headerShown: false, title: "Shop"}}></Stack.Screen>
            <Stack.Screen name="categories" options={{headerShown: false, title: "Categories"}}></Stack.Screen>
            <Stack.Screen name="product" options={{headerShown: false, title: "Product"}}></Stack.Screen>
            <Stack.Screen name="cart" options={{presentation: "modal", title: "Shopping Cart"}}></Stack.Screen>
            <Stack.Screen name="+not-found" />
         </Stack>
    </ToastProvider>
   
}