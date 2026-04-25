import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { getTodasNoticias, atualizarNoticia } from '../data/noticiasDB';

type Nav = StackNavigationProp<RootStackParamList>;

const EditarNoticiaScreen = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<any>();
  const { noticiaId } = route.params;

  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [conteudo, setConteudo] = useState('');

  useEffect(() => {
    const carregar = async () => {
      const todas = await getTodasNoticias();
      const n = todas.find(not => not.id === noticiaId);
      if (n) {
        setTitulo(n.titulo);
        setResumo(n.resumo);
        setCategoria(n.categoria);
        setConteudo(n.conteudo);
      }
    };
    carregar();
  }, [noticiaId]);

  const salvar = async () => {
    if (!titulo || !resumo || !categoria || !conteudo) {
      Alert.alert('Atencao', 'Preencha todos os campos!');
      return;
    }
    await atualizarNoticia(noticiaId, { titulo, resumo, categoria, conteudo });
    Alert.alert('Sucesso', 'Noticia atualizada!', [{ text: 'OK', onPress: () => navigation.goBack() }]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.voltar}>← Retornar</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Editar Noticia</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Titulo</Text>
        <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} />
        <Text style={styles.label}>Resumo</Text>
        <TextInput style={[styles.input, { minHeight: 60 }]} value={resumo} onChangeText={setResumo} multiline />
        <Text style={styles.label}>Categoria</Text>
        <ScrollView horizontal>
          {['Economia', 'Ciencia', 'Esporte', 'Cultura', 'Sociedade'].map(cat => (
            <TouchableOpacity
              key={cat}
              style={[styles.chip, categoria === cat && styles.chipAtivo]}
              onPress={() => setCategoria(cat)}
            >
              <Text style={[styles.chipText, categoria === cat && styles.chipTextAtivo]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text style={styles.label}>Conteudo</Text>
        <TextInput style={[styles.input, { minHeight: 150 }]} value={conteudo} onChangeText={setConteudo} multiline textAlignVertical="top" />
        <TouchableOpacity style={styles.botaoSalvar} onPress={salvar}>
          <Text style={styles.botaoSalvarText}>Salvar Alteracoes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A1A' },
  header: { padding: 20, paddingTop: 50, backgroundColor: '#2A2A2A', borderBottomWidth: 2, borderBottomColor: '#8B0000' },
  voltar: { color: '#B8860B', fontSize: 14, letterSpacing: 2, marginBottom: 10 },
  titulo: { fontSize: 24, fontWeight: '900', color: '#F5F5DC', letterSpacing: 4 },
  form: { padding: 20 },
  label: { color: '#F5F5DC', fontSize: 14, fontWeight: '600', letterSpacing: 2, marginTop: 15, marginBottom: 5 },
  input: { backgroundColor: '#1A1A1A', borderWidth: 1, borderColor: '#8B7355', padding: 12, color: '#F5F5DC' },
  chip: { paddingHorizontal: 16, paddingVertical: 8, borderWidth: 1, borderColor: '#8B7355', marginRight: 10, marginVertical: 8 },
  chipAtivo: { backgroundColor: '#8B0000', borderColor: '#B8860B' },
  chipText: { color: '#8B7355', fontSize: 12 },
  chipTextAtivo: { color: '#F5F5DC', fontWeight: '600' },
  botaoSalvar: { backgroundColor: '#8B0000', padding: 16, marginTop: 30, alignItems: 'center', borderWidth: 1, borderColor: '#B8860B' },
  botaoSalvarText: { color: '#F5F5DC', fontSize: 16, fontWeight: 'bold', letterSpacing: 3 },
});

export default EditarNoticiaScreen;