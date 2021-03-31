document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('ID DO BOTAO PARA ADICIONAR COMPORTAMENTO').addEventListener('click', novoComportamento);
    document.getElementById('ID DO BOTAO PARA ELIMINAR COMPORTAMENTO').addEventListener('click', eliminarComportamento);
    document.getElementById('ID DO BOTAO PARA ALTERAR COMPORTAMENTO').addEventListener('click', alterarComportamento);

    lerTabela();

});

function lerTabela() {

    $.ajax({

        url: 'https://localhost:5001/Comportamento/',
        type: 'GET',
        dataType: "json",
        success: function(dados) { apresentarTabela(dados); }

    })

}

function apresentarTabela(dados) {

    $('#ID DA TABELA tbody').empty();

    var colunaFinal = 'INSERIR AQUI <TD> COM OS BOTOES DE EDITAR E ELIMINAR';

    dados.forEach(dado => {

        var colunaNome = `<td>${dado.descricao}</td>`
        var colunaMerece = `<td><input type = 'checkbox' class = 'form-check-input' disabled ${dado.merecepresente ? 'checked' : ''}></td>`;
        $('#ID DA TABELA').append(`<tr data-id = ${dado.id}>${colunaNome}${colunaMerece}${colunaFinal}</tr>`);

    })

}

function novoComportamento() {

    var descricao = document.getElementById('ID DA TEXTBOX DA DESCRICAO NO MODAL PARA ADICIONAR');
    var merecepresente = document.getElementById('ID DA CHECKBOX DE PRESENTE NO MODAL PARA ADICIONAR');

    if (descricao.value == null) return alert('Por favor escreva uma descrição.');

    $.ajax({

        url: 'https://localhost:5001/Comportamento/',
        type: 'POST',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({ "descricao": descricao.value, "merecepresente": merecepresente.checked }),
        success: function() {

            $('#ID DO MODAL DE NOVO').modal('hide');
            readTable();

        }
    })

}

function abrirDelete(obj) {

    var idComportamento = obj.parentElement.parentElement.dataset.id;
    document.getElementById('ID DO MODAL DE ELIMINAR').dataset.idComportamento = idComportamento;

}

function abrirEditar(obj) {

    var idComportamento = obj.parentElement.parentElement.dataset.id;
    document.getElementById('ID DO MODAL DE EDITAR').dataset.idComportamento = idComportamento;

}

function eliminarComportamento() {

    var idComportamento = document.getElementById('ID DO MODAL DE ELIMINAR').dataset.idComportamento;
    var podeEliminar = true;

    $.ajax({

        url: `https://localhost:5001/Criancas`,
        type: 'GET',
        dataType: "json",
        async: false,
        success: function(dados) {

            dados.forEach(dado => { if (dado.comportamento == idComportamento) return podeEliminar = false; })

        }

    })

    if (!podeEliminar) return alert('Não foi possível eliminar este comportamento.');

    $.ajax({

        url: `https://localhost:5001/Comportamento/${idComportamento}`,
        type: 'DELETE',
        success: function() {

            $('#ID DO MODAL DE ELIMINAR').modal('hide');
            readTable();

        }
    })

}

function alterarComportamento() {

    var idComportamento = document.getElementById('ID DO MODAL DE EDITAR').dataset.idComportamento;

    descricao = $('#ID DA TEXTBOX DA DESCRICAO NO MODAL DE EDITAR').val();
    merece = $('#ID DA CHECKBOX DE PRESENTE NO MODAL DE EDITAR').prop('checked');

    $.ajax({

        url: `https://localhost:5001/Comportamento/${idComportamento}`,
        type: 'PUT',
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ "descricao": descricao, "merecepresente": merece }),
        success: function() {

            $('#ID DO MODAL DE EDITAR').modal('hide');
            readTable();

        }
    })

}