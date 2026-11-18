
const nomeFuncionario = document.getElementById("nomeFuncionario");
const cpf = document.getElementById("cpf");
const dataNasc = document.getElementById("dataNasc");
const salario = document.getElementById("salario");
const funcao = document.getElementById("funcao");
const situacao = document.getElementById("situacao");

const array_funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];

function salvar_funcionarios() {
    localStorage.setItem("funcionarios", JSON.stringify(array_funcionarios));
}

function limpar_campos() {
    if (nomeFuncionario) nomeFuncionario.value = "";
    if (cpf) cpf.value = "";
    if (dataNasc) dataNasc.value = "";
    if (salario) salario.value = "";
    if (funcao) funcao.value = "";
    if (situacao) situacao.value = "";
    if (salarioNovo) salarioNovo.value = "";
}

function cadastrar_funcionario() {
    const nome = nomeFuncionario.value.trim();
    const cpfInformado = cpf.value.replace(/\D/g, "");
    const data = dataNasc.value;
    const valorSalario = Number(salario.value);
    const funcaoInformada = funcao.value.trim();
    if (!nome || !cpfInformado || !data || !salario.value.trim() || !funcaoInformada) {
        alert("Preencha todos os campos!");
        return;
    }
    if (cpfInformado.length !== 11) {
        alert("Informe um CPF com 11 dígitos!");
        return;
    }
    const cpfExistente = array_funcionarios.find(funcionario => {
        return funcionario.cpf.replace(/\D/g, "") === cpfInformado;
    });
    if (cpfExistente) {
        alert("Este CPF já está cadastrado!");
        return;
    }
    if (!Number(valorSalario) || valorSalario <= 0) {
        alert("Informe um salário numérico e positivo!");
        return;
    }
    const novoFuncionario = {
        nome: nome,
        cpf: cpfInformado,
        data: data,
        salario: valorSalario,
        funcao: funcaoInformada,
        situacao: "Ativo"
    };
    array_funcionarios.push(novoFuncionario);
    salvar_funcionarios();
    alert("Funcionário " + nome + " foi cadastrado com sucesso!");
    limpar_campos();
}

const comboFuncionario = document.getElementById("comboFuncionario");

function buscar_funcionario() {
    if (!comboFuncionario) return;
    comboFuncionario.innerHTML = '<option value="">Selecione um funcionário</option>';
    array_funcionarios.forEach(funcionario => {
        const func = document.createElement("option");
        func.value = funcionario.cpf;
        func.textContent = funcionario.nome + " - " + funcionario.situacao;
        comboFuncionario.appendChild(func);
    });
}

function pegar_funcionario() {
    if (!comboFuncionario || !comboFuncionario.value) {
        return undefined;
    }
    const cpfSelecionado = comboFuncionario.value;
    const funcionarioEncontrado = array_funcionarios.find(funcionario => {
        return funcionario.cpf === cpfSelecionado;
    });
    return funcionarioEncontrado;
}

const listar_cpf = document.getElementById("listar_cpf");
const listar_dataNasc = document.getElementById("listar_dataNasc");
const listar_salario = document.getElementById("listar_salario");
const listar_funcao = document.getElementById("listar_funcao");
const listar_situacao = document.getElementById("listar_situacao");

function listar_funcionario() {
    const funcionario = pegar_funcionario();
    if (!funcionario) {
        alert("Selecione um funcionário!");
        return;
    }
    if (listar_cpf) listar_cpf.value = funcionario.cpf;
    if (listar_dataNasc) listar_dataNasc.value = funcionario.data;
    if (listar_salario) listar_salario.value = funcionario.salario;
    if (listar_funcao) listar_funcao.value = funcionario.funcao;
    if (listar_situacao) listar_situacao.value = funcionario.situacao;
}

const salarioNovo = document.getElementById("salarioNovo");

function atualizar_salario() {

    const funcionario = pegar_funcionario();
    if (!funcionario) {
        alert("Selecione um funcionário!");
        return;
    }
    if (funcionario.situacao === "Demitido") {
        alert("Não é possível alterar o salário de um funcionário demitido!");
        return;
    }
    if (!salarioNovo || !salarioNovo.value.trim()) {
        alert("Informe o novo salário!");
        return;
    }
    const novoSalario = Number(salarioNovo.value);
    if (!Number.isFinite(novoSalario) || novoSalario <= 0) {
        alert("Informe um salário numérico e positivo!");
        return;
    }
    if (novoSalario < Number(funcionario.salario)) {
        alert("O novo salário não pode ser inferior ao salário atual!");
        return;
    }
    funcionario.salario = novoSalario;
    salvar_funcionarios();
    alert("Salário do funcionário " + funcionario.nome + " atualizado com sucesso!");
    limpar_campos();
}

function atualizar_situacao() {
    const funcionario = pegar_funcionario();
    if (!funcionario) {
        alert("Selecione um funcionário!");
        return;
    }
    if (funcionario.situacao === "Demitido") {
        alert("Este funcionário já foi demitido!");
        return;
    }
    funcionario.situacao = "Demitido";
    salvar_funcionarios();
    alert("Funcionário " + funcionario.nome + " foi demitido com sucesso!");
    buscar_funcionario();
    limpar_campos();
}
buscar_funcionario();