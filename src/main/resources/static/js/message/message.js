var urlMessage = "/api/Message";
var urlComputer = "/api/Computer";
var urlClient = "/api/Client";

var consultMessage = function () {

    $.ajax({
        url: urlMessage + "/all",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            makeTableMessage(respuesta);
            prueba = respuesta;
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });

};

var optionsComputer = function () {

    $.ajax({
        url: urlComputer + "/all",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            let options = `<select id="messageComputerOptions" required>`;
            for (let i = 0; i < respuesta.length; i++) {
                options += `<option value="${respuesta[i].id}"> ${respuesta[i].name} </option>`;
            }
            options += `</select>`;
            $("#messageComputerOptions").html(options);
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });

};

var optionsClient = function () {

    $.ajax({
        url: urlClient + "/all",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            let options = `<select id="messageClientOptions" required>`;
            for (let i = 0; i < respuesta.length; i++) {
                options += `<option value="${respuesta[i].idClient}"> ${respuesta[i].name} </option>`;
            }
            options += `</select>`;
            $("#messageClientOption").html(options);
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });

};

function makeTableMessage(respuesta) {
    if (respuesta.length > 0) {
        var tabla = `<table border="1" class="table table-dark table-striped">
                    <tr>
                        <th>MESSAGETEXT</th>
                        <th>COMPUTER</th>
                        <th>CLIENT</th>
                        <th>ACCIONES</th>
                    </tr>`;

        for (var i = 0; i < respuesta.length; i++) {
            tabla += `<tr>
                    <td>${respuesta[i].messageText}</td>
                    <td>${respuesta[i].computer["name"]}</td>
                    <td>${respuesta[i].client["name"]}</td>
                    <td>
                            <button class="btn btn-danger" onclick="deleteMessageById(${respuesta[i].idMessage})">Eliminar</button>

                            <a href="detalleMessage.html?id=${respuesta[i].idMessage}">
                                <button class="btn btn-info" type="submit"> Editar </button>
                            </a>
                    </td> 
                    </tr>`;
        }
        tabla += `</table>`;
        $("#messagetable").html(tabla);
    } else {
        alert("No existen mensajes para mostrar");
    }
}

function saveMessage() {

    var messageText = $("#messageText").val();
    var computer_id = document.querySelector("#messageComputerOptions").value;
    var client_id = document.querySelector("#messageClientOption").value;

    if (messageText.length === 0 || computer_id.length === 0 || client_id === 0) {
        alert("No se puede guardar el mensaje, tiene campos vacios");
    } else {
        var message = new Object();
        var computer = {id: computer_id};
        var client = {idClient: client_id};
        message.messageText = messageText;
        message.computer = computer;
        message.client = client;

        var jsonmessage = JSON.stringify(message);
        console.log(message);
        $.ajax({
            url: urlMessage + "/save",
            type: 'POST',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data: jsonmessage,
            statusCode: {
                201: function () {
                    alert('Se ha guardado el mensaje');
                    consultMessage();
                    consultComputer();
                    consultClient();
                    $("#messageText").val("");
                },
                555: function () {
                    alert('Un error ocurrio, No se puede guardar el mensaje');
                }}
        });

    }
}

$(document).ready(function () {
    optionsComputer();
    optionsClient();
});

function deleteMessageById(id) {
    console.log(id);

    var message = new Object();
    message.idMessage = id;

    $.ajax({
        url: urlMessage + "/" + id,
        type: 'DELETE',
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(message),
        statusCode: {
            204: function () {
                alert('Se ha eliminado el mensaje con id: ' + id);
                window.location.href = "tienda.html";
            }
        }
    });
}

function visibilityMessages() {
    $(".message").toggle();
    $("#showMessages").toggleClass("activeBtn");
}