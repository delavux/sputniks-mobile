import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { adicionarNoticia, gerarId, Noticia } from '../data/noticiasDB';

type AutorScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Autor'>;

const AutorScreen = () => {
  const navigation = useNavigation<AutorScreenNavigationProp>();
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [resumo, setResumo] = useState('');

  const categorias = ['Economia', 'Ciencia', 'Esporte', 'Cultura', 'Sociedade', 'Politica'];

  const handlePublicar = async () => {
  if (!titulo || !categoria || !conteudo || !resumo) {
    Alert.alert('Atencao', 'Todos os campos sao obrigatorios!');
    return;
  }

  const novaNoticia: Noticia = {
    id: gerarId(),
    titulo,
    resumo,
    categoria,
    conteudo,
    autorNome: 'Redator Oficial',
    dataPublicacao: new Date().toLocaleDateString('pt-BR'),
    status: 'publicado',
    tempoLeitura: `${Math.ceil(conteudo.split(' ').length / 200)} min`
  };

  await adicionarNoticia(novaNoticia);

  Alert.alert('Publicado!', 'Noticia salva com sucesso.', [
    {
      text: 'OK',
      onPress: () => {
        setTitulo('');
        setCategoria('');
        setConteudo('');
        setResumo('');
      }
    }
  ]);
};

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Retornar</Text>
          </TouchableOpacity>
          
          <View style={styles.headerTitleContainer}>
            <Image 
              source={require('../../assets/images/logo.png')} 
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <Text style={styles.headerTitle}>Painel do Autor</Text>
          </View>
          <Text style={styles.headerSubtitle}>Registro de Informes Oficiais</Text>
          <View style={styles.headerLine} />
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Titulo do Informe</Text>
          <TextInput
            style={styles.input}
            placeholder="EX: INDUSTRIA NACIONAL ATINGE NOVA META"
            placeholderTextColor="#8B7355"
            value={titulo}
            onChangeText={setTitulo}
            maxLength={100}
            autoCapitalize="characters"
          />

          <Text style={styles.label}>Resumo Executivo</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Breve resumo do conteudo..."
            placeholderTextColor="#8B7355"
            value={resumo}
            onChangeText={setResumo}
            multiline
            numberOfLines={3}
            maxLength={200}
          />

          <Text style={styles.label}>Classificacao</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
            {categorias.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryChip, categoria === cat && styles.categoryChipSelected]}
                onPress={() => setCategoria(cat)}
              >
                <Text
                  style={[styles.categoryText, categoria === cat && styles.categoryTextSelected]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.label}>Conteudo Completo</Text>
          <TextInput
            style={[styles.input, styles.textArea, styles.contentInput]}
            placeholder="Redija o conteudo completo do informe..."
            placeholderTextColor="#8B7355"
            value={conteudo}
            onChangeText={setConteudo}
            multiline
            numberOfLines={10}
            textAlignVertical="top"
          />

          <TouchableOpacity style={styles.publishButton} onPress={handlePublicar}>
            <Text style={styles.publishButtonText}>Publicar Informe</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.draftButton} onPress={() => navigation.goBack()}>
            <Text style={styles.draftButtonText}>Salvar Rascunho</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#2A2A2A',
    borderBottomWidth: 2,
    borderBottomColor: '#8B0000',
  },
  backButton: {
    marginBottom: 15,
  },
  backButtonText: {
    color: '#B8860B',
    fontSize: 14,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  headerLogo: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#F5F5DC',
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#CD853F',
    letterSpacing: 2,
    fontStyle: 'italic',
  },
  headerLine: {
    height: 1,
    backgroundColor: '#8B7355',
    marginTop: 15,
  },
  form: {
    padding: 20,
  },
  label: {
    color: '#F5F5DC',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#8B7355',
    padding: 12,
    color: '#F5F5DC',
    fontSize: 14,
  },
  textArea: {
    minHeight: 80,
  },
  contentInput: {
    minHeight: 200,
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#8B7355',
    marginRight: 10,
  },
  categoryChipSelected: {
    backgroundColor: '#8B0000',
    borderColor: '#B8860B',
  },
  categoryText: {
    color: '#8B7355',
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  categoryTextSelected: {
    color: '#F5F5DC',
    fontWeight: '600',
  },
  publishButton: {
    backgroundColor: '#8B0000',
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#B8860B',
    marginTop: 30,
    alignItems: 'center',
  },
  publishButtonText: {
    color: '#F5F5DC',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  draftButton: {
    paddingVertical: 16,
    marginTop: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8B7355',
  },
  draftButtonText: {
    color: '#CD853F',
    fontSize: 14,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});

export default AutorScreen;