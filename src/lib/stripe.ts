import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native";
import { supabase } from "./supabase"
import { CollectionMode } from "@stripe/stripe-react-native/lib/typescript/src/types/PaymentSheet";

const fetchStripeKeys = async(totalAmount: number)=>{
    const { data, error } = await supabase.functions.invoke('stripe-checkout', {
        body: {
            totalAmount,
        }
    })

    if (error){
        throw new Error('An error accourd while fetching payment')
    }

    return data;
}

export const setupStripePaymentSheet = async(totalAmount: number)=>{
    const { paymentIntent, publicKey, ephermalKey, customer } = await fetchStripeKeys(totalAmount);

    if(!paymentIntent || !publicKey){
        throw new Error('Failed to fetch stripe keys')
    }   

    await initPaymentSheet({
        merchantDisplayName: 'rn-shop',
        customerId: customer,
        customerEphemeralKeySecret: ephermalKey,
        paymentIntentClientSecret: paymentIntent,
        billingDetailsCollectionConfiguration: {
            name: 'always' as CollectionMode,
            phone: 'always' as CollectionMode,

        },
    })
}

export const openStripeCheckout = async ()=>{
    
    const { error } = await presentPaymentSheet();

    if(error){
        throw new Error(error.message)
    }

    return true;
}