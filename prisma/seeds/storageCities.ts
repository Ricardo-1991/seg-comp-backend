import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getCitiesofBahia() {
  try {
    const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/BA/municipios');
    return response.data.map((city: any) => city.nome);
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