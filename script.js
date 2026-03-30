let idioma = "pt";

const textos = {
  pt: {titulo:"Loja de Biquínis", carrinho:"Carrinho", total:"Total"},
  en: {titulo:"Bikini Store", carrinho:"Cart", total:"Total"},
  es: {titulo:"Tienda de Bikinis", carrinho:"Carrito", total:"Total"}
};

let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function salvar() {
  localStorage.setItem("produtos", JSON.stringify(produtos));
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
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
    `;

    div.appendChild(el);
  });
}

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

function removerCarrinho(i){
  carrinho.splice(i,1);
  salvar();
  atualizarCarrinho();
}

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

// iniciar
renderizarProdutos();
atualizarCarrinho();
