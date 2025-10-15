// import redis from "redis";

// const client = redis.createClient();

// // Adiciona um listener de erro para evitar que a aplicação quebre
// client.on('error', err => console.error('Redis Client Error', err));

// // Tenta conectar, mas não deixa a aplicação quebrar se falhar
// client.connect().catch(err => console.error('Failed to connect to Redis:', err));

// export async function getCache(chave) {
//   // Se não estiver conectado, simplesmente retorna um cache miss
//   if (!client.isOpen) return null;
//   const valor = await client.get(chave);
//   return valor ? JSON.parse(valor) : null;
// }

// export async function setCache(chave, valor, ttl = 300) {
//   // Se não estiver conectado, não faz nada
//   if (!client.isOpen) return;
//   await client.setEx(chave, ttl, JSON.stringify(valor));
// }