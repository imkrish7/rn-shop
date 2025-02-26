import { Redirect, Tabs } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, StyleSheet } from "react-native";

import { FontAwesome } from "@expo/vector-icons"
import { useAuth } from "../../providers/auth-provider";


function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'],
    color: string
}){
    return <FontAwesome size={8} {...props} style={{color: "#1BC464"}} />
}


const TabsLayout = ()=>{
    const { session, mounting } = useAuth();

    if(mounting) return <ActivityIndicator />

    if(!session) return <Redirect href="/auth" />

    return <SafeAreaView edges={['top']} style={styles.safeArea}>
                <Tabs screenOptions={{
                    tabBarActiveTintColor: "#1BC464",
                    tabBarInactiveTintColor: "gray",
                    tabBarLabelStyle: { fontSize: 16},
                    tabBarStyle: {
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                        padding: 10
                    },
                    headerShown: false
                }}>
                    <Tabs.Screen name="index" options={{
                        title: 'Shop',
                        tabBarIcon: (props)=>{
                        return <TabBarIcon {...props} name="shopping-cart" />
                    }}} />
                    <Tabs.Screen name="orders" options={{
                        title: 'Order',
                        tabBarIcon: (props)=>{
                            return <TabBarIcon {...props} name="book" />
                        }
                    }} />
                   
                </Tabs>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1
    }
})

export default TabsLayout;