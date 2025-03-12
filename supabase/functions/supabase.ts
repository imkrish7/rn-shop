import { createClient } from 'jsr:@supabase/supabase-js@2'
import Stripe from "npm:stripe@^17.7.0";

const stripe = Stripe(Deno.env.get('STRIPE_SECRET_KEY'), {
    httpClient: Stripe.createFetchHttpClient()
  })

export const getOrCreateStripeCustomerForSupabaseUser = async(req: Request)=>{

    const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      )
    
      // Get the session or user object
      const authHeader = req.headers.get('Authorization')!
      const token = authHeader.replace('Bearer ', '')
      
      const { data } = await supabaseClient.auth.getUser(token)
      
      const user = data.user
      if(!user){
        throw new Error('User not found')
      }

      const {data:_data, error} = await supabaseClient
                                    .from('users')
                                    .select('*')
                                    .eq('id', user.id)
                                    .single();
        if(error){
            throw new Error(error.message)
        }

        if(_data.stripe_customer){
            return _data.stripe_customer
        }

        const customer = await stripe.customers.create({
            email: user.email,
            metadata: {
                supabase_user_id: user.id
            }
        })
        await supabaseClient
        .from('users')
        .update({stripe_customer: customer.id})
        .eq('id', user.id);
    
        return customer.id;
}