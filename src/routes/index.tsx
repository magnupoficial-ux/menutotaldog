import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  ShoppingBag, Plus, Minus, X, MapPin, Star, Check, Phone,
} from "lucide-react";
import { calcularFrete } from "@/lib/frete.functions";
import fotoXsTotalAsset from "@/assets/FotoXsTotal.jpg.asset.json";
import totaldogAsset from "@/assets/hotdog-totaldog.jpg.asset.json";
import logoAsset from "@/assets/logo-totaldog.jpg.asset.json";
import agua500Asset from "@/assets/agua500.jpg.asset.json";
import refri600Asset from "@/assets/refri600.jpg.asset.json";
import refriLataAsset from "@/assets/refrilata.jpg.asset.json";
import calabresaAsset from "@/assets/hotdog-calabresa.jpg.asset.json";
import baconAsset from "@/assets/hotdog-bacon.jpg.asset.json";
import carneMoidaAsset from "@/assets/hotdog-carne-moida.jpg.asset.json";
import cheddarAsset from "@/assets/hotdog-cheddar.jpg.asset.json";
import xBaconAsset from "@/assets/x-bacon.jpg.asset.json";
import xFrangoAsset from "@/assets/x-frango.jpg.asset.json";
import meioTotalDogAsset from "@/assets/meio-totaldog.jpg.asset.json";
import bigDogAsset from "@/assets/big-dog.jpg.asset.json";
import dogFrangoAsset from "@/assets/dog-frango.jpg.asset.json";
import dogSimplesAsset from "@/assets/dog-simples.jpg.asset.json";
import dogDuploAsset from "@/assets/dog-duplo.jpg.asset.json";
import xAlcatraAsset from "@/assets/x-alcatra.jpg.asset.json";
import xCalabrezaAsset from "@/assets/x-calabreza.jpg.asset.json";
import xSaladaAsset from "@/assets/x-salada.jpg.asset.json";
import xBurguerAsset from "@/assets/x-burguer.jpg.asset.json";

const IMG_XTUDO = fotoXsTotalAsset.url;
const IMG_DOG = totaldogAsset.url;
const IMG_CALABRESA = calabresaAsset.url;
const IMG_BACON = baconAsset.url;
const IMG_CARNE_MOIDA = carneMoidaAsset.url;
const IMG_CHEDDAR = cheddarAsset.url;
const IMG_AGUA = agua500Asset.url;
const IMG_REFRI600 = refri600Asset.url;
const IMG_REFRI_LATA = refriLataAsset.url;
const IMG_X_BACON = xBaconAsset.url;
const IMG_X_FRANGO = xFrangoAsset.url;
const IMG_MEIO_TOTAL_DOG = meioTotalDogAsset.url;
const IMG_BIG_DOG = bigDogAsset.url;
const IMG_DOG_FRANGO = dogFrangoAsset.url;
const IMG_DOG_SIMPLES = dogSimplesAsset.url;
const IMG_DOG_DUPLO = dogDuploAsset.url;
const IMG_X_ALCATRA = xAlcatraAsset.url;
const IMG_X_CALABREZA = xCalabrezaAsset.url;
const IMG_X_SALADA = xSaladaAsset.url;
const IMG_X_BURGUER = xBurguerAsset.url;


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Total Dog — Hotdogs & Lanches em Curitiba" },
      { name: "description", content: "Peça hot dogs especiais, X-Tudo e lanches do Total Dog no Portão, Curitiba. Entrega rápida pelo WhatsApp." },
      { property: "og:title", content: "Total Dog — Hotdogs & Lanches em Curitiba" },
      { property: "og:description", content: "Peça hot dogs especiais, X-Tudo e lanches do Total Dog no Portão, Curitiba. Entrega rápida pelo WhatsApp." },
    ],
  }),
  component: Index,
});

