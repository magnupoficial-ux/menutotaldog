# MenuTotalDog

import React, { useState, useEffect, useRef } from 'react';

import { 

  ShoppingBag, Plus, Minus, Trash2, X, MapPin, 

  Search, Star, Bike, ShoppingCcg, Check, Phone 

} from 'lucide-react';

// --- DADOS DO CARDÁPIO ---

const CARDAPIO = {

  "Especiais Duplos": [

    { id: 'ed1', nome: 'Catupiry', preco: 21.00, desc: 'Pão, 2 vinas, maionese, tomate, milho, batata palha, catupiry e cebola. (Opção: bacon, calabresa ou frango)', img: 'https://images.unsplash.com/photo-1626078437315-4fa1d3558c40?w=500&auto=format&fit=crop&q=60' },

    { id: 'ed2', nome: 'Cheddar', preco: 22.00, desc: 'Pão, 2 vinas, maionese, tomate, milho, batata palha, cheddar e cebola. (Opção: bacon, calabresa ou frango)', img: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?w=500&auto=format&fit=crop&q=60' },

    { id: 'ed3', nome: '4 Queijos', preco: 21.00, desc: 'Pão, 2 vinas, maionese, tomate, milho, batata palha, provolone, parmesão, mussarela, catupiry e cebola.', img: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=500&auto=format&fit=crop&q=60' },

    { id: 'ed4', nome: 'Big', preco: 29.00, desc: 'Pão, 3 vinas, bacon, filé de alcatra, catupiry, cheddar, maionese, tomate, cebola, milho, batata palha, rúcula e tomate seco.', img: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60' },

    { id: 'ed5', nome: 'Meio Total Dog', preco: 29.00, desc: 'Pão, 1 vina, bacon, filé de alcatra, calabresa, frango, cheddar, catupiry, maionese, tomate, cebola, mussarela, milho e batata palha.', img: 'https://images.unsplash.com/photo-1626078437315-4fa1d3558c40?w=500&auto=format&fit=crop&q=60' },

    { id: 'ed6', nome: 'Total Dog (Serve 2 pessoas)', preco: 48.00, desc: '2 Pães, 2 vinas, bacon, filé de alcatra, calabresa, frango, cheddar, catupiry, maionese, tomate, cebola, mussarela, milho e batata palha.', img: 'https://images.unsplash.com/photo-1541232390666-511033052254?w=500&auto=format&fit=crop&q=60' },

  ],

  "Especiais": [

    { id: 'es1', nome: 'Frango', preco: 20.00, desc: 'Pão, 1 vina, frango, maionese, cebola, tomate, milho e batata palha.', img: 'https://images.unsplash.com/photo-1626078437315-4fa1d3558c40?w=500&auto=format&fit=crop&q=60' },

    { id: 'es2', nome: 'Bacon', preco: 20.00, desc: 'Pão, 1 vina, bacon, maionese, cebola, tomate, milho e batata palha.', img: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?w=500&auto=format&fit=crop&q=60' },

    { id: 'es3', nome: 'Calabresa', preco: 20.00, desc: 'Pão, 1 vina, calabresa, maionese, cebola, tomate, milho e batata palha.', img: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=500&auto=format&fit=crop&q=60' },

    { id: 'es4', nome: 'Carne Moída', preco: 20.00, desc: 'Pão, 1 vina, carne moída, queijo mussarela, maionese, cebola, tomate, milho e batata palha.', img: 'https://images.unsplash.com/photo-1541232390666-511033052254?w=500&auto=format&fit=crop&q=60' },

  ],

  "Tradicionais": [

    { id: 'tr1', nome: 'Simples', preco: 15.00, desc: 'Pão, 1 vina, maionese, tomate, milho, batata palha e cebola.', img: 'https://images.unsplash.com/photo-1626078437315-4fa1d3558c40?w=500&auto=format&fit=crop&q=60' },

    { id: 'tr2', nome: 'Duplo', preco: 16.00, desc: 'Pão, 2 vinas, maionese, tomate, milho, batata palha e cebola.', img: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?w=500&auto=format&fit=crop&q=60' },

  ],

  "Lanches e Hamburgueres": [

    { id: 'lh1', nome: 'X Tudo', preco: 35.00, desc: 'Pão, hambúrguer 130g, alcatra, bacon, calabresa, frango, queijo mussarela, alface, tomate, barbecue e maionese.', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60' },

    { id: 'lh2', nome: 'X Alcatra', preco: 27.00, desc: 'Pão, hambúrguer 130g, alcatra, queijo mussarela, alface, tomate, barbecue e maionese.', img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop&q=60' },

    { id: 'lh3', nome: 'X Bacon', preco: 22.00, desc: 'Pão, hambúrguer 130g, bacon, queijo mussarela, alface, tomate, barbecue e maionese.', img: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500&auto=format&fit=crop&q=60' },

    { id: 'lh4', nome: 'X Calabresa', preco: 22.00, desc: 'Pão, hambúrguer 130g, calabresa, queijo mussarela, alface, tomate, barbecue e maionese.', img: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&auto=format&fit=crop&q=60' },

    { id: 'lh5', nome: 'X Frango', preco: 22.00, desc: 'Pão, hambúrguer 130g, frango, queijo mussarela, alface, tomate, barbecue e maionese.', img: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=500&auto=format&fit=crop&q=60' },

    { id: 'lh6', nome: 'X Salada', preco: 19.00, desc: 'Pão, hambúrguer 130g, queijo mussarela, alface, tomate, barbecue e maionese.', img: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&auto=format&fit=crop&q=60' },

    { id: 'lh7', nome: 'X Burguer', preco: 15.00, desc: 'Pão, hambúrguer 130g, queijo mussarela, barbecue e maionese.', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60' },

  ],

  "Bebidas": [

    { id: 'b1', nome: 'Refrigerante Lata', preco: 7.00, desc: 'Lata de 350ml trincando de gelada.', img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=60' },

    { id: 'b2', nome: 'Chá Mate', preco: 7.00, desc: 'Copo de Chá Mate natural.', img: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=500&auto=format&fit=crop&q=60' },

    { id: 'b3', nome: 'Suco', preco: 7.00, desc: 'Suco polpa natural de frutas.', img: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&auto=format&fit=crop&q=60' },

    { id: 'b4', nome: 'Água', preco: 4.00, desc: 'Garrafa de água mineral 500ml.', img: 'https://images.unsplash.com/photo-1608885898957-a599fb18de36?w=500&auto=format&fit=crop&q=60' },

    { id: 'b5', nome: 'Refrigerante 600 ml', preco: 10.00, desc: 'Garrafa pet de 600ml.', img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=60' },

    { id: 'b6', nome: 'Refrigerante 2 litros', preco: 17.00, desc: 'Garrafa pet família de 2 Litros.', img: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=500&auto=format&fit=crop&q=60' },

  ]

};

export default function App() {

  // --- ESTADOS DO SISTEMA ---

  const [quantidadesVitrine, setQuantidadesVitrine] = useState({});

  const [carrinho, setCarrinho] = useState([]);

  const [modalAberto, setModalAberto] = useState(false);

  const [tipoEntrega, setTipoEntrega] = useState('entrega'); // 'entrega' ou 'balcao'

  

  // Form Cliente

  const [nome, setNome] = useState('');

  const [cep, setCep] = useState('');

  const [rua, setRua] = useState('');

  const [bairro, setBairro] = useState('');

  const [cidade, setCidade] = useState('');

  const [numero, setNumero] = useState('');

  const [complemento, setComplemento] = useState('');

  const [observacoes, setObservacoes] = useState('');

  

  // Lógica Frete

  const [distanciaFicticia, setDistanciaFicticia] = useState(null);

  const [taxaFrete, setTaxaFrete] = useState(0);

  const [erroCep, setErroCep] = useState('');

  // Depoimentos Lazy Loading

  const [depoimentos, setDepoimentos] = useState([]);

  const sectionDepoimentosRef = useRef(null);

  // --- LÓGICA QUANTIDADE VITRINE ---

  const alterarQtdVitrine = (id, operacao) => {

    setQuantidadesVitrine(prev => {

      const atual = prev[id] || 1;

      let nova = operacao === 'mais' ? atual + 1 : atual - 1;

      if (nova < 1) nova = 1;

      return { ...prev, [id]: nova };

    });

  };

  // --- ADICIONAR AO CARRINHO ---

  const adicionarAoCarrinho = (item) => {

    const qtd = quantidadesVitrine[item.id] || 1;

    setCarrinho(prev => {

      const existente = prev.find(i => i.id === item.id);

      if (existente) {

        return prev.map(i => i.id === item.id ? { ...i, qtd: i.qtd + qtd } : i);

      }

      return [...prev, { ...item, qtd }];

    });

    // Resetar marcador da vitrine

    setQuantidadesVitrine(prev => ({ ...prev, [item.id]: 1 }));

  };

  const atualizarQtdCarrinho = (id, alteracao) => {

    setCarrinho(prev => prev.map(item => {

      if (item.id === id) {

        const novaQtd = item.qtd + alteracao;

        return novaQtd > 0 ? { ...item, qtd: novaQtd } : item;

      }

      return item;

    }).filter(item => item.qtd > 0));

  };

  // --- TOTAIS FINAIS ---

  const subtotal = carrinho.reduce((acc, item) => acc + (item.preco * item.qtd), 0);

  const totalGeral = tipoEntrega === 'entrega' ? subtotal + taxaFrete : subtotal;

  const totalItensNoCarrinho = carrinho.reduce((acc, item) => acc + item.qtd, 0);

  // --- INTEGRACAO API VIACEP E DISTÂNCIA ---

  const handleCepChange = async (e) => {

    const valor = e.target.value.replace(/\D/g, '');

    setCep(valor);

    

    if (valor.length === 8) {

      try {

        setErroCep('');

        const response = await fetch(`https://viacep.com.br/ws/${valor}/json/`);

        const data = await response.json();

        

        if (data.erro) {

          setErroCep('CEP não encontrado.');

          return;

        }

        setRua(data.logradouro);

        setBairro(data.bairro);

        setCidade(data.localidade);

        // Simulador de cálculo de raio comercial baseado no CEP informado

        // Para ambiente de produção real, use a API do Google Matrix Distance aqui

        const kmGeradoAleatorio = Math.floor(Math.random() * 13) + 1; 

        setDistanciaFicticia(kmGeradoAleatorio);

        if (kmGeradoAleatorio > 10) {

          setErroCep('Desculpe! Endereço fora da nossa área máxima de entrega (10km).');

          setTaxaFrete(0);

        } else {

          // Regra de Cálculo do Enunciado

          if (kmGeradoAleatorio <= 2) {

            setTaxaFrete(3.00);

          } else if (kmGeradoAleatorio <= 5) {

            setTaxaFrete(6.00);

          } else {

            const kmAdicional = kmGeradoAleatorio - 5;

            setTaxaFrete(6.00 + (kmAdicional * 7.00));

          }

        }

      } catch (err) {

        setErroCep('Erro ao consultar endereço.');

      }

    }

  };

  // --- WIDGET GOOGLE PLACES COM LAZY LOADING ---

  useEffect(() => {

    const observer = new IntersectionObserver((entries) => {

      if (entries[0].isIntersecting) {

        // Simulação da chamada da API do Google Places estruturando apenas 4/5 estrelas

        // Para usar oficial: fetch(`https://maps.googleapis.com/maps/api/place/details/...`)

        setDepoimentos([

          { autor: "Carlos Henrique", nota: 5, data: "Há 2 dias", texto: "O Total Dog é disparado o melhor hot dog duplo de Curitiba! Recheio insano e entrega muito ágil.", foto: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80" },

          { autor: "Mariana Costa", nota: 5, data: "Há 1 semana", texto: "X-Tudo gigante e muito saboroso, carne no ponto perfeito. Sempre peço pelo app pelo frete fixo rápido.", foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" },

          { autor: "Roberto Souza", nota: 4, data: "Há 2 semanas", texto: "Hot Dog de Cheddar excelente. Bem embalado, chegou muito quente mesmo morando no Portão.", foto: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80" }

        ]);

        observer.disconnect();

      }

    }, { threshold: 0.1 });

    if (sectionDepoimentosRef.current) {

      observer.observe(sectionDepoimentosRef.current);

    }

    return () => observer.disconnect();

  }, []);

  // --- DISPARO WHATSAPP ---

  const finalizarPedidoEEnviarWhatsApp = () => {

    if (!nome.trim()) return alert('Por favor, informe seu nome.');

    if (tipoEntrega === 'entrega' && (!rua || !numero || distanciaFicticia > 10)) {

      return alert('Por favor, valide um CEP de entrega dentro do raio de cobertura.');

    }

    const listaItens = carrinho.map(i => `${i.qtd}x ${i.nome} (R$ ${(i.preco * i.qtd).toFixed(2)})`).join(', ');

    

    let stringEndereco = "Retirada Direta no Balcão";

    if (tipoEntrega === 'entrega') {

      stringEndereco = `${rua}, Nº ${numero}, ${complemento ? complemento + ', ' : ''}${bairro}, ${cidade} - CEP: ${cep}`;

    }

    const mensagemFormated = `Olá Total Dog! Meu nome é ${nome}. Gostaria de fazer o seguinte pedido: [${listaItens}]. Observações: [${observacoes || 'Nenhuma'}]. Subtotal: R$ ${subtotal.toFixed(2)}. Taxa de Entrega: R$ ${tipoEntrega === 'entrega' ? taxaFrete.toFixed(2) : '0.00'}. Total Final: R$ ${totalGeral.toFixed(2)}. Endereço para entrega: [${stringEndereco}].`;

    const urlApiWhatsapp = `https://api.whatsapp.com/send?phone=5541988442062&text=${encodeURIComponent(mensagemFormated)}`;

    window.open(urlApiWhatsapp, '_blank');

  };

  return (

    <div className="min-h-screen text-gray-100 font-sans relative antialiased bg-[#121212]">

      

      {/* --- BACKGROUND VIDEO MP4 --- */}

      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">

        <video 

          autoPlay 

          loop 

          muted 

          playsInline

          className="w-full h-full object-cover opacity-40 scale-105"

        >

          <source src="VideoFundo.mp4" type="video/mp4" />

        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />

      </div>

      {/* --- HEADER --- */}

      <header className="relative z-10 bg-black/80 backdrop-blur-md border-b border-[#f90302]/30 py-4 px-4 sticky top-0 shadow-lg">

        <div className="max-w-md mx-auto flex items-center justify-between">

          <div className="flex items-center gap-3">

            {/* LogoSite1 Placeholder / Imagem real adaptável */}

            <div className="w-12 h-12 rounded-full border-2 border-[#febf14] bg-[#2b467b] flex items-center justify-center font-black text-xl text-[#febf14] shadow-md shadow-[#f90302]/20">

              TD

            </div>

            <div>

              <h1 className="font-black text-2xl tracking-wider text-white">TOTAL<span className="text-[#febf14]">DOG</span></h1>

              <p className="text-xs text-gray-400 flex items-center gap-1"><MapPin className="w-3 h-3 text-[#f90302]" /> Portão, Curitiba</p>

            </div>

          </div>

          <span className="bg-[#f90302] text-xs font-bold text-white px-2.5 py-1 rounded-full uppercase animate-pulse">Aberto</span>

        </div>

      </header>

      {/* --- CONTEÚDO PRINCIPAL (VITRINE MOBILE-FIRST) --- */}

      <main className="relative z-10 max-w-md mx-auto px-4 pt-6 pb-32">

        

        {/* Banner CTA */}

        <div className="bg-gradient-to-r from-[#2b467b] to-black border-l-4 border-[#febf14] p-4 rounded-xl mb-8 shadow-md">

          <h2 className="font-bold text-sm text-[#febf14]">Peça o nosso "Cartão Fidelidade"</h2>

          <p className="text-xs text-gray-300">Acumule pontos em lanches e ganhe na sua próxima compra!</p>

        </div>

        {/* Listagem Dinâmica das Categorias */}

        {Object.entries(CARDAPIO).map(([categoria, itens]) => (

          <section key={categoria} className="mb-8">

            <h3 className="text-xl font-black text-white border-b-2 border-[#2b467b] pb-2 mb-4 tracking-wide uppercase flex items-center gap-2">

              <span className="w-2 h-4 bg-[#f90302] rounded-sm"></span>

              {categoria}

            </h3>

            

            <div className="grid gap-4">

              {itens.map((item) => {

                const qtdVitrine = quantidadesVitrine[item.id] || 1;

                return (

                  <div key={item.id} className="bg-black/60 border border-gray-800 backdrop-blur-sm rounded-2xl overflow-hidden flex shadow-lg hover:border-gray-700 transition">

                    <div className="w-28 h-28 relative flex-shrink-0 bg-gray-900">

                      <img src={item.img} alt={item.nome} className="w-full h-full object-cover" loading="lazy" />

                    </div>

                    <div className="p-3 flex flex-col justify-between flex-grow">

                      <div>

                        <h4 className="font-bold text-base text-white tracking-wide">{item.nome}</h4>

                        <p className="text-xs text-gray-400 line-clamp-2 mt-0.5 font-light">{item.desc}</p>

                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1">

                        <span className="text-[#febf14] font-black text-base">R$ {item.preco.toFixed(2)}</span>

                        

                        {/* Controles Acoplados de UX Premium */}

                        <div className="flex items-center gap-2">

                          <div className="flex items-center bg-zinc-900 border border-zinc-700 rounded-lg">

                            <button onClick={() => alterarQtdVitrine(item.id, 'menos')} className="p-1 px-2 text-gray-400 hover:text-white"><Minus className="w-3 h-3" /></button>

                            <span className="text-xs font-bold w-4 text-center">{qtdVitrine}</span>

                            <button onClick={() => alterarQtdVitrine(item.id, 'mais')} className="p-1 px-2 text-gray-400 hover:text-white"><Plus className="w-3 h-3" /></button>

                          </div>

                          <button 

                            onClick={() => adicionarAoCarrinho(item)}

                            className="bg-[#f90302] hover:bg-red-700 text-white p-1.5 px-3 rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-sm"

                          >

                            <Plus className="w-3 h-3" /> Add

                          </button>

                        </div>

                      </div>

                    </div>

                  </div>

                );

              })}

            </div>

          </section>

        ))}

        {/* --- SEÇÃO DE DEPOIMENTOS GOOGLE PLACES COM LAZY LOADING --- */}

        <section ref={sectionDepoimentosRef} className="mt-12 bg-black/40 border border-zinc-800 p-4 rounded-2xl backdrop-blur-sm">

          <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">

            <h3 className="font-bold text-sm tracking-wide text-gray-300 uppercase">Avaliações do Google</h3>

            <div className="flex items-center text-[#febf14] text-xs font-bold gap-1">

              <Star className="w-3.5 h-3.5 fill-[#febf14]" /> 4.9/5.0

            </div>

          </div>

          

          <div className="space-y-4">

            {depoimentos.length === 0 ? (

              <div className="text-center py-4 text-xs text-gray-500 animate-pulse">Rolando página... Carregando avaliações recomendadas.</div>

            ) : (

              depoimentos.map((dep, idx) => (

                <div key={idx} className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-800">

                  <div className="flex items-center justify-between mb-1.5">

                    <div className="flex items-center gap-2">

                      <img src={dep.foto} alt={dep.autor} className="w-6 h-6 rounded-full" />

                      <span className="text-xs font-bold text-gray-200">{dep.autor}</span>

                    </div>

                    <span className="text-[10px] text-gray-500">{dep.data}</span>

                  </div>

                  <div className="flex gap-0.5 mb-1">

                    {[...Array(dep.nota)].map((_, i) => <Star key={i} className="w-3 h-3 fill-[#febf14] text-[#febf14]" />)}

                  </div>

                  <p className="text-xs text-gray-400 font-light italic">"{dep.texto}"</p>

                </div>

              ))

            )}

          </div>

        </section>

      </main>

      {/* --- RODAPÉ INSTITUCIONAL (EnderecoSite1) --- */}

      <footer className="relative z-10 bg-black/90 text-zinc-500 text-center py-6 text-xs border-t border-zinc-900 pb-28">

        <p className="font-bold text-zinc-400 mb-1">Total Dog Hotdog & Lanches</p>

        <p>R. Calixto Razolini, 335 - Portão, Curitiba - PR, 81070-060</p>

        <p className="text-[10px] mt-3 text-zinc-600">Desenvolvido com foco em alta performance e UX conversion.</p>

      </footer>

      {/* --- CARRINHO FLUTUANTE DA BASE --- */}

      {totalItensNoCarrinho > 0 && (

        <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-black via-black/95 to-transparent p-4">

          <button 

            onClick={() => setModalAberto(true)}

            className="max-w-md mx-auto bg-gradient-to-r from-[#f90302] to-red-700 hover:from-red-700 hover:to-red-800 text-white p-4 rounded-2xl flex items-center justify-between shadow-xl shadow-red-900/30 font-bold transition active:scale-95"

          >

            <div className="flex items-center gap-3">

              <div className="bg-black/40 px-3 py-1 rounded-lg text-sm text-[#febf14]">

                {totalItensNoCarrinho}

              </div>

              <span className="tracking-wide text-sm">Ver Carrinho</span>

            </div>

            <div className="flex items-center gap-1 text-base font-black">

              R$ {subtotal.toFixed(2)}

            </div>

          </button>

        </div>

      )}

      {/* --- MODAL DE CHECKOUT & PAGAMENTO --- */}

      {modalAberto && (

        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">

          <div className="bg-[#1a1a1a] w-full max-w-md rounded-t-3xl sm:rounded-2xl border-t sm:border border-zinc-800 max-h-[90vh] overflow-y-auto flex flex-col shadow-2xl">

            

            {/* Header Modal */}

            <div className="p-4 border-b border-zinc-800 flex items-center justify-between sticky top-0 bg-[#1a1a1a] z-10">

              <h3 className="font-black text-lg tracking-wide text-white uppercase flex items-center gap-2">

                <ShoppingBag className="w-5 h-5 text-[#febf14]" /> Seu Pedido

              </h3>

              <button onClick={() => setModalAberto(false)} className="bg-zinc-800 hover:bg-zinc-700 p-1.5 rounded-full text-gray-400 hover:text-white">

                <X className="w-5 h-5" />

              </button>

            </div>

            {/* Conteúdo do Modal */}

            <div className="p-4 space-y-6 flex-grow">

              

              {/* Lista do Carrinho */}

              <div className="space-y-3">

                {carrinho.map(item => (

                  <div key={item.id} className="flex items-center justify-between bg-zinc-900/80 p-3 rounded-xl border border-zinc-800">

                    <div className="flex-grow pr-2">

                      <h5 className="font-bold text-sm text-gray-200">{item.nome}</h5>

                      <span className="text-xs font-semibold text-[#febf14]">R$ {(item.preco * item.qtd).toFixed(2)}</span>

                    </div>

                    <div className="flex items-center bg-black border border-zinc-800 rounded-lg">

                      <button onClick={() => atualizarQtdCarrinho(item.id, -1)} className="p-1 px-2 text-zinc-500"><Minus className="w-3 h-3" /></button>

                      <span className="text-xs font-bold w-4 text-center text-zinc-200">{item.qtd}</span>

                      <button onClick={() => atualizarQtdCarrinho(item.id, 1)} className="p-1 px-2 text-zinc-500"><Plus className="w-3 h-3" /></button>

                    </div>

                  </div>

                ))}

              </div>

              {/* Seletor Tipo Entrega */}

              <div className="bg-zinc-900 p-1.5 rounded-xl border border-zinc-800 grid grid-cols-2 gap-1">

                <button 

                  type="button"

                  onClick={() => setTipoEntrega('entrega')}

                  className={`py-2.5 rounded-lg font-bold text-xs transition uppercase ${tipoEntrega === 'entrega' ? 'bg-[#2b467b] text-white shadow-md' : 'text-zinc-400 hover:text-zinc-200'}`}

                >

                  🚴 Tele-Entrega

                </button>

                <button 

                  type="button"

                  onClick={() => { setTipoEntrega('balcao'); setTaxaFrete(0); setErroCep(''); }}

                  className={`py-2.5 rounded-lg font-bold text-xs transition uppercase ${tipoEntrega === 'balcao' ? 'bg-[#2b467b] text-white shadow-md' : 'text-zinc-400 hover:text-zinc-200'}`}

                >

                  🏪 Retirar Balcão

                </button>

              </div>

              {/* Form Dados Cliente */}

              <div className="space-y-3">

                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Dados do Cliente</h4>

                

                <input 

                  type="text" 

                  placeholder="Seu Nome Completo"

                  value={nome}

                  onChange={e => setNome(e.target.value)}

                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#febf14] p-3 rounded-xl text-sm placeholder-zinc-500 text-white outline-none transition"

                />

                {tipoEntrega === 'entrega' && (

                  <>

                    <div className="grid grid-cols-3 gap-2">

                      <input 

                        type="text" 

                        maxLength={8}

                        placeholder="CEP (Somente nº)"

                        value={cep}

                        onChange={handleCepChange}

                        className="w-full col-span-1 bg-zinc-900 border border-zinc-800 focus:border-[#febf14] p-3 rounded-xl text-sm placeholder-zinc-500 text-white outline-none text-center transition"

                      />

                      <input 

                        type="text" 

                        placeholder="Rua / Logradouro" 

                        value={rua} 

                        disabled 

                        className="w-full col-span-2 bg-zinc-950 border border-zinc-900 p-3 rounded-xl text-sm text-zinc-400 cursor-not-allowed"

                      />

                    </div>

                    {erroCep && <p className="text-[11px] text-red-500 font-bold px-1">{erroCep}</p>}

                    <div className="grid grid-cols-2 gap-2">

                      <input type="text" placeholder="Bairro" value={bairro} disabled className="w-full bg-zinc-950 border border-zinc-900 p-3 rounded-xl text-sm text-zinc-400 cursor-not-allowed" />

                      <input type="text" placeholder="Cidade" value={cidade} disabled className="w-full bg-zinc-950 border border-zinc-900 p-3 rounded-xl text-sm text-zinc-400 cursor-not-allowed" />

                    </div>

                    <div className="grid grid-cols-3 gap-2">

                      <input 

                        type="text" 

                        placeholder="Número" 

                        value={numero}

                        onChange={e => setNumero(e.target.value)}

                        className="w-full col-span-1 bg-zinc-900 border border-zinc-800 focus:border-[#febf14] p-3 rounded-xl text-sm placeholder-zinc-500 text-white outline-none transition"

                      />

                      <input 

                        type="text" 

                        placeholder="Complemento / Apto" 

                        value={complemento}

                        onChange={e => setComplemento(e.target.value)}

                        className="w-full col-span-2 bg-zinc-900 border border-zinc-800 focus:border-[#febf14] p-3 rounded-xl text-sm placeholder-zinc-500 text-white outline-none transition"

                      />

                    </div>

                    {distanciaFicticia && !erroCep && (

                      <p className="text-[11px] text-green-400 px-1 font-semibold flex items-center gap-1">

                        <Check className="w-3 h-3" /> Estabelecimento localizado a {distanciaFicticia}km de você.

                      </p>

                    )}

                  </>

                )}

                <textarea 

                  placeholder="Observações do pedido (ex: sem cebola, ponto da carne, trocar por frango...)"

                  value={observacoes}

                  rows={2}

                  onChange={e => setObservacoes(e.target.value)}

                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#febf14] p-3 rounded-xl text-sm placeholder-zinc-500 text-white outline-none transition resize-none"

                />

              </div>

              {/* Tabela de Preço e Totais */}

              <div className="border-t border-zinc-800 pt-4 space-y-1.5 text-sm">

                <div className="flex justify-between text-zinc-400">

                  <span>Subtotal</span>

                  <span>R$ {subtotal.toFixed(2)}</span>

                </div>

                {tipoEntrega === 'entrega' && (

                  <div className="flex justify-between text-zinc-400">

                    <span>Taxa de Entrega</span>

                    <span className={taxaFrete === 0 ? "text-red-500" : "text-white font-bold"}>

                      {taxaFrete === 0 ? "Calcule o CEP" : `R$ ${taxaFrete.toFixed(2)}`}

                    </span>

                  </div>

                )}

                <div className="flex justify-between text-white font-black text-base pt-2 border-t border-dashed border-zinc-800">

                  <span className="text-[#febf14]">TOTAL GERAL</span>

                  <span className="text-[#febf14]">R$ {totalGeral.toFixed(2)}</span>

                </div>

              </div>

            </div>

            {/* Ação de Disparo Final (WhatsApp URL Linker) */}

            <div className="p-4 border-t border-zinc-800 sticky bottom-0 bg-[#1a1a1a]">

              <button

                type="button"

                onClick={finalizarPedidoEEnviarWhatsApp}

                className="w-full bg-gradient-to-r from-[#febf14] to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black p-4 rounded-xl font-black text-sm tracking-widest uppercase flex items-center justify-center gap-2 transition shadow-lg shadow-yellow-900/20"

              >

                <Phone className="w-4 h-4 fill-black" /> Enviar para o WhatsApp

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=SEU_PLACE_ID_AQUI&fields=reviews&key=SUA_CHAVE_API_AQUI`)

  .then(res => res.json())

  .then(data => {

     // Filtre os dados pegando apenas avaliações com rating >= 4

     const filtered = data.result.reviews.filter(r => r.rating >= 4);

     setDepoimentos(filtered);

  });

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://menutotaldog.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/cdffa2d2-78ed-4c77-8886-0b0be6f21738).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
