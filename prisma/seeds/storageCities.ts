import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface City {
  id: number;
  nome: string;
  microrregiao: {
    id: number;
    nome: string;
    mesorregiao: {
      id: number;
      nome: string;
      UF: {
        id: number;
        sigla: string;
        nome: string;
        regiao: {
          id: number;
          sigla: string;
          nome: string;
        };
      };
    };
  };
}


async function getCitiesofBahia() {
  try {
    const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/BA/municipios');
    return response.data.map((city: City) => city.nome);
  } catch (error) {
    console.error('Erro ao obter dados das cidades:', error);
    return [];
  }
}

async function populateCities() {
  try {
    const cidades = await getCitiesofBahia();
    
    for (const nome of cidades) {
     const city = await prisma.city.createMany({
       data: {
         name: nome
       }
     })
    }

    console.log(`${cidades.length} cidades da Bahia foram inseridas/atualizadas no banco de dados.`);
  } catch (error) {
    console.error('Erro ao popular o banco de dados:', error);
  } finally {
    await prisma.$disconnect();
  }
}

populateCities();