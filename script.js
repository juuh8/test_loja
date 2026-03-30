let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function salvar() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function atualizarTela() {
  const lista = document.getElementById("lista-carrinho");
  const totalEl = document.getElementById("total");

  lista.innerHTML = "";
  let total = 0;

  carrinho.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.nome + " - R$ " + item.preco;
    lista.appendChild(li);
    total += item.preco;
  });

  totalEl.textContent = total;
}

function adicionar(nome, preco) {
  carrinho.push({ nome, preco });
  salvar();
  atualizarTela();
}

function finalizarCompra() {
  alert("Compra finalizada!");
  carrinho = [];
  salvar();
  atualizarTela();
}

// carregar ao abrir
atualizarTela();