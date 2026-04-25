import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type DetalheNoticiaScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const DetalheNoticiaScreen = () => {
  const navigation = useNavigation<DetalheNoticiaScreenNavigationProp>();
  const route = useRoute();
  

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Confira esta notícia no Sputniks: SpaceX lança novo foguete reutilizável',
        title: 'Sputniks News',
      });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível compartilhar');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>TECNOLOGIA</Text>
        </View>
        
        <Text style={styles.title}>SpaceX lança novo foguete reutilizável em missão histórica</Text>
        
        <View style={styles.metadata}>
          <View style={styles.authorInfo}>
            <Text style={styles.authorName}>Por João Silva</Text>
            <Text style={styles.publishDate}>14 de Abril, 2026</Text>
          </View>
          <View style={styles.readTime}>
            <Text style={styles.readTimeText}>⏱️ 3 min de leitura</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.paragraph}>
          A SpaceX realizou hoje mais um lançamento bem-sucedido de seu foguete Falcon 9, 
          demonstrando mais uma vez a viabilidade da tecnologia de foguetes reutilizáveis. 
          O lançamento ocorreu às 10:30 (horário de Brasília) a partir do Centro Espacial 
          Kennedy, na Flórida.
        </Text>
        
        <Text style={styles.paragraph}>
          O primeiro estágio do foguete retornou com sucesso à Terra, pousando na plataforma 
          autônoma "Of Course I Still Love You" localizada no Oceano Atlântico. Este marca 
          o 15º voo deste booster específico, estabelecendo um novo recorde de reutilização.
        </Text>
        
        <Text style={styles.paragraph}>
          A missão, denominada Starlink 6-42, colocou em órbita 23 satélites de internet 
          da constelação Starlink, expandindo ainda mais a cobertura global do serviço 
          de internet via satélite da empresa.
        </Text>
        
        <Text style={styles.quote}>
          "Este lançamento demonstra o compromisso contínuo da SpaceX com a inovação e 
          a redução dos custos de acesso ao espaço através da reutilização", afirmou 
          um porta-voz da empresa durante a transmissão ao vivo.
        </Text>
        
        <Text style={styles.paragraph}>
          A empresa de Elon Musk continua liderando o mercado de lançamentos espaciais 
          comerciais, com mais de 100 missões bem-sucedidas apenas no último ano. A 
          próxima missão da SpaceX está programada para a próxima semana, quando outro 
          Falcon 9 levará astronautas para a Estação Espacial Internacional.
        </Text>

        <View style={styles.tagsContainer}>
          <TouchableOpacity style={styles.tag}>
            <Text style={styles.tagText}>#SpaceX</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tag}>
            <Text style={styles.tagText}>#Tecnologia</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tag}>
            <Text style={styles.tagText}>#Espaço</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.shareButtonText}>📤 Compartilhar Notícia</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#1C1C1E',
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  categoryBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 36,
    marginBottom: 15,
  },
  metadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  publishDate: {
    color: '#8E8E93',
    fontSize: 12,
    marginTop: 2,
  },
  readTime: {
    backgroundColor: '#2C2C2E',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  readTimeText: {
    color: '#8E8E93',
    fontSize: 12,
  },
  content: {
    padding: 20,
  },
  paragraph: {
    color: '#C6C6C8',
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 20,
  },
  quote: {
    color: '#FFFFFF',
    fontSize: 18,
    lineHeight: 28,
    fontStyle: 'italic',
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
    paddingLeft: 20,
    marginVertical: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    marginBottom: 30,
  },
  tag: {
    backgroundColor: '#2C2C2E',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  tagText: {
    color: '#007AFF',
    fontSize: 14,
  },
  shareButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default DetalheNoticiaScreen;