document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('criarcria').addEventListener('click', novaCrianca);
    document.getElementById('apagarcria').addEventListener('click', eliminarCrianca);
    document.getElementById('editarcria').addEventListener('click', alterarCrianca);

    $.ajax({

        url: 'https://localhost:5001/Comportamento/',
        type: 'GET',
        dataType: "json",
        success: function(dados) {

            dados.forEach(dado => {

                $("#dropcompadd").append(new Option(dado.descricao, dado.id));
                $("#dropcompedit").append(new Option(dado.descricao, dado.id));

            })

        }

    })

    $.ajax({

        url: 'https://localhost:5001/Presentes/',
        type: 'GET',
        dataType: "json",
        success: function(dados) {

            dados.forEach(dado => {

                $("#dropresadd").append(new Option(dado.nome, dado.id));
                $("#dropresedit").append(new Option(dado.nome, dado.id));

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
    
                    url: `https://localhost:5001/Presentes/${dado.presente}`,
                    type: 'GET',
                    dataType: "json",
                    async: false,
                    success: function(obj) { presente = obj; }
            
                })

                criancas.push({ 
                    
                    id: dado.id,
                    nome: dado.nome,
                    idade: dado.idade,
                    presente: presente.nome,
                    comportamento: comportamento.descricao,
                    merece: comportamento.merecepresente

                });
                

            })

            apresentarTabela(criancas);

        }

    })

}

function apresentarTabela(dados) {

    $('#tabelacria tbody').empty();

    var colunaFinal = '<td><button type="button" class="btn btn-link" data-toggle="modal" data-target="#myModal2" onclick="abrirEditar(this)">Editar</button><br><button type="button" class="btn btn-link" data-toggle="modal" data-target="#myModal3" onclick="abrirDelete(this)">Apagar</button></td>';

    dados.forEach(dado => {

        var colunaNome = `<td>${dado.nome}</td>`;
        var colunaIdade = `<td>${dado.idade}</td>`;
        var colunaComportamento = `<td>${dado.comportamento}</td>`;
        var colunaPresente = `<td>${dado.presente}</td>`;
        var colunaMerece = `<td><input type = 'checkbox' class = 'form-check-input' disabled ${dado.merece ? 'checked' : ''}></td>`;
        $('#tabelacria').append(`<tr data-id = ${dado.id}>${colunaNome}${colunaIdade}${colunaPresente}${colunaComportamento}${colunaMerece}${colunaFinal}</tr>`);

    })

}

function novaCrianca() {

    var nome = document.getElementById('addnomecria');
    var idade = document.getElementById('addidadecria');
    var comportamento = document.getElementById('dropcompadd');
    var presente = document.getElementById('dropresadd');

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

            $('#myModal').modal('hide');
            lerTabela();

        }
    })

}

function abrirDelete(obj) {

    var idCrianca = obj.parentElement.parentElement.dataset.id;
    document.getElementById('myModal3').dataset.idCrianca = idCrianca;

}

function abrirEditar(obj) {

    var idCrianca = obj.parentElement.parentElement.dataset.id;
    document.getElementById('myModal2').dataset.idCrianca = idCrianca;

}

function eliminarCrianca() {

    var idCrianca = document.getElementById('myModal3').dataset.idCrianca;

    $.ajax({

        url: `https://localhost:5001/Criancas/${idCrianca}`,
        type: 'DELETE',
        success: function() {

            $('#myModal3').modal('hide');
            lerTabela();

        }
    })

}

function alterarCrianca() {

    var idCrianca = document.getElementById('myModal2').dataset.idCrianca;

    var nome = $('#editnomecria').val();
    var idade = document.getElementById('editidadecria');
    var comportamento = document.getElementById('dropcompedit');
    var presente = document.getElementById('dropresedit');

    $.ajax({

        url: `https://localhost:5001/Criancas/${idCrianca}`,
        type: 'PUT',
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ "nome": nome, "idade": parseInt(idade.value), "comportamento": parseInt(comportamento.value), "presente": parseInt(presente.value) }),
        success: function() {

            $('#myModal2').modal('hide');
            lerTabela();

        }
    })

}