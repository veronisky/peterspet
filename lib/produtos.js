// Catálogo da loja. Para usar foto real de um produto, salve a imagem em
// public/produtos/<id>.jpg (ex.: public/produtos/racao-caes-adultos.jpg).
// Se o arquivo não existir, a loja mostra a ilustração do produto automaticamente.

export const ANIMAIS = [
  { id: "todos", nome: "Todos" },
  { id: "cao", nome: "Cães" },
  { id: "gato", nome: "Gatos" },
  { id: "passaro", nome: "Pássaros" },
  { id: "peixe", nome: "Peixes" },
];

export const CATEGORIAS = [
  "Todas",
  "Ração",
  "Petiscos",
  "Brinquedos",
  "Camas e casinhas",
  "Passeio",
  "Higiene",
  "Aquário e gaiola",
];

export const PRODUTOS = [
  { id: "racao-caes-adultos", nome: "Ração Premium Cães Adultos 15 kg", animal: "cao", categoria: "Ração", preco: 189.9, precoAntigo: 219.9, art: "saco", cor: "#FF5C7A", rating: 4.8, avaliacoes: 312, selo: "Mais vendido", desc: "Frango e arroz, com ômega 3 e 6 para pelagem brilhante." },
  { id: "racao-filhotes", nome: "Ração Filhotes Raças Pequenas 3 kg", animal: "cao", categoria: "Ração", preco: 74.9, art: "saco", cor: "#FFB02E", rating: 4.7, avaliacoes: 184, desc: "Grãos pequenos e DHA para o desenvolvimento do filhote." },
  { id: "racao-gatos-castrados", nome: "Ração Gatos Castrados Salmão 10 kg", animal: "gato", categoria: "Ração", preco: 159.9, precoAntigo: 179.9, art: "saco", cor: "#2FC6A2", rating: 4.9, avaliacoes: 421, selo: "Promoção", desc: "Controle de peso e cuidado com o trato urinário." },
  { id: "racao-gatinhos", nome: "Ração Gatinhos Frango 1 kg", animal: "gato", categoria: "Ração", preco: 36.9, art: "saco", cor: "#7FD6FF", rating: 4.6, avaliacoes: 97, desc: "Receita macia e nutritiva para os primeiros meses." },
  { id: "sache-gatos", nome: "Sachê Gatos Atum ao Molho (caixa com 12)", animal: "gato", categoria: "Petiscos", preco: 42.0, art: "lata", cor: "#7FD6FF", rating: 4.8, avaliacoes: 260, desc: "Alimento úmido que os gatos adoram. Rende 12 refeições." },
  { id: "osso-natural", nome: "Osso Natural Mastigável Médio", animal: "cao", categoria: "Petiscos", preco: 19.9, art: "osso", cor: "#FFB02E", rating: 4.5, avaliacoes: 143, desc: "Ajuda a limpar os dentes e gasta a energia do mastigador." },
  { id: "bifinho-cao", nome: "Bifinho Sabor Carne 500 g", animal: "cao", categoria: "Petiscos", preco: 27.9, precoAntigo: 32.9, art: "osso", cor: "#FF5C7A", rating: 4.7, avaliacoes: 205, selo: "Promoção", desc: "Perfeito para premiar o treino e os bons comportamentos." },
  { id: "petisco-gato-creme", nome: "Petisco Cremoso Gatos (4 unidades)", animal: "gato", categoria: "Petiscos", preco: 12.9, art: "lata", cor: "#FF5C7A", rating: 4.9, avaliacoes: 530, selo: "Mais vendido", desc: "Bisnaga cremosa que vira festa na hora do mimo." },
  { id: "bola-borracha", nome: "Bola de Borracha Resistente", animal: "cao", categoria: "Brinquedos", preco: 24.9, art: "bola", cor: "#FFD54A", rating: 4.6, avaliacoes: 118, desc: "Quica alto e aguenta mordidas fortes." },
  { id: "cordas-cao", nome: "Corda Trançada com Nó", animal: "cao", categoria: "Brinquedos", preco: 21.9, art: "corda", cor: "#2FC6A2", rating: 4.4, avaliacoes: 76, desc: "Ideal para cabo de guerra e para limpar os dentes." },
  { id: "ratinho-gato", nome: "Ratinho de Pelúcia com Catnip", animal: "gato", categoria: "Brinquedos", preco: 14.9, art: "rato", cor: "#B7A3FF", rating: 4.8, avaliacoes: 340, desc: "Erva de gato dentro e guizo na cauda." },
  { id: "varinha-pena", nome: "Varinha com Penas Interativa", animal: "gato", categoria: "Brinquedos", preco: 18.9, precoAntigo: 22.9, art: "varinha", cor: "#FF5C7A", rating: 4.7, avaliacoes: 199, selo: "Promoção", desc: "Estimula o instinto caçador e queima energia." },
  { id: "cama-redonda", nome: "Caminha Redonda Soft M", animal: "gato", categoria: "Camas e casinhas", preco: 119.9, art: "cama", cor: "#B7A3FF", rating: 4.9, avaliacoes: 288, selo: "Novo", desc: "Tecido macio, borda alta e base antiderrapante." },
  { id: "cama-ortopedica", nome: "Cama Ortopédica Cães G", animal: "cao", categoria: "Camas e casinhas", preco: 249.9, precoAntigo: 299.9, art: "cama", cor: "#7FD6FF", rating: 4.8, avaliacoes: 154, selo: "Promoção", desc: "Espuma de alta densidade que protege as articulações." },
  { id: "casinha-plastica", nome: "Casinha Plástica Desmontável", animal: "cao", categoria: "Camas e casinhas", preco: 169.9, art: "casinha", cor: "#FFB02E", rating: 4.5, avaliacoes: 62, desc: "Fácil de limpar, ventilada e resistente ao sol." },
  { id: "coleira-nylon", nome: "Coleira de Nylon Reforçada", animal: "cao", categoria: "Passeio", preco: 34.9, art: "coleira", cor: "#FF5C7A", rating: 4.6, avaliacoes: 211, desc: "Regulável, com fecho de segurança e anel em aço." },
  { id: "peitoral-anti", nome: "Peitoral Anti-puxão Acolchoado", animal: "cao", categoria: "Passeio", preco: 79.9, art: "coleira", cor: "#2FC6A2", rating: 4.8, avaliacoes: 173, selo: "Novo", desc: "Passeios mais tranquilos e sem machucar o pescoço." },
  { id: "guia-retratil", nome: "Guia Retrátil 5 m", animal: "cao", categoria: "Passeio", preco: 64.9, art: "guia", cor: "#7FD6FF", rating: 4.5, avaliacoes: 94, desc: "Trava de segurança e cabo emborrachado." },
  { id: "shampoo-neutro", nome: "Shampoo Neutro Pelos Claros 500 ml", animal: "cao", categoria: "Higiene", preco: 29.9, art: "frasco", cor: "#7FD6FF", rating: 4.7, avaliacoes: 166, desc: "Fórmula suave que respeita a pele do seu pet." },
  { id: "areia-sanitaria", nome: "Areia Sanitária Gatos 4 kg", animal: "gato", categoria: "Higiene", preco: 22.9, art: "saco", cor: "#B7A3FF", rating: 4.6, avaliacoes: 402, desc: "Alta absorção e controle de odores por mais tempo." },
  { id: "escova-removedora", nome: "Escova Removedora de Pelos", animal: "gato", categoria: "Higiene", preco: 39.9, precoAntigo: 49.9, art: "frasco", cor: "#FFB02E", rating: 4.8, avaliacoes: 238, selo: "Promoção", desc: "Cerdas macias que massageiam e soltam o pelo morto." },
  { id: "aquario-kit", nome: "Aquário Kit Completo 30 L", animal: "peixe", categoria: "Aquário e gaiola", preco: 299.9, art: "aquario", cor: "#7FD6FF", rating: 4.7, avaliacoes: 88, selo: "Novo", desc: "Vidro, filtro, LED e termômetro. Pronto para montar." },
  { id: "racao-peixes", nome: "Ração Flocos para Peixes Tropicais 50 g", animal: "peixe", categoria: "Ração", preco: 16.9, art: "lata", cor: "#2FC6A2", rating: 4.5, avaliacoes: 57, desc: "Flocos que flutuam e realçam as cores dos peixes." },
  { id: "gaiola-passaros", nome: "Gaiola Viagem Pássaros Pequenos", animal: "passaro", categoria: "Aquário e gaiola", preco: 89.9, art: "gaiola", cor: "#FFD54A", rating: 4.4, avaliacoes: 41, desc: "Leve, com poleiros e comedouros removíveis." },
  { id: "mistura-sementes", nome: "Mistura de Sementes para Calopsitas 500 g", animal: "passaro", categoria: "Ração", preco: 18.9, art: "saco", cor: "#FFD54A", rating: 4.6, avaliacoes: 72, desc: "Sementes selecionadas e limpas, com sais minerais." },
];

export function achar(id) {
  return PRODUTOS.find((p) => p.id === id);
}
