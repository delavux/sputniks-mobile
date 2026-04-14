import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = (role: 'Leitor' | 'Autor' | 'Super Admin') => {
    if (role === 'Leitor') {
      navigation.navigate('Leitor');
    } else if (role === 'Autor') {
      navigation.navigate('Autor');
    } else {
      navigation.navigate('Admin');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoArea}>
       source={require('../../assets/images/logo.png')} 
        <Image 
          source={require('../../assets/images/logo.png')} 
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>SPUTNIKS</Text>
        <Text style={styles.tagline}>A verdade acima de tudo</Text>
      </View>

      <Text style={styles.instruction}>Selecione o perfil de acesso:</Text>

      <TouchableOpacity style={[styles.button, styles.leitor]} onPress={() => handleLogin('Leitor')}>
        <Text style={styles.buttonText}>Entrar como Leitor</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.autor]} onPress={() => handleLogin('Autor')}>
        <Text style={styles.buttonText}>Entrar como Autor</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.admin]} onPress={() => handleLogin('Super Admin')}>
        <Text style={styles.buttonText}>Entrar como Super Admin</Text>
      </TouchableOpacity>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Servico Informativo do Povo</Text>
        <Text style={styles.footerText}>Desde 1917</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 20,
  },
  logoArea: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoImage: {
    width: 120,
    height: 120,
    marginBottom: 15,
  },
  logoText: {
    fontSize: 42,
    fontWeight: '900',
    color: '#F5F5DC',
    letterSpacing: 8,
    textTransform: 'uppercase',
  },
  tagline: {
    color: '#CD853F',
    fontSize: 14,
    marginTop: 8,
    fontStyle: 'italic',
    letterSpacing: 2,
  },
  instruction: {
    color: '#F5F5DC',
    fontSize: 16,
    marginBottom: 25,
    letterSpacing: 1,
  },
  button: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 4,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8B7355',
  },
  leitor: {
    backgroundColor: '#8B0000',
  },
  autor: {
    backgroundColor: '#2A2A2A',
    borderColor: '#B8860B',
  },
  admin: {
    backgroundColor: '#1A1A1A',
    borderColor: '#CD853F',
    borderWidth: 2,
  },
  buttonText: {
    color: '#F5F5DC',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  footer: {
    marginTop: 50,
    alignItems: 'center',
  },
  footerText: {
    color: '#8B7355',
    fontSize: 12,
    letterSpacing: 2,
    marginTop: 5,
  },
});

export default LoginScreen;