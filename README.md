# Peter's Pet

E-commerce de pet shop (trabalho de faculdade) feito com **Next.js 15 + React 19**, com o mascote chibi **Peter** desenhado em SVG.

## Como rodar

Precisa do [Node.js](https://nodejs.org) 18.18 ou mais novo.

```bash
npm install
npm run dev
```

Abra http://localhost:3000. Para a versão de produção: `npm run build` e depois `npm start`.

## O bloco de notas

Quando o cliente finaliza a compra, o navegador envia o carrinho para `/api/pedido`.
O servidor Node recalcula tudo e **acrescenta o pedido no arquivo `pedidos.txt`** (na pasta do projeto).
Os agendamentos de banho e tosa vão para `agendamentos.txt`.
Os dois arquivos são criados sozinhos no primeiro pedido.

> Isso só funciona rodando o projeto no seu computador (`npm run dev` ou `npm start`).
> Hospedagens "serverless" (como a Vercel) não deixam gravar arquivos.

## O que o site tem

- Vitrine com 25 produtos, busca (ignora acentos), filtros por pet, categoria, preço máximo e promoções, e ordenação
- Carrinho que fica salvo no navegador, com quantidade, cupom, frete por CEP e pagamento (Pix com 5% de desconto)
- Cupons para testar: `PETERS10` (10%), `BEMVINDO` (R$ 15 acima de R$ 80), `FRETEGRATIS`
- Frete grátis acima de R$ 199; o endereço é preenchido sozinho pelo CEP (ViaCEP, precisa de internet)
- Login e cadastro de demonstração (guardados só no navegador, com senha em hash SHA-256)
- Agendamento de banho e tosa com preço por porte
- Mascote Peter em 6 poses: feliz, piscando, dormindo, pulando, apaixonado e entregando a caixa
- Layout responsivo, foco visível no teclado e animações desligadas para quem prefere menos movimento

## Fotos reais dos produtos

Os produtos usam fotos reais de `public/produtos/<id>.jpg`, onde `<id>` é o `id` do produto em `lib/produtos.js`
(exemplo: `public/produtos/racao-caes-adultos.jpg`). Se o arquivo não existir, aparece a ilustração no estilo do mascote
(hoje é o caso do `shampoo-neutro`).

As fotos vêm do Wikimedia Commons, com licenças livres. A lista de créditos está em `public/produtos/CREDITOS.txt`.

## Segurança (bom para citar no trabalho)

- O servidor **nunca confia nos preços enviados pelo navegador**: ele busca o preço no catálogo e recalcula frete, cupom e total.
- Os textos digitados são limpos de quebras de linha antes de entrar nos `.txt`, para ninguém forjar linhas falsas no pedido.

## Estrutura

```
app/                  páginas, estilos e rotas da API (pedido, agendamento)
components/           Loja, Cart, ProductCard, Auth, Agendar, Mascot, ProductArt
lib/                  catálogo, regras de preço/frete/cupom, serviços
public/produtos/      coloque aqui as fotos dos produtos
public/peter-foto-referencia.jfif   foto que inspirou o mascote
```

## Ideias para evoluir

Banco de dados (SQLite ou Postgres) no lugar dos `.txt`, pagamento real (Mercado Pago ou Stripe), painel de administrador para ver os pedidos, e-mail de confirmação e avaliações escritas pelos clientes.
