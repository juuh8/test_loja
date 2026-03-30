let idioma = "pt";

const textos = {
  pt: {titulo:"Loja de Biquínis", carrinho:"Carrinho", total:"Total"},
  en: {titulo:"Bikini Store", carrinho:"Cart", total:"Total"},
  es: {titulo:"Tienda de Bikinis", carrinho:"Carrito", total:"Total"}
};

let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

let carrinho = [];

function salvar() {
  localStorage.setItem("produtos", JSON.stringify(produtos));
}

function mudarIdioma(lang) {
  idioma = lang;
  document.getElementById("titulo").textContent = textos[lang].titulo;
  document.getElementById("carrinhoTitulo").textContent = textos[lang].carrinho;
  document.getElementById("totalTexto").textContent = textos[lang].total + ": ";
  renderizarProdutos();
}

function formatarPreco(valor){
  if(idioma === "en") return "$ " + valor;
  if(idioma === "es") return "€ " + valor;
  return "R$ " + valor;
}

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

    el.innerHTML = `
      <img src="${p.img}">
      <h3>${p.nome}</h3>
      <p>${formatarPreco(p.preco)}</p>

      <select id="tam${index}">
        ${tamanhosHTML}
      </select>

      <button onclick="comprar(${index})">Comprar</button>
      <button onclick="remover(${index})">X</button>
    `;

    div.appendChild(el);
  });
}

function adicionarProduto() {
  const nome = document.getElementById("nome").value;
  const preco = Number(document.getElementById("preco").value);
  const img = document.getElementById("imagem").value;
  const tamanhos = document.getElementById("tamanhos").value.split(",");

  produtos.push({nome, preco, img, tamanhos});
  salvar();
  renderizarProdutos();
}

function remover(i) {
  produtos.splice(i,1);
  salvar();
  renderizarProdutos();
}

function comprar(i) {
  const tam = document.getElementById("tam"+i).value;
  carrinho.push(produtos[i].nome + " ("+tam+")");
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById("lista-carrinho");
  lista.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, i) => {
    const li = document.createElement("li");
    li.textContent = item;
    lista.appendChild(li);

    total += produtos[i]?.preco || 0;
  });

  document.getElementById("total").textContent = formatarPreco(total);
}

// painel vendedor simples
function abrirPainel(){
  const senha = prompt("Senha:");
  if(senha === "1234"){
    document.getElementById("painel").style.display = "block";
  }
}

function fecharPainel(){
  document.getElementById("painel").style.display = "none";
}

// iniciar
renderizarProdutos();
