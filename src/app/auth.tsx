import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { supabase } from '../lib/supabase';
import { Toast } from 'react-native-toast-notifications';
import { useRouter } from 'expo-router';

const authSchema = zod.object({
  email: zod.string().email({message: 'Invalid email address'}),
  password:zod.string().min(6, {message: "Password must be 6 character long"})
})

const Auth = () => {
  const router = useRouter()

  const {control, handleSubmit, formState} = useForm({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const signin = async (data: zod.infer<typeof authSchema>)=>{

    const {error} = await supabase.auth.signInWithPassword(data);
    if(error){
      alert(error.message)
    }else{

      Toast.show('Signed in success', {
        type: 'success',
        placement: 'top',
        duration: 1500
      })

      router.push('/')

    }

  }

  const signup =async (data: zod.infer<typeof authSchema>)=>{
    const {error} = await supabase.auth.signUp(data);
    if(error){
      alert(error.message)
    }else{
      console.log('Signup')
      Toast.show('Signed up success', {
        type: 'success',
        placement: 'top',
        duration: 1500
      })
      router.push('/')
    }
  }

  return (
    <ImageBackground source={{uri: 'https://images.pexels.com/photos/682933/pexels-photo-682933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}} style={styles.backgroundImage}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>Please authenticate to continue</Text>
          <Controller
         control={control}
          name='email'
           render={({
            field: {value, onChange, onBlur},
            fieldState: {error}
          })=>{
           return <>
              <TextInput 
              placeholder='Email'
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholderTextColor='#aaa'
              autoCapitalize='none'
              editable={!formState.isSubmitting}
              />
              {error && <Text style={styles.error}>{error.message}</Text>}
            </>
           }}/>
           <Controller
         control={control}
          name='password'
           render={({
            field: {value, onChange, onBlur},
            fieldState: {error}
          })=>{
           return <>
              <TextInput 
              placeholder='******'
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholderTextColor='#aaa'
              autoCapitalize='none'
              secureTextEntry
              editable={!formState.isSubmitting}
              />
              {error && <Text style={styles.error}>{error.message}</Text>}
            </>
           }}/>
           <TouchableOpacity style={styles.button} disabled={formState.isSubmitting}  onPress={handleSubmit(signin)}>
            <Text style={styles.buttonText}>Sign in</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={handleSubmit(signup)} disabled={formState.isSubmitting} style={[styles.button, styles.signUpButton]}>
            <Text style={styles.signupButtonText}>Sign up</Text>
           </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  )
}

export default Auth

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width: '100%'
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 18,
    color: '#ddd',
    marginBottom: 32
  },
  input: {
    width: '90%',
    padding: 12,
    marginBottom: 16,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 8,
    fontSize: 16,
    color: '#000'
  },
  button:{
    backgroundColor: '#6a1b9a',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: '90%',
    alignItems: 'center'
  },
  signUpButton:{
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
  },
  signupButtonText:{
    color: '#fff'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#fff"
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 16,
    textAlign: 'left',
    width: '90%'
  }

})