import { create } from "zustand";

type CartItem = {
    id: number,
    title: string,
    heroImage: string,
    price: number,
    quantity: number,
    maxQuantity: number,
}

type CartState  = {
    items: CartItem[],
    addItem: (item: CartItem)=> void,
    removedItem: (id: number)=> void,
    incrementItem: (id: number)=> void,
    decrementItem: (id: number)=> void,
    getTotalPrice: ()=> string,
    getItemCount: ()=> number
}

const initialCartItem: CartItem[]= [];

export const useCartStore = create<CartState>((set, get)=> ({
    items: initialCartItem,
    addItem: (item: CartItem)=> {
        const existingItem = get().items.find(i=> i.id===item.id);
        if(existingItem){
            set(state=> ({
                items: state.items.map(i=> i.id=== item.id ?( {
                    ...i,
                    quantity: Math.min(
                        i.quantity + item.quantity, i.maxQuantity
                    )
                }):i),
            }))
        }else{
            set(state=> ({items: [...state.items, item]})); 
        }
    },
    removedItem: (id: number)=> set(state=> ({items: state.items.filter(i=> i.id !== id)})),
    incrementItem: (id: number)=> set(state=> {
        
        return {
            items: state.items.map(p => p.id=== id && p.quantity<p.maxQuantity ? {
                ...p,
                quantity: p.quantity+1
            }: p)
        }
    }),
    decrementItem: (id: number)=> set(state=> {
        return {
            items: state.items.map(p => p.id=== id && p.quantity> 1 ? {
                ...p,
                quantity: p.quantity-1
            }: p)
        }
    }),
    getTotalPrice: ()=> {
        const {items} = get();

        return items.reduce((total, item)=> total + (item.price * item.quantity), 0).toFixed(2);
    },
    getItemCount: ()=> {
        const { items } = get();

        return items.length;
    }
}))