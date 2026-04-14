import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

interface Noticia {
  id: string;
  titulo: string;
  resumo: string;
  categoria: string;
  tempoLeitura: string;
}

const noticias: Noticia[] = [
  {
    id: '1',
    titulo: 'Industria Nacional Atinge Meta Historica',
    resumo: 'A producao industrial superou todas as expectativas neste trimestre, demonstrando a forca do trabalho coletivo...',
    categoria: 'ECONOMIA',
    tempoLeitura: '3 min'
  },
  {
    id: '2',
    titulo: 'Cientistas Desenvolvem Nova Tecnologia Agricola',
    resumo: 'Pesquisadores anunciam metodo revolucionario para aumentar a produtividade no campo...',
    categoria: 'CIENCIA',
    tempoLeitura: '4 min'
  },
  {
    id: '3',
    titulo: 'Campeonato Nacional Define Finalistas',
    resumo: 'As equipes mais disciplinadas avancam para a grande final apos partidas exemplares...',
    categoria: 'ESPORTE',
    tempoLeitura: '2 min'
  },
  {
    id: '4',
    titulo: 'Novo Programa Cultural Alcanca Milhoes',
    resumo: 'Iniciativa de educacao artistica beneficia trabalhadores em todas as regioes do pais...',
    categoria: 'CULTURA',
    tempoLeitura: '5 min'
  },
  {
    id: '5',
    titulo: 'Avancos na Construcao de Moradias Populares',
    resumo: 'Projeto habitacional entrega novas unidades e fortalece o direito a moradia digna...',
    categoria: 'SOCIEDADE',
    tempoLeitura: '3 min'
  }
];

const LeitorHomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Image 
            source={require('../../assets/images/logo.png')} 
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>SPUTNIKS</Text>
        </View>
        <Text style={styles.headerSubtitle}>Noticias do Povo • Para o Povo</Text>
        <View style={styles.headerLine} />
      </View>

      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['Todas', 'Economia', 'Ciencia', 'Esporte', 'Cultura', 'Sociedade'].map((cat) => (
            <TouchableOpacity key={cat} style={styles.categoryChip}>
              <Text style={styles.categoryText}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.content}>
        {noticias.map((noticia) => (
          <TouchableOpacity key={noticia.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.categoria}>{noticia.categoria}</Text>
              <Text style={styles.tempoLeitura}>{noticia.tempoLeitura}</Text>
            </View>
            <Text style={styles.titulo}>{noticia.titulo}</Text>
            <Text style={styles.resumo}>{noticia.resumo}</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.lerMais}>Ler informe completo →</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Edicao Especial • Abril 2026</Text>
        <Text style={styles.footerText}>Fundado em 1917</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  header: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#2A2A2A',
    borderBottomWidth: 2,
    borderBottomColor: '#8B0000',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerLogo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#F5F5DC',
    letterSpacing: 6,
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
  categoriesContainer: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#1A1A1A',
    borderBottomWidth: 1,
    borderBottomColor: '#8B7355',
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: '#8B7355',
    marginHorizontal: 5,
  },
  categoryText: {
    color: '#F5F5DC',
    fontSize: 13,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  content: {
    padding: 15,
  },
  card: {
    backgroundColor: '#2A2A2A',
    marginBottom: 15,
    padding: 18,
    borderWidth: 1,
    borderColor: '#8B7355',
    borderLeftWidth: 4,
    borderLeftColor: '#8B0000',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  categoria: {
    color: '#B8860B',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  tempoLeitura: {
    color: '#8B7355',
    fontSize: 11,
    fontStyle: 'italic',
  },
  titulo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F5F5DC',
    marginBottom: 8,
    lineHeight: 26,
    textTransform: 'uppercase',
  },
  resumo: {
    fontSize: 14,
    color: '#CD853F',
    lineHeight: 20,
    marginBottom: 12,
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: '#8B7355',
    paddingTop: 12,
  },
  lerMais: {
    color: '#B8860B',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#8B7355',
    marginTop: 10,
  },
  footerText: {
    color: '#8B7355',
    fontSize: 11,
    letterSpacing: 2,
    marginTop: 3,
    textTransform: 'uppercase',
  },
});

export default LeitorHomeScreen;