import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { getTodasNoticias, deletarNoticia, Noticia } from '../data/noticiasDB';

type Nav = StackNavigationProp<RootStackParamList>;

const GerenciarNoticiasScreen = () => {
  const navigation = useNavigation<Nav>();
  const [noticias, setNoticias] = useState<Noticia[]>([]);

  // Atualiza a lista sempre que a tela recebe foco
  useFocusEffect(
  React.useCallback(() => {
    const carregar = async () => {
      const dados = await getTodasNoticias();
      setNoticias(dados);
    };
    carregar();
  }, [])
);

  const handleDelete = (id: string, titulo: string) => {
  Alert.alert('Excluir', `Apagar "${titulo}"?`, [
    { text: 'Cancelar' },
    {
      text: 'Excluir',
      style: 'destructive',
      onPress: async () => {
        await deletarNoticia(id);
        const dados = await getTodasNoticias();
        setNoticias(dados);
      }
    }
  ]);
};

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.voltar}>← Retornar</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Gerenciar Noticias</Text>
        <Text style={styles.subtitulo}>Total: {noticias.length} informes</Text>
      </View>

      <TouchableOpacity style={styles.botaoNovo} onPress={() => navigation.navigate('Autor')}>
        <Text style={styles.botaoNovoText}>+ Nova Noticia</Text>
      </TouchableOpacity>

      {noticias.map((n) => (
        <View key={n.id} style={styles.card}>
          <Text style={styles.cardTitulo}>{n.titulo}</Text>
          <Text style={styles.cardInfo}>{n.categoria} | {n.autorNome}</Text>
          <View style={styles.badgeContainer}>
            <Text style={[styles.badge, n.status === 'publicado' ? styles.publicado : styles.rascunho]}>
              {n.status.toUpperCase()}
            </Text>
          </View>
          <View style={styles.acoes}>
            <TouchableOpacity
              style={styles.btnEditar}
              onPress={() => navigation.navigate('EditarNoticia', { noticiaId: n.id })}
            >
              <Text style={styles.btnEditarText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnExcluir} onPress={() => handleDelete(n.id, n.titulo)}>
              <Text style={styles.btnExcluirText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A1A' },
  header: { padding: 20, paddingTop: 50, backgroundColor: '#2A2A2A', borderBottomWidth: 2, borderBottomColor: '#8B0000' },
  voltar: { color: '#B8860B', fontSize: 14, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 },
  titulo: { fontSize: 24, fontWeight: '900', color: '#F5F5DC', letterSpacing: 4 },
  subtitulo: { color: '#CD853F', fontSize: 12, marginTop: 5 },
  botaoNovo: { margin: 20, padding: 14, backgroundColor: '#8B0000', borderWidth: 1, borderColor: '#B8860B', alignItems: 'center' },
  botaoNovoText: { color: '#F5F5DC', fontSize: 16, fontWeight: 'bold', letterSpacing: 3 },
  card: { backgroundColor: '#2A2A2A', margin: 15, padding: 15, borderLeftWidth: 4, borderLeftColor: '#8B0000' },
  cardTitulo: { color: '#F5F5DC', fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  cardInfo: { color: '#CD853F', fontSize: 12, marginBottom: 8 },
  badgeContainer: { marginBottom: 10 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, alignSelf: 'flex-start', fontSize: 10, color: '#F5F5DC' },
  publicado: { borderColor: '#B8860B' },
  rascunho: { borderColor: '#8B7355' },
  acoes: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10, borderTopWidth: 1, borderTopColor: '#8B7355', paddingTop: 10 },
  btnEditar: { paddingHorizontal: 20, paddingVertical: 8, borderWidth: 1, borderColor: '#B8860B' },
  btnEditarText: { color: '#B8860B', fontSize: 12, letterSpacing: 2 },
  btnExcluir: { paddingHorizontal: 20, paddingVertical: 8, backgroundColor: '#8B0000' },
  btnExcluirText: { color: '#F5F5DC', fontSize: 12, letterSpacing: 2 },
});

export default GerenciarNoticiasScreen;