document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('criarcomp').addEventListener('click', novoComportamento);
    document.getElementById('apagarcomp').addEventListener('click', eliminarComportamento);
    document.getElementById('editarcomp').addEventListener('click', alterarComportamento);

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

    $('#tabelacomp tbody').empty();

    var colunaFinal = '<td><button type="button" class="btn btn-link" data-toggle="modal" data-target="#myModal2" onclick="abrirEditar(this)">Editar</button><br><button id="delecomp" type="button" class="btn btn-link" data-toggle="modal" data-target="#myModal3" onclick="abrirDelete(this)">Apagar</button></td>';

    dados.forEach(dado => {

        var colunaNome = `<td>${dado.descricao}</td>`
        var colunaMerece = `<td><input type = 'checkbox' class = 'form-check-input' disabled ${dado.merecepresente ? 'checked' : ''}></td>`;
        $('#tabelacomp').append(`<tr data-id = ${dado.id}>${colunaNome}${colunaMerece}${colunaFinal}</tr>`);

    })

}

function novoComportamento() {

    var descricao = document.getElementById('addcomp');
    var merecepresente = document.getElementById('checkpresente');

    if (descricao.value == null) return alert('Por favor escreva uma descrição.');

    $.ajax({

        url: 'https://localhost:5001/Comportamento/',
        type: 'POST',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({ "descricao": descricao.value, "merecepresente": merecepresente.checked }),
        success: function() {

            $('#myModal').modal('hide');
            lerTabela();

        }
    })

}

function abrirDelete(obj) {

    var idComportamento = obj.parentElement.parentElement.dataset.id;
    document.getElementById('myModal3').dataset.idComportamento = idComportamento;

}

function abrirEditar(obj) {

    var idComportamento = obj.parentElement.parentElement.dataset.id;
    document.getElementById('myModal2').dataset.idComportamento = idComportamento;

}

function eliminarComportamento() {

    var idComportamento = document.getElementById('myModal3').dataset.idComportamento;
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

            $('#myModal3').modal('hide');
            lerTabela();

        }
    })

}

function alterarComportamento() {

    var idComportamento = document.getElementById('myModal2').dataset.idComportamento;

    descricao = $('#edittextbox').val();
    merece = $('#editche').prop('checked');

    $.ajax({

        url: `https://localhost:5001/Comportamento/${idComportamento}`,
        type: 'PUT',
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ "descricao": descricao, "merecepresente": merece }),
        success: function() {

            $('#myModal2').modal('hide');
            lerTabela();

        }
    })

}