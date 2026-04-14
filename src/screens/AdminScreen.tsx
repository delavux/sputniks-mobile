import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type AdminScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Admin'>;

interface User {
  id: string;
  nome: string;
  email: string;
  role: string;
  status: 'ativo' | 'suspenso';
}

const AdminScreen = () => {
  const navigation = useNavigation<AdminScreenNavigationProp>();
  const [users, setUsers] = useState<User[]>([
    { id: '1', nome: 'Ivan Petrov', email: 'ivan.p@spootniks.org', role: 'Autor', status: 'ativo' },
    { id: '2', nome: 'Olga Romanova', email: 'olga.r@spootniks.org', role: 'Autor', status: 'ativo' },
    { id: '3', nome: 'Sergei Volkov', email: 'sergei.v@spootniks.org', role: 'Leitor', status: 'suspenso' },
    { id: '4', nome: 'Natalia Kuznetsova', email: 'natalia.k@spootniks.org', role: 'Leitor', status: 'ativo' },
    { id: '5', nome: 'Dmitri Sokolov', email: 'dmitri.s@spootniks.org', role: 'Autor', status: 'ativo' },
  ]);

  const stats = {
    totalInformes: 156,
    informesHoje: 12,
    totalAutores: 8,
    totalLeitores: 1234,
    acessosHoje: 342,
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId
          ? { ...user, status: user.status === 'ativo' ? 'suspenso' : 'ativo' }
          : user
      )
    );
    
    const user = users.find(u => u.id === userId);
    const novoStatus = user?.status === 'ativo' ? 'suspenso' : 'reativado';
    Alert.alert('Status Alterado', `Usuario ${user?.nome} foi ${novoStatus}`);
  };

  return (
    <ScrollView style={styles.container}>
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
          <Text style={styles.headerTitle}>Painel Central</Text>
        </View>
        <Text style={styles.headerSubtitle}>Administracao do Sistema</Text>
        <View style={styles.headerLine} />
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Indicadores Gerais</Text>
        <View style={styles.statsRow}>
          <View style={[styles.statCard, styles.statRed]}>
            <Text style={styles.statNumber}>{stats.totalInformes}</Text>
            <Text style={styles.statLabel}>Total de Informes</Text>
          </View>
          <View style={[styles.statCard, styles.statGold]}>
            <Text style={styles.statNumber}>{stats.informesHoje}</Text>
            <Text style={styles.statLabel}>Publicados Hoje</Text>
          </View>
        </View>
        <View style={styles.statsRow}>
          <View style={[styles.statCard, styles.statBrown]}>
            <Text style={styles.statNumber}>{stats.totalAutores}</Text>
            <Text style={styles.statLabel}>Autores Ativos</Text>
          </View>
          <View style={[styles.statCard, styles.statDark]}>
            <Text style={styles.statNumber}>{stats.totalLeitores}</Text>
            <Text style={styles.statLabel}>Leitores</Text>
          </View>
        </View>
        <View style={styles.statsRow}>
          <View style={[styles.statCard, styles.statBeige, styles.statFull]}>
            <Text style={styles.statNumber}>{stats.acessosHoje}</Text>
            <Text style={styles.statLabel}>Acessos Hoje</Text>
          </View>
        </View>
      </View>

      <View style={styles.usersSection}>
        <Text style={styles.sectionTitle}>Gerenciamento de Usuarios</Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, styles.colNome]}>Nome</Text>
          <Text style={[styles.tableHeaderText, styles.colRole]}>Funcao</Text>
          <Text style={[styles.tableHeaderText, styles.colStatus]}>Situacao</Text>
          <Text style={[styles.tableHeaderText, styles.colAcao]}>Acao</Text>
        </View>

        {users.map((user) => (
          <View key={user.id} style={styles.userRow}>
            <View style={styles.colNome}>
              <Text style={styles.userName}>{user.nome}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>
            <View style={styles.colRole}>
              <Text style={styles.userRole}>{user.role}</Text>
            </View>
            <View style={styles.colStatus}>
              <View
                style={[
                  styles.statusBadge,
                  user.status === 'ativo' ? styles.statusAtivo : styles.statusSuspenso,
                ]}
              >
                <Text style={styles.statusText}>
                  {user.status === 'ativo' ? 'ATIVO' : 'SUSPENSO'}
                </Text>
              </View>
            </View>
            <View style={styles.colAcao}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  user.status === 'ativo' ? styles.suspenderButton : styles.reativarButton,
                ]}
                onPress={() => handleToggleStatus(user.id)}
              >
                <Text style={styles.actionButtonText}>
                  {user.status === 'ativo' ? 'Suspender' : 'Reativar'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Operacoes Especiais</Text>
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.quickActionButton}>
            <Text style={styles.quickActionText}>Relatorios</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <Text style={styles.quickActionText}>Configuracoes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <Text style={styles.quickActionText}>Comunicado</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Sistema Central • Acesso Restrito</Text>
        <Text style={styles.footerText}>SPUTNIKS 1917-2026</Text>
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
  statsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F5F5DC',
    marginBottom: 15,
    letterSpacing: 3,
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#8B0000',
    paddingBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statCard: {
    flex: 1,
    padding: 18,
    marginHorizontal: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8B7355',
  },
  statFull: {
    marginHorizontal: 0,
  },
  statRed: {
    backgroundColor: '#8B0000',
  },
  statGold: {
    backgroundColor: '#B8860B',
  },
  statBrown: {
    backgroundColor: '#8B7355',
  },
  statDark: {
    backgroundColor: '#2A2A2A',
  },
  statBeige: {
    backgroundColor: '#CD853F',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F5F5DC',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#F5F5DC',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  usersSection: {
    padding: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#8B0000',
    marginBottom: 5,
  },
  tableHeaderText: {
    color: '#B8860B',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  colNome: {
    flex: 3,
  },
  colRole: {
    flex: 1.5,
  },
  colStatus: {
    flex: 1.5,
  },
  colAcao: {
    flex: 1.5,
  },
  userRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#8B7355',
    alignItems: 'center',
  },
  userName: {
    color: '#F5F5DC',
    fontSize: 14,
    fontWeight: '500',
  },
  userEmail: {
    color: '#CD853F',
    fontSize: 11,
    marginTop: 2,
  },
  userRole: {
    color: '#F5F5DC',
    fontSize: 13,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  statusAtivo: {
    backgroundColor: '#2A2A2A',
    borderColor: '#B8860B',
  },
  statusSuspenso: {
    backgroundColor: '#8B0000',
    borderColor: '#F5F5DC',
  },
  statusText: {
    color: '#F5F5DC',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
  },
  actionButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  suspenderButton: {
    backgroundColor: '#8B0000',
    borderColor: '#F5F5DC',
  },
  reativarButton: {
    backgroundColor: '#2A2A2A',
    borderColor: '#B8860B',
  },
  actionButtonText: {
    color: '#F5F5DC',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  quickActions: {
    padding: 20,
    paddingTop: 0,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickActionButton: {
    backgroundColor: '#2A2A2A',
    padding: 15,
    borderWidth: 1,
    borderColor: '#8B7355',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  quickActionText: {
    color: '#F5F5DC',
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#8B0000',
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

export default AdminScreen;