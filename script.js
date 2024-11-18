// Função para calcular as raízes da equação do 2º grau (Bhaskara)
function calcula() {
    const a = document.getElementById('va').value;  // Obtém o valor de 'a' da equação (entrada do usuário)
    const b = document.getElementById('vb').value;  // Obtém o valor de 'b' da equação (entrada do usuário)
    const c = document.getElementById('vc').value;  // Obtém o valor de 'c' da equação (entrada do usuário)

    let delta = (b*b) - (4 * a * c);  // Calcula o discriminante (delta) da equação
    let rd = Math.sqrt(delta);  // Calcula a raiz quadrada de delta

    if (delta > 0) {  // Se delta for maior que zero, existem duas raízes reais
        let x1 = (-b + rd) / (2 * a);  // Calcula a primeira raiz
        let x2 = (-b - rd) / (2 * a);  // Calcula a segunda raiz
        document.getElementById('r1').innerText = "x1 = " + x1;  // Exibe o valor de x1
        document.getElementById('r2').innerText = "x2 = " + x2;  // Exibe o valor de x2
    } else if (delta == 0) {  // Se delta for igual a zero, existe uma raiz única
        let xu = (-b) / (2 * a);  // Calcula a raiz única
        document.getElementById('r1').innerText = "x único = " + xu;  // Exibe a raiz única
    } else {  // Se delta for negativo, não existem raízes reais
        document.getElementById('r1').innerText = "não há raiz real";  // Informa que não há raízes reais
    }
}

// Função para calcular a Tabela Price (pag3)
function calcularTabelaPrice() {
    const valor = parseFloat(document.getElementById("valorPrice").value);  // Obtém o valor do empréstimo
    const taxa = parseFloat(document.getElementById("taxaPrice").value) / 100;  // Obtém a taxa de juros e converte para decimal
    const parcelas = parseInt(document.getElementById("parcelasPrice").value);  // Obtém o número de parcelas

    // Verifica se todos os valores são válidos
    if (isNaN(valor) || isNaN(taxa) || isNaN(parcelas)) {
        alert("Por favor, insira valores válidos!");  // Exibe alerta se os valores forem inválidos
        return;
    }

    // Cálculo da parcela fixa (PMT) usando a fórmula da Tabela Price
    const pmt = (valor * (taxa * Math.pow(1 + taxa, parcelas))) / (Math.pow(1 + taxa, parcelas) - 1);

    let saldoDevedor = valor;  // Inicializa o saldo devedor com o valor total do empréstimo
    const tabelaBody = document.querySelector("#tabela-price tbody");  // Obtém o corpo da tabela

    tabelaBody.innerHTML = "";  // Limpa a tabela antes de preencher com novos dados

    // Preenche a tabela com os detalhes de cada parcela
    for (let i = 1; i <= parcelas; i++) {
        const juros = saldoDevedor * taxa;  // Calcula o valor dos juros da parcela
        const amortizacao = pmt - juros;   // Calcula a amortização da parcela
        saldoDevedor -= amortizacao;       // Atualiza o saldo devedor

        // Cria uma nova linha para a tabela
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${i}</td>
            <td>${pmt.toFixed(2)}</td>
            <td>${juros.toFixed(2)}</td>
            <td>${amortizacao.toFixed(2)}</td>
            <td>${saldoDevedor.toFixed(2)}</td>
        `;
        tabelaBody.appendChild(row);  // Adiciona a linha na tabela
    }

    // Exibe a tabela após o cálculo
    document.getElementById('tabela-price').style.display = 'table';  // Torna a tabela visível
}

// Função para calcular o Custo de Oportunidade (pag3)
function calcularCusto() {
    const rentTesouro = parseFloat(document.getElementById("investTesouro").value) / 100;  // Rentabilidade do Tesouro Direto
    const rentOutro = parseFloat(document.getElementById("investOutro").value) / 100;  // Rentabilidade do outro investimento
    const valorInvestido = parseFloat(document.getElementById("valorInvestido").value);  // Valor investido
    const tempoInvest = parseFloat(document.getElementById("tempoInvest").value);  // Tempo de investimento (em anos)

    // Verifica se todos os valores são válidos
    if (isNaN(rentTesouro) || isNaN(rentOutro) || isNaN(valorInvestido) || isNaN(tempoInvest)) {
        alert("Por favor, insira valores válidos!");  // Exibe alerta se os valores forem inválidos
        return;
    }

    // Calcula o rendimento do Tesouro Direto e do outro investimento
    const rendimentoTesouro = valorInvestido * Math.pow(1 + rentTesouro, tempoInvest) - valorInvestido;
    const rendimentoOutro = valorInvestido * Math.pow(1 + rentOutro, tempoInvest) - valorInvestido;

    // Calcula o custo de oportunidade (diferença de rendimento entre os dois investimentos)
    const custoOportunidade = rendimentoOutro - rendimentoTesouro;

    const tabelaBody = document.querySelector("#tabela-custo tbody");  // Obtém o corpo da tabela
    tabelaBody.innerHTML = "";  // Limpa a tabela antes de adicionar os novos dados

    // Preenche a tabela com os detalhes de cada investimento
    const rowTesouro = document.createElement("tr");
    rowTesouro.innerHTML = `
        <td>Tesouro Direto</td>
        <td>${(rendimentoTesouro + valorInvestido).toFixed(2)}</td>
        <td>---</td>
    `;
    tabelaBody.appendChild(rowTesouro);

    const rowOutro = document.createElement("tr");
    rowOutro.innerHTML = `
        <td>Investimento Alternativo</td>
        <td>${(rendimentoOutro + valorInvestido).toFixed(2)}</td>
        <td>${custoOportunidade.toFixed(2)}</td>
    `;
    tabelaBody.appendChild(rowOutro);

    // Exibe a tabela após o cálculo
    document.getElementById('tabela-custo').style.display = 'table';  // Torna a tabela visível
}

// Função para calcular o valor da parcela fixa da Tabela Price (pag2)
function calcularParcelas() {
    const valorFinanciado = parseFloat(document.getElementById('valor').value);  // Valor financiado
    const taxaJuros = parseFloat(document.getElementById('juros').value) / 100;  // Taxa de juros
    const numeroParcelas = parseInt(document.getElementById('parcelas').value);  // Número de parcelas

    // Verifica se todos os valores são válidos
    if (isNaN(valorFinanciado) || isNaN(taxaJuros) || isNaN(numeroParcelas)) {
        alert("Por favor, insira valores válidos!");  // Exibe alerta se os valores forem inválidos
        return;
    }

    // Calcula a parcela fixa utilizando a fórmula da Tabela Price
    const i = taxaJuros;
    const n = numeroParcelas;
    const parcela = (valorFinanciado * i) / (1 - Math.pow(1 + i, -n));

    // Exibe o valor da parcela
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `O valor da parcela será: <strong>R$ ${parcela.toFixed(2)}</strong>`;

    // Exibe o resultado
    resultadoDiv.style.display = 'block';  // Torna o resultado visível
}
