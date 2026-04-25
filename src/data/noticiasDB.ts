import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Noticia {
  id: string;
  titulo: string;
  resumo: string;
  categoria: string;
  conteudo: string;
  autorNome: string;
  dataPublicacao: string;
  status: 'publicado' | 'rascunho';
  tempoLeitura: string;
}

const CHAVE = '@sputniks_noticias';

// Dados iniciais (só usa na primeira vez)
const dadosIniciais: Noticia[] = [
  {
    id: '1',
    titulo: 'Industria Nacional Atinge Meta Historica',
    resumo: 'A producao industrial superou todas as expectativas...',
    categoria: 'Economia',
    conteudo: 'A producao industrial brasileira atingiu numeros recordes...',
    autorNome: 'Ivan Petrov',
    dataPublicacao: '14/04/2026',
    status: 'publicado',
    tempoLeitura: '3 min'
  }
];

// Gerar ID único
export const gerarId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// CREATE - Adicionar
export const adicionarNoticia = async (noticia: Noticia): Promise<void> => {
  const dados = await getTodasNoticias();
  dados.unshift(noticia);
  await AsyncStorage.setItem(CHAVE, JSON.stringify(dados));
};

// READ - Todas
export const getTodasNoticias = async (): Promise<Noticia[]> => {
  const json = await AsyncStorage.getItem(CHAVE);
  if (json) return JSON.parse(json);
  // Primeira vez: salva dados iniciais
  await AsyncStorage.setItem(CHAVE, JSON.stringify(dadosIniciais));
  return dadosIniciais;
};

// READ - Publicadas
export const getNoticiasPublicadas = async (): Promise<Noticia[]> => {
  const todas = await getTodasNoticias();
  return todas.filter(n => n.status === 'publicado');
};

// UPDATE
export const atualizarNoticia = async (id: string, dados: Partial<Noticia>): Promise<boolean> => {
  const todas = await getTodasNoticias();
  const index = todas.findIndex(n => n.id === id);
  if (index !== -1) {
    todas[index] = { ...todas[index], ...dados };
    await AsyncStorage.setItem(CHAVE, JSON.stringify(todas));
    return true;
  }
  return false;
};

// DELETE
export const deletarNoticia = async (id: string): Promise<boolean> => {
  const todas = await getTodasNoticias();
  const filtradas = todas.filter(n => n.id !== id);
  if (filtradas.length < todas.length) {
    await AsyncStorage.setItem(CHAVE, JSON.stringify(filtradas));
    return true;
  }
  return false;
};