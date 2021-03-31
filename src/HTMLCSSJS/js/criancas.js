document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('ID DO BOTAO PARA ADICIONAR CRIANCA').addEventListener('click', novaCrianca);
    document.getElementById('ID DO BOTAO PARA ELIMINAR CRIANCA').addEventListener('click', eliminarCrianca);
    document.getElementById('ID DO BOTAO PARA ALTERAR CRIANCA').addEventListener('click', alterarCrianca);

    $.ajax({

        url: 'https://localhost:5001/Comportamento/',
        type: 'GET',
        dataType: "json",
        success: function(dados) {

            dados.forEach(dado => {

                $("#ID DO DROPDOWN DE COMPORTAMENTOS NO MODAL DE ADICIONAR").append(new Option(dado.descricao, dado.id));
                $("#ID DO DROPDOWN DE COMPORTAMENTOS NO MODAL DE EDITAR").append(new Option(dado.descricao, dado.id));

            })

        }

    })

    $.ajax({

        url: 'https://localhost:5001/Presente/',
        type: 'GET',
        dataType: "json",
        success: function(dados) {

            dados.forEach(dado => {

                $("#ID DO DROPDOWN DE PRESENTES NO MODAL DE ADICIONAR").append(new Option(dado.nome, dado.id));
                $("#ID DO DROPDOWN DE PRESENTES NO MODAL DE EDITAR").append(new Option(dado.nome, dado.id));

            })

        }

    })

    lerTabela();

});

function lerTabela() {

    var comportamento;
    var presente;
    var criancas = [];

    $.ajax({

        url: 'https://localhost:5001/Criancas/',
        type: 'GET',
        dataType: "json",
        async: false,
        success: function(dados) {

            dados.forEach(dado => {

                $.ajax({

                    url: `https://localhost:5001/Comportamento/${dado.comportamento}`,
                    type: 'GET',
                    dataType: "json",
                    async: false,
                    success: function(obj) { comportamento = obj; }
            
                })
    
                $.ajax({
    
                    url: `https://localhost:5001/Presente/${dado.presente}`,
                    type: 'GET',
                    dataType: "json",
                    async: false,
                    success: function(obj) { presente = obj; }
            
                })

                criancas.push({ 
                    
                    id: dado.id,
                    nome: dado.nome,
                    idade: dado.idade,
                    comportamento: comportamento.descricao,
                    presente: presente.nome,
                    merece: comportamento.merecepresente

                });
                

            })

            apresentarTabela(criancas);

        }

    })

}

function apresentarTabela(dados) {

    $('#ID DA TABELA tbody').empty();

    var colunaFinal = 'INSERIR AQUI <TD> COM OS BOTOES DE EDITAR E ELIMINAR';

    dados.forEach(dado => {

        var colunaNome = `<td>${dado.nome}</td>`;
        var colunaIdade = `<td>${dado.idade}</td>`;
        var colunaComportamento = `<td>${dado.comportamento}</td>`;
        var colunaPresente = `<td>${dado.presente}</td>`;
        var colunaMerece = `<td><input type = 'checkbox' class = 'form-check-input' disabled ${dado.merece ? 'checked' : ''}></td>`;
        $('#ID DA TABELA').append(`<tr data-id = ${dado.id}>${colunaNome}${colunaIdade}${colunaComportamento}${colunaPresente}${colunaMerece}${colunaFinal}</tr>`);

    })

}

function novaCrianca() {

    var nome = document.getElementById('ID DA TEXTBOX DO NOME NO MODAL PARA ADICIONAR');
    var idade = document.getElementById('ID DA TEXTBOX DA IDADE NO MODAL PARA ADICIONAR');
    var comportamento = document.getElementById('ID DO DROPDOWN DO COMPORTAMENTO NO MODAL PARA ADICIONAR');
    var presente = document.getElementById('ID DO DROPDOWN DO PRESENTE NO MODAL PARA ADICIONAR');

    if (nome.value == null) return alert('Por favor escreva um nome.');
    if (idade.value == null) return alert('Por favor defina uma idade.');
    if (comportamento.value == null) return alert('Por favor escolha um comportamento.');
    if (presente.value == null) return alert('Por favor escolha um presente.');

    $.ajax({

        url: 'https://localhost:5001/Criancas/',
        type: 'POST',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({ "nome": nome.value, "idade": parseInt(idade.value), "comportamento": parseInt(comportamento.value), "presente": parseInt(presente.value) }),
        success: function() {

            $('#ID DO MODAL DE NOVO').modal('hide');
            readTable();

        }
    })

}

function abrirDelete(obj) {

    var idCrianca = obj.parentElement.parentElement.dataset.id;
    document.getElementById('ID DO MODAL DE ELIMINAR').dataset.idCrianca = idCrianca;

}

function abrirEditar(obj) {

    var idCrianca = obj.parentElement.parentElement.dataset.id;
    document.getElementById('ID DO MODAL DE EDITAR').dataset.idCrianca = idCrianca;

}

function eliminarCrianca() {

    var idCrianca = document.getElementById('ID DO MODAL DE ELIMINAR').dataset.idCrianca;

    $.ajax({

        url: `https://localhost:5001/Comportamento/${idCrianca}`,
        type: 'DELETE',
        success: function() {

            $('#ID DO MODAL DE ELIMINAR').modal('hide');
            readTable();

        }
    })

}

function alterarCrianca() {

    var idCrianca = document.getElementById('ID DO MODAL DE EDITAR').dataset.idCrianca;

    var nome = $('#ID DA TEXTBOX DE NOME NO MODAL DE EDITAR').val();
    var idade = $('#ID DA TEXTBOX DE IDADE NO MODAL DE EDITAR').val();
    var comportamento = $('#ID DA SELECAO DE COMPORTAMENTO NO MODAL DE EDITAR').val();
    var presente = $('#ID DA SELECAO DE PRESENTE NO MODAL DE EDITAR').val();

    $.ajax({

        url: `https://localhost:5001/Criancas/${idCrianca}`,
        type: 'PUT',
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ "nome": nome, "idade": idade, "comportamento": comportamento, "presente": presente }),
        success: function() {

            $('#ID DO MODAL DE EDITAR').modal('hide');
            readTable();

        }
    })

}