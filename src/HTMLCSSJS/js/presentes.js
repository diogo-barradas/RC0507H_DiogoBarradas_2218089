document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('ID DO BOTAO PARA ADICIONAR PRESENTE').addEventListener('click', novoPresente);
    document.getElementById('ID DO BOTAO PARA ELIMINAR PRESENTE').addEventListener('click', eliminarPresente);
    document.getElementById('ID DO BOTAO PARA ALTERAR PRESENTE').addEventListener('click', alterarPresente);

    lerTabela();

});

function lerTabela() {

    $.ajax({

        url: 'https://localhost:5001/Presente/',
        type: 'GET',
        dataType: "json",
        success: function(dados) { apresentarTabela(dados); }

    })

}

function apresentarTabela(dados) {

    $('#ID DA TABELA tbody').empty();

    var colunaFinal = 'INSERIR AQUI <TD> COM OS BOTOES DE EDITAR E ELIMINAR';

    dados.forEach(dado => {

        var colunaNome = `<td>${dado.nome}</td>`
        var colunaQuantidade = `<td>${dado.quantidade}</td>`
        $('#ID DA TABELA').append(`<tr data-id = ${dado.id}>${colunaNome}${colunaQuantidade}${colunaFinal}</tr>`);

    })

}

function novoPresente() {

    var descricao = document.getElementById('ID DA TEXTBOX DA DESCRICAO NO MODAL PARA ADICIONAR');
    var quantidade = document.getElementById('ID DA TEXTBOX DA QUANTIDADE NO MODAL PARA ADICIONAR');

    if (descricao.value == null) return alert('Por favor escreva uma descrição.');
    if (quantidade.value == null) return alert('Por favor defina uma quantidade.');

    $.ajax({

        url: 'https://localhost:5001/Presente/',
        type: 'POST',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({ "nome": descricao.value, "quantidade": quantidade.value }),
        success: function() {

            $('#ID DO MODAL DE NOVO').modal('hide');
            readTable();

        }
    })

}

function abrirDelete(obj) {

    var idPresente = obj.parentElement.parentElement.dataset.id;
    document.getElementById('ID DO MODAL DE ELIMINAR').dataset.idPresente = idPresente;

}

function abrirEditar(obj) {

    var idPresente = obj.parentElement.parentElement.dataset.id;
    document.getElementById('ID DO MODAL DE EDITAR').dataset.idPresente = idPresente;

}

function eliminarPresente() {

    var idPresente = document.getElementById('ID DO MODAL DE ELIMINAR').dataset.idPresente;
    var podeEliminar = true;

    $.ajax({

        url: `https://localhost:5001/Criancas`,
        type: 'GET',
        dataType: "json",
        async: false,
        success: function(dados) {

            dados.forEach(dado => { if (dado.presente == idPresente) return podeEliminar = false; })

        }

    })

    if (!podeEliminar) return alert('Não foi possível eliminar este presente.');

    $.ajax({

        url: `https://localhost:5001/Presente/${idPresente}`,
        type: 'DELETE',
        success: function() {

            $('#ID DO MODAL DE ELIMINAR').modal('hide');
            readTable();

        }
    })

}

function alterarPresente() {

    var idPresente = document.getElementById('ID DO MODAL DE EDITAR').dataset.idPresente;

    descricao = $('#ID DA TEXTBOX DA DESCRICAO NO MODAL DE EDITAR').val();
    quantidade = $('#ID DA EXTBOX DA QUANTIDADE NO MODAL DE EDITAR').prop('checked');

    $.ajax({

        url: `https://localhost:5001/Presente/${idPresente}`,
        type: 'PUT',
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ "descricao": descricao, "quantidade": quantidade }),
        success: function() {

            $('#ID DO MODAL DE EDITAR').modal('hide');
            readTable();

        }
    })

}