const CARDAPIO: Record<string, { id: string; nome: string; preco: number; desc: string; img: string }[]> = {
  "Especiais Duplos": [
    { id: 'ed6', nome: 'Total Dog (Serve 2 pessoas)', preco: 52.00, desc: '2 Pães, 2 vinas, bacon, filé de alcatra, calabresa, frango, cheddar, catupiry, maionese, tomate, cebola, mussarela, milho e batata palha.', img: IMG_DOG },
    { id: 'ed5', nome: 'Meio Total Dog', preco: 32.00, desc: 'Pão, 1 vina, bacon, filé de alcatra, calabresa, frango, cheddar, catupiry, maionese, tomate, cebola, mussarela, milho e batata palha.', img: IMG_MEIO_TOTAL_DOG },
    { id: 'ed4', nome: 'Big', preco: 32.00, desc: 'Pão, 2 vinas, bacon, filé de alcatra, catupiry, cheddar, maionese, tomate, cebola, milho, batata palha, rúcula e tomate seco.', img: IMG_BIG_DOG },
    { id: 'ed2', nome: 'Cheddar', preco: 24.00, desc: 'Pão, 2 vinas, maionese, tomate, milho, batata palha, cheddar e cebola. (Opção: bacon, calabresa ou frango)', img: IMG_CHEDDAR },
    { id: 'ed1', nome: 'Catupiry', preco: 23.00, desc: 'Pão, 2 vinas, maionese, tomate, milho, batata palha, catupiry e cebola. (Opção: bacon, calabresa ou frango)', img: IMG_DOG_FRANGO },
    { id: 'ed3', nome: '4 Queijos', preco: 23.00, desc: 'Pão, 2 vinas, maionese, tomate, milho, batata palha, provolone, parmesão, mussarela, catupiry e cebola.', img: IMG_DOG_FRANGO },
  ],
  "Especiais": [
    { id: 'es2', nome: 'Bacon', preco: 23.00, desc: 'Pão, 1 vina, bacon, maionese, cebola, tomate, milho e batata palha.', img: IMG_BACON },
    { id: 'es1', nome: 'Frango', preco: 22.00, desc: 'Pão, 1 vina, frango, maionese, cebola, tomate, milho e batata palha.', img: IMG_DOG_FRANGO },
    { id: 'es3', nome: 'Calabresa', preco: 22.00, desc: 'Pão, 1 vina, calabresa, maionese, cebola, tomate, milho e batata palha.', img: IMG_CALABRESA },
    { id: 'es4', nome: 'Carne Moída', preco: 22.00, desc: 'Pão, 1 vina, carne moída, queijo mussarela, maionese, cebola, tomate, milho e batata palha.', img: IMG_CARNE_MOIDA },
  ],
  "Tradicionais": [
    { id: 'tr2', nome: 'Duplo', preco: 18.00, desc: 'Pão, 2 vinas, maionese, tomate, milho, batata palha e cebola.', img: IMG_DOG_DUPLO },
    { id: 'tr1', nome: 'Simples', preco: 17.00, desc: 'Pão, 1 vina, maionese, tomate, milho, batata palha e cebola.', img: IMG_DOG_SIMPLES },
  ],
  "Lanches e Hamburgueres": [
    { id: 'lh1', nome: 'X Tudo', preco: 36.00, desc: 'Pão, hambúrguer 130g, alcatra, bacon, calabresa, frango, queijo mussarela, alface, tomate, barbecue e maionese.', img: IMG_XTUDO },
    { id: 'lh2', nome: 'X Alcatra', preco: 29.00, desc: 'Pão, hambúrguer 130g, alcatra, queijo mussarela, alface, tomate, barbecue e maionese.', img: IMG_X_ALCATRA },
    { id: 'lh3', nome: 'X Bacon', preco: 25.00, desc: 'Pão, hambúrguer 130g, bacon, queijo mussarela, alface, tomate, barbecue e maionese.', img: IMG_X_BACON },
    { id: 'lh4', nome: 'X Calabresa', preco: 24.00, desc: 'Pão, hambúrguer 130g, calabresa, queijo mussarela, alface, tomate, barbecue e maionese.', img: IMG_X_CALABREZA },
    { id: 'lh5', nome: 'X Frango', preco: 23.00, desc: 'Pão, hambúrguer 130g, frango, queijo mussarela, alface, tomate, barbecue e maionese.', img: IMG_X_FRANGO },
    { id: 'lh6', nome: 'X Salada', preco: 21.00, desc: 'Pão, hambúrguer 130g, queijo mussarela, alface, tomate, barbecue e maionese.', img: IMG_X_SALADA },
    { id: 'lh7', nome: 'X Burguer', preco: 17.00, desc: 'Pão, hambúrguer 130g, queijo mussarela, barbecue e maionese.', img: IMG_X_BURGUER },
  ],
  "Bebidas": [
    { id: 'b7', nome: 'Refrigerante 2 litros', preco: 18.00, desc: 'Garrafa pet família de 2 Litros.', img: IMG_REFRI600 },
    { id: 'b6', nome: 'Refrigerante 1 litro', preco: 12.90, desc: 'Garrafa pet de 1 litro.', img: IMG_REFRI600 },
    { id: 'b5', nome: 'Refrigerante 600 ml', preco: 11.00, desc: 'Garrafa pet de 600ml.', img: IMG_REFRI600 },
    { id: 'b1', nome: 'Refrigerante Lata', preco: 7.50, desc: 'Lata de 350ml trincando de gelada.', img: IMG_REFRI_LATA },
    { id: 'b2', nome: 'Chá Mate', preco: 7.00, desc: 'Copo de Chá Mate natural.', img: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=500&auto=format&fit=crop&q=60' },
    { id: 'b3', nome: 'Suco', preco: 7.00, desc: 'Suco polpa natural de frutas.', img: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&auto=format&fit=crop&q=60' },
    { id: 'b4', nome: 'Água', preco: 4.00, desc: 'Garrafa de água mineral 500ml.', img: IMG_AGUA },
  ],
};

type CartItem = { id: string; nome: string; preco: number; desc: string; img: string; qtd: number };
type Depoimento = { autor: string; nota: number; data: string; texto: string; foto: string };

function Index() {
  const [quantidadesVitrine, setQuantidadesVitrine] = useState<Record<string, number>>({});
  const [carrinho, setCarrinho] = useState<CartItem[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [tipoEntrega, setTipoEntrega] = useState<'entrega' | 'balcao'>('entrega');

  const [nome, setNome] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const [distanciaFicticia, setDistanciaFicticia] = useState<number | null>(null);
  const [taxaBase, setTaxaBase] = useState(0);
  const [erroCep, setErroCep] = useState('');
  const [tempoEntrega, setTempoEntrega] = useState<number | null>(null);
  const [calculandoFrete, setCalculandoFrete] = useState(false);
  const [freteGratis, setFreteGratis] = useState(false);


  const [formaPagamento, setFormaPagamento] = useState<'cartao' | 'dinheiro' | 'pix' | ''>('');
  const [troco, setTroco] = useState('');

  const [agora, setAgora] = useState<Date>(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setAgora(new Date()), 60 * 1000);
    return () => clearInterval(id);
  }, []);
  // Horário oficial Total Dog (Google): Seg-Sáb 18:45 às 23:59 — Domingo fechado
  const dia = agora.getDay(); // 0 = Domingo
  const minutosAgora = agora.getHours() * 60 + agora.getMinutes();
  const lojaAberta = dia !== 0 && minutosAgora >= 18 * 60 + 45 && minutosAgora < 24 * 60;

  const [depoimentos, setDepoimentos] = useState<Depoimento[]>([]);
  const sectionDepoimentosRef = useRef<HTMLElement | null>(null);

  const alterarQtdVitrine = (id: string, operacao: 'mais' | 'menos') => {
    setQuantidadesVitrine(prev => {
      const atual = prev[id] || 1;
      let nova = operacao === 'mais' ? atual + 1 : atual - 1;
      if (nova < 1) nova = 1;
      return { ...prev, [id]: nova };
    });
  };

  const adicionarAoCarrinho = (item: { id: string; nome: string; preco: number; desc: string; img: string }) => {
    const qtd = quantidadesVitrine[item.id] || 1;
    setCarrinho(prev => {
      const existente = prev.find(i => i.id === item.id);
      if (existente) {
        return prev.map(i => i.id === item.id ? { ...i, qtd: i.qtd + qtd } : i);
      }
      return [...prev, { ...item, qtd }];
    });
    setQuantidadesVitrine(prev => ({ ...prev, [item.id]: 1 }));
  };

  const atualizarQtdCarrinho = (id: string, alteracao: number) => {
    setCarrinho(prev => prev.map(item => {
      if (item.id === id) {
        const novaQtd = item.qtd + alteracao;
        return novaQtd > 0 ? { ...item, qtd: novaQtd } : item;
      }
      return item;
    }).filter(item => item.qtd > 0));
  };

  const removerDoCarrinho = (id: string) => {
    setCarrinho(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = carrinho.reduce((acc, item) => acc + (item.preco * item.qtd), 0);
  const taxaFrete = freteGratis ? 0 : taxaBase;
  const totalGeral = tipoEntrega === 'entrega' ? subtotal + taxaFrete : subtotal;
  const totalItensNoCarrinho = carrinho.reduce((acc, item) => acc + item.qtd, 0);


  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value.replace(/\D/g, '');
    setCep(valor);

    if (valor.length === 8) {
      try {
        setErroCep('');
        const response = await fetch(`https://viacep.com.br/ws/${valor}/json/`);
        const data = await response.json();

        if (data.erro) {
          setErroCep('Não encontramos esse CEP. Confira o CEP digitado.');
          return;
        }
        setRua(data.logradouro);
        setBairro(data.bairro);
        setCidade(data.localidade);
      } catch {
        setErroCep('Erro ao consultar o CEP. Tente novamente.');
      }
    }
  };

  // Calcula o frete no backend (Google Routes) sempre que o endereço completo
  // ou o subtotal mudarem. A chave da API fica protegida no servidor.
  useEffect(() => {
    if (tipoEntrega !== 'entrega' || cep.length !== 8 || !rua || !numero.trim()) {
      setDistanciaFicticia(null);
      setTempoEntrega(null);
      setTaxaBase(0);
      setFreteGratis(false);
      return;
    }
    let cancelado = false;
    const endereco = `${rua}, ${numero}, ${bairro}, ${cidade} - PR, CEP ${cep}, Brasil`;
    const timer = setTimeout(async () => {
      setCalculandoFrete(true);
      try {
        const r = await calcularFrete({ data: { endereco, subtotal } });
        if (cancelado) return;
        if (!r.ok) {
          setErroCep(r.erro ?? 'Não foi possível calcular a entrega.');
          setDistanciaFicticia(r.km ?? null);
          setTempoEntrega(null);
          setTaxaBase(0);
          setFreteGratis(false);
        } else {
          setErroCep('');
          setDistanciaFicticia(r.km ?? null);
          setTempoEntrega(r.minutos ?? null);
          setTaxaBase(r.taxa ?? 0);
          setFreteGratis(Boolean(r.gratis));
        }
      } catch {
        if (!cancelado) setErroCep('Não foi possível calcular a entrega agora. Tente novamente.');
      } finally {
        if (!cancelado) setCalculandoFrete(false);
      }
    }, 600);
    return () => {
      cancelado = true;
      clearTimeout(timer);
    };
  }, [tipoEntrega, cep, rua, bairro, cidade, numero, subtotal]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setDepoimentos([
          { autor: "Carlos Henrique", nota: 5, data: "Há 2 dias", texto: "O Total Dog é disparado o melhor hot dog duplo de Curitiba! Recheio insano e entrega muito ágil.", foto: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80" },
          { autor: "Mariana Costa", nota: 5, data: "Há 1 semana", texto: "X-Tudo gigante e muito saboroso, carne no ponto perfeito. Sempre peço pelo app pelo frete fixo rápido.", foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" },
          { autor: "Roberto Souza", nota: 4, data: "Há 2 semanas", texto: "Hot Dog de Cheddar excelente. Bem embalado, chegou muito quente mesmo morando no Portão.", foto: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80" },
        ]);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (sectionDepoimentosRef.current) {
      observer.observe(sectionDepoimentosRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const finalizarPedidoEEnviarWhatsApp = () => {
    if (!lojaAberta) return alert('Estamos fechados no momento. Atendimento: Seg-Sáb 18h45 às 23h59.');
    if (!nome.trim()) return alert('Por favor, informe seu nome.');
    if (tipoEntrega === 'entrega' && (!rua || !numero || (distanciaFicticia ?? 0) > 7)) {
      return alert('Por favor, valide um CEP de entrega dentro do raio de cobertura (7km).');

    }
    if (!formaPagamento) return alert('Por favor, selecione a forma de pagamento.');

    const listaItens = carrinho.map(i => `${i.qtd}x ${i.nome} (R$ ${(i.preco * i.qtd).toFixed(2)})`).join(', ');
    let stringEndereco = "Retirada Direta no Balcão";
    if (tipoEntrega === 'entrega') {
      stringEndereco = `${rua}, Nº ${numero}, ${complemento ? complemento + ', ' : ''}${bairro}, ${cidade} - CEP: ${cep}`;
    }

    const pagamentoLabel = formaPagamento === 'cartao' ? 'Cartão' : formaPagamento === 'dinheiro' ? 'Dinheiro' : 'Pix';
    const trocoStr = formaPagamento === 'dinheiro' && troco.trim() ? ` (Troco para R$ ${troco})` : '';

    const mensagemFormated = `Olá Total Dog! Meu nome é ${nome}. Gostaria de fazer o seguinte pedido: [${listaItens}]. Observações: [${observacoes || 'Nenhuma'}]. Subtotal: R$ ${subtotal.toFixed(2)}. Taxa de Entrega: R$ ${tipoEntrega === 'entrega' ? taxaFrete.toFixed(2) : '0.00'}. Total Final: R$ ${totalGeral.toFixed(2)}. Forma de Pagamento: ${pagamentoLabel}${trocoStr}. Endereço para entrega: [${stringEndereco}].`;
    const urlApiWhatsapp = `https://api.whatsapp.com/send?phone=5541988442062&text=${encodeURIComponent(mensagemFormated)}`;
    window.open(urlApiWhatsapp, '_blank');
  };

  return (
    <div className="min-h-screen text-gray-100 font-sans relative antialiased bg-[#121212]">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
      </div>

      <header className="relative z-30 bg-black/95 backdrop-blur-md border-b border-[#f90302]/30 py-3 px-4 sticky top-0 shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img src={logoAsset.url} alt="Total Dog" className="h-10 sm:h-12 w-auto object-contain shrink-0" />
            <p className="text-xs text-gray-400 flex items-center gap-1 truncate"><MapPin className="w-3 h-3 text-[#f90302] shrink-0" /> Portão, Curitiba</p>
          </div>
          <div className="flex flex-col items-end gap-0.5 shrink-0">
            <span className={`text-xs font-bold text-white px-2.5 py-1 rounded-full uppercase shrink-0 ${lojaAberta ? 'bg-[#1a8a3a] animate-pulse' : 'bg-zinc-600'}`}>
              {lojaAberta ? 'Aberto' : 'Fechado'}
            </span>
            <span className="text-[10px] text-gray-400">Seg-Sáb 18h45-23h59</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-md mx-auto px-4 pt-6 pb-32">
        <div className="bg-gradient-to-r from-[#2b467b] to-black border-l-4 border-[#febf14] p-4 rounded-xl mb-4 shadow-md">
          <h2 className="font-bold text-sm text-[#febf14]">Peça o nosso "Cartão Fidelidade"</h2>
          <p className="text-xs text-gray-300">Acumule pontos em lanches e ganhe na sua próxima compra!</p>
        </div>
        <div className="bg-gradient-to-r from-green-700 to-emerald-900 border-l-4 border-green-300 p-3 rounded-xl mb-4 shadow-md">
          <h2 className="font-bold text-sm text-white">🛵 Frete GRÁTIS acima de R$ 55,00</h2>
          <p className="text-xs text-green-100">Válido para entregas até 3,0 km pelo aplicativo.</p>
        </div>

        <div className="bg-black/60 border border-zinc-800 rounded-xl p-3 mb-8 shadow-md">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Taxa de Entrega</h3>
          <ul className="text-xs text-zinc-300 space-y-1">
            <li className="flex justify-between"><span>Até 2,5 km</span> <span className="font-bold text-white">R$ 7,00</span></li>
            <li className="flex justify-between"><span>Até 3,0 km</span> <span className="font-bold text-white">R$ 8,00</span></li>
            <li className="flex justify-between"><span>Até 3,5 km</span> <span className="font-bold text-white">R$ 9,00</span></li>
            <li className="flex justify-between"><span>Até 4,5 km</span> <span className="font-bold text-white">R$ 10,00</span></li>
            <li className="flex justify-between"><span>Até 5,0 km</span> <span className="font-bold text-white">R$ 11,00</span></li>
            <li className="flex justify-between"><span>Até 5,8 km</span> <span className="font-bold text-white">R$ 12,00</span></li>
            <li className="flex justify-between"><span>Até 7,0 km</span> <span className="font-bold text-white">R$ 15,00</span></li>
          </ul>
        </div>


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

      <footer className="relative z-10 bg-black/90 text-zinc-500 text-center py-6 text-xs border-t border-zinc-900 pb-28">
        <p className="font-bold text-zinc-400 mb-1">Total Dog Hotdog & Lanches</p>
        <p>R. Calixto Razolini, 335 - Portão, Curitiba - PR, 81070-060</p>
        <p className="text-[10px] mt-3 text-zinc-600">Desenvolvido com foco em alta performance e UX conversion.</p>
      </footer>

      {totalItensNoCarrinho > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-black via-black/95 to-transparent p-4">
          <button
            onClick={() => setModalAberto(true)}
            className="max-w-md mx-auto w-full bg-gradient-to-r from-[#f90302] to-red-700 hover:from-red-700 hover:to-red-800 text-white p-4 rounded-2xl flex items-center justify-between shadow-xl shadow-red-900/30 font-bold transition active:scale-95"
          >
            <div className="flex items-center gap-3">
              <div className="bg-black/40 px-3 py-1 rounded-lg text-sm text-[#febf14]">{totalItensNoCarrinho}</div>
              <span className="tracking-wide text-sm">Ver Carrinho</span>
            </div>
            <div className="flex items-center gap-1 text-base font-black">R$ {subtotal.toFixed(2)}</div>
          </button>
        </div>
      )}

      {modalAberto && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-[#1a1a1a] w-full max-w-md rounded-t-3xl sm:rounded-2xl border-t sm:border border-zinc-800 max-h-[90vh] overflow-y-auto flex flex-col shadow-2xl">
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between sticky top-0 bg-[#1a1a1a] z-10">
              <h3 className="font-black text-lg tracking-wide text-white uppercase flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#febf14]" /> Seu Pedido
              </h3>
              <button onClick={() => setModalAberto(false)} className="bg-zinc-800 hover:bg-zinc-700 p-1.5 rounded-full text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-6 flex-grow">
              <div className="space-y-3">
                {carrinho.map(item => (
                  <div key={item.id} className="flex items-center justify-between bg-zinc-900/80 p-3 rounded-xl border border-zinc-800">
                    <div className="flex-grow pr-2">
                      <h5 className="font-bold text-sm text-gray-200">{item.nome}</h5>
                      <span className="text-xs font-semibold text-[#febf14]">R$ {(item.preco * item.qtd).toFixed(2)}</span>
                      <button
                        onClick={() => removerDoCarrinho(item.id)}
                        className="block mt-1 text-[11px] text-red-500 font-semibold hover:text-red-400 underline decoration-red-500/50 underline-offset-2"
                      >
                        Remover
                      </button>
                    </div>
                    <div className="flex items-center bg-black border border-zinc-800 rounded-lg">
                      <button onClick={() => atualizarQtdCarrinho(item.id, -1)} className="p-1 px-2 text-zinc-500"><Minus className="w-3 h-3" /></button>
                      <span className="text-xs font-bold w-4 text-center text-zinc-200">{item.qtd}</span>
                      <button onClick={() => atualizarQtdCarrinho(item.id, 1)} className="p-1 px-2 text-zinc-500"><Plus className="w-3 h-3" /></button>
                    </div>
                  </div>
                ))}
              </div>

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
                  onClick={() => { setTipoEntrega('balcao'); setTaxaBase(0); setErroCep(''); }}
                  className={`py-2.5 rounded-lg font-bold text-xs transition uppercase ${tipoEntrega === 'balcao' ? 'bg-[#2b467b] text-white shadow-md' : 'text-zinc-400 hover:text-zinc-200'}`}
                >
                  🏪 Retirar Balcão
                </button>
              </div>

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
                        placeholder="CEP"
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
                    {calculandoFrete && (
                      <p className="text-[11px] text-zinc-400 px-1 font-semibold">Calculando distância e frete...</p>
                    )}
                    {!calculandoFrete && distanciaFicticia !== null && !erroCep && (
                      <p className="text-[11px] text-green-400 px-1 font-semibold flex items-center gap-1">
                        <Check className="w-3 h-3" /> {distanciaFicticia} km de distância
                        {tempoEntrega ? ` • entrega estimada em ~${tempoEntrega} min` : ''}.
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

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Forma de Pagamento</h4>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { id: 'cartao', label: '💳 Cartão' },
                    { id: 'dinheiro', label: '💵 Dinheiro' },
                    { id: 'pix', label: '⚡ Pix' },
                  ] as const).map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setFormaPagamento(opt.id)}
                      className={`py-2.5 rounded-lg font-bold text-xs uppercase transition border ${formaPagamento === opt.id ? 'bg-[#2b467b] text-white border-[#febf14] shadow-md' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200'}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {formaPagamento === 'dinheiro' && (
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="Precisa de troco para quanto? (opcional)"
                    value={troco}
                    onChange={e => setTroco(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#febf14] p-3 rounded-xl text-sm placeholder-zinc-500 text-white outline-none transition"
                  />
                )}
              </div>

              <div className="border-t border-zinc-800 pt-4 space-y-1.5 text-sm">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                {tipoEntrega === 'entrega' && (
                  <div className="flex justify-between text-zinc-400">
                    <span>Taxa de Entrega {freteGratis && <span className="text-green-400 font-bold">(GRÁTIS)</span>}</span>
                    <span className={taxaBase === 0 && !freteGratis ? "text-red-500" : "text-white font-bold"}>
                      {taxaBase === 0 && !freteGratis ? "Calcule o CEP" : freteGratis ? <span className="text-green-400">Grátis</span> : `R$ ${taxaFrete.toFixed(2)}`}
                    </span>
                  </div>
                )}

                {formaPagamento && (
                  <div className="flex justify-between text-zinc-400">
                    <span>Pagamento</span>
                    <span className="text-white font-bold">
                      {formaPagamento === 'cartao' ? 'Cartão' : formaPagamento === 'dinheiro' ? `Dinheiro${troco ? ` (troco p/ R$ ${troco})` : ''}` : 'Pix'}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-white font-black text-base pt-2 border-t border-dashed border-zinc-800">
                  <span className="text-[#febf14]">TOTAL GERAL</span>
                  <span className="text-[#febf14]">R$ {totalGeral.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-zinc-800 sticky bottom-0 bg-[#1a1a1a]">
              {!lojaAberta && (
                <p className="text-center text-xs text-red-400 font-bold mb-2 uppercase tracking-wider">
                  Fechado agora • Atendimento Seg-Sáb 18h45-23h59
                </p>
              )}
              <button
                type="button"
                onClick={finalizarPedidoEEnviarWhatsApp}
                disabled={!lojaAberta}
                className="w-full bg-gradient-to-r from-[#febf14] to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black p-4 rounded-xl font-black text-sm tracking-widest uppercase flex items-center justify-center gap-2 transition shadow-lg shadow-yellow-900/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:from-zinc-600 disabled:to-zinc-700"
              >
                <Phone className="w-4 h-4 fill-black" /> {lojaAberta ? 'Enviar para o WhatsApp' : 'Loja Fechada'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
