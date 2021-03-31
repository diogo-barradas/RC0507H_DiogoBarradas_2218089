document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('criarprenda').addEventListener('click', novoPresente);
    document.getElementById('deleprenda').addEventListener('click', eliminarPresente);
    document.getElementById('editprenda').addEventListener('click', alterarPresente);

    lerTabela();

});

function lerTabela() {

    $.ajax({

        url: 'https://localhost:5001/Presentes/',
        type: 'GET',
        dataType: "json",
        success: function(dados) { apresentarTabela(dados); }

    })

}

function apresentarTabela(dados) {

    $('#tabelaprenda tbody').empty();

    var colunaFinal = '<td><button type="button" class="btn btn-link" data-toggle="modal" data-target="#myModal2" onclick="abrirEditar(this)">Editar</button><br><button type="button" class="btn btn-link" data-toggle="modal" data-target="#myModal3" onclick="abrirDelete(this)">Apagar</button></td>';

    dados.forEach(dado => {

        var colunaNome = `<td>${dado.nome}</td>`
        var colunaQuantidade = `<td>${dado.quantidade}</td>`
        $('#tabelaprenda').append(`<tr data-id = ${dado.id}>${colunaNome}${colunaQuantidade}${colunaFinal}</tr>`);

    })

}

function novoPresente() {

    var descricao = document.getElementById('addnomeprenda');
    var quantidade = document.getElementById('addstockprenda');

    if (descricao.value == null) return alert('Por favor escreva uma descrição.');
    if (quantidade.value == null) return alert('Por favor defina uma quantidade.');

    $.ajax({

        url: 'https://localhost:5001/Presentes/',
        type: 'POST',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({ "nome": descricao.value, "quantidade": parseInt(quantidade.value) }),
        success: function() {

            $('#myModal').modal('hide');
            lerTabela();

        }
    })

}

function abrirDelete(obj) {

    var idPresente = obj.parentElement.parentElement.dataset.id;
    document.getElementById('myModal3').dataset.idPresente = idPresente;

}

function abrirEditar(obj) {

    var idPresente = obj.parentElement.parentElement.dataset.id;
    document.getElementById('myModal2').dataset.idPresente = idPresente;

}

function eliminarPresente() {

    var idPresente = document.getElementById('myModal3').dataset.idPresente;
    var podeEliminar = true;

    $.ajax({

        url: `https://localhost:5001/Criancas/`,
        type: 'GET',
        dataType: "json",
        async: false,
        success: function(dados) {
            dados.forEach(dado => { if (dado.presente == idPresente) return podeEliminar = false; })
        }

    })

    if (!podeEliminar) return alert('Não foi possível eliminar este presente.');

    $.ajax({

        url: `https://localhost:5001/Presentes/${idPresente}`,
        type: 'DELETE',
        success: function() {

            $('#myModal').modal('hide');
            lerTabela();

        }
    })

}

function alterarPresente() {

    var idPresente = document.getElementById('myModal2').dataset.idPresente;

    var descricao = $('#editnomeprenda').val();
    var quantidade = document.getElementById('editstockprenda');

    $.ajax({

        url: `https://localhost:5001/Presentes/${idPresente}`,
        type: 'PUT',
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ "nome": descricao, "quantidade": parseInt(quantidade.value) }),
        success: function() {

            $('#myModal2').modal('hide');
            lerTabela();

        }
    })

}