// ===== CONFIG =====
let idioma = "pt";
let usuarioLogado = localStorage.getItem("admin") === "true";

const EMAIL_VENDEDOR = "admin";
const SENHA_VENDEDOR = "1234";

// ===== TEXTOS =====
const textos = {
  pt: {titulo:"Loja de Biquínis", carrinho:"Carrinho", total:"Total"},
  en: {titulo:"Bikini Store", carrinho:"Cart", total:"Total"},
  es: {titulo:"Tienda de Bikinis", carrinho:"Carrito", total:"Total"}
};

// ===== DADOS =====
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// ===== SALVAR =====
function salvar() {
  localStorage.setItem("produtos", JSON.stringify(produtos));
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// ===== IDIOMA =====
function mudarIdioma(lang) {
  idioma = lang;
  document.getElementById("titulo").textContent = textos[lang].titulo;
  document.getElementById("carrinhoTitulo").textContent = textos[lang].carrinho;
  document.getElementById("totalTexto").textContent = textos[lang].total + ": ";
  renderizarProdutos();
  atualizarCarrinho();
}

// ===== PREÇO =====
function formatarPreco(valor){
  if(idioma === "en") return "$ " + valor;
  if(idioma === "es") return "€ " + valor;
  return "R$ " + valor;
}

// ===== LOGIN =====
function login(){
  const email = prompt("Login:");
  const senha = prompt("Senha:");

  if(email === EMAIL_VENDEDOR && senha === SENHA_VENDEDOR){
    usuarioLogado = true;
    localStorage.setItem("admin", "true");
    alert("Vendedor logado!");
    document.getElementById("painel").style.display = "block";
  } else {
    usuarioLogado = false;
    localStorage.setItem("admin", "false");
    alert("Modo cliente");
  }

  renderizarProdutos();
}

// ===== PRODUTOS =====
function renderizarProdutos() {
  const div = document.getElementById("produtos");
  div.innerHTML = "";

  produtos.forEach((p, index) => {
    const el = document.createElement("div");
    el.className = "produto";

    let tamanhosHTML = "";
    p.tamanhos.forEach(t => {
      tamanhosHTML += `<option>${t}</option>`;
    });

    let botaoRemover = "";
    if(usuarioLogado){
      botaoRemover = `<button onclick="remover(${index})">Remover</button>`;
    }

    el.innerHTML = `
      <img src="${p.img}">
      <h3>${p.nome}</h3>
      <p>${formatarPreco(p.preco)}</p>

      <select id="tam${index}">
        ${tamanhosHTML}
      </select>

      <button onclick="comprar(${index})">Comprar</button>
      ${botaoRemover}
    `;

    div.appendChild(el);
  });
}

// ===== ADICIONAR PRODUTO =====
function adicionarProduto() {
  if(!usuarioLogado){
    alert("Só vendedor pode adicionar!");
    return;
  }

  const nome = document.getElementById("nome").value;
  const preco = Number(document.getElementById("preco").value);
  const img = document.getElementById("imagem").value;
  const tamanhos = document.getElementById("tamanhos").value.split(",");

  produtos.push({nome, preco, img, tamanhos});
  salvar();
  renderizarProdutos();
}

// ===== REMOVER PRODUTO =====
function remover(i) {
  if(!usuarioLogado){
    alert("Apenas vendedor pode remover!");
    return;
  }

  produtos.splice(i,1);
  salvar();
  renderizarProdutos();
}

// ===== COMPRAR =====
function comprar(i) {
  const tam = document.getElementById("tam"+i).value;

  carrinho.push({
    nome: produtos[i].nome,
    preco: produtos[i].preco,
    tamanho: tam
  });

  salvar();
  atualizarCarrinho();
}

// ===== REMOVER DO CARRINHO =====
function removerCarrinho(i){
  carrinho.splice(i,1);
  salvar();
  atualizarCarrinho();
}

// ===== ATUALIZAR CARRINHO =====
function atualizarCarrinho() {
  const lista = document.getElementById("lista-carrinho");
  lista.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, i) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${item.nome} (${item.tamanho}) - ${formatarPreco(item.preco)}
      <button onclick="removerCarrinho(${i})">X</button>
    `;

    lista.appendChild(li);
    total += item.preco;
  });

  document.getElementById("total").textContent = formatarPreco(total);
}

// ===== PAINEL =====
function abrirPainel(){
  if(usuarioLogado){
    document.getElementById("painel").style.display = "block";
  } else {
    alert("Faça login como vendedor");
  }
}

function fecharPainel(){
  document.getElementById("painel").style.display = "none";
}

// ===== INICIAR =====
renderizarProdutos();
atualizarCarrinho();
