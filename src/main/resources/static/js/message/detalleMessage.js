var urlMessage = "api/Message";

$(document).ready(function () {
    console.log("document ready!");
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('id')) {
        let id = searchParams.get('id');
        consultMessageById(id);
    }
});

function consultMessageById(id) {
    $.ajax({
        url: urlMessage + "/" + id,
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            if (respuesta.idMessage > 0) {
                updateMessageForm(respuesta);
            } else {
                alert('No se encuentra el mensaje con el id ' + id);
                window.location.href = "tienda.html";
            }
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
            window.location.href = "tienda.html";
        }
    });
}

function updateMessageForm(item) {
    $("#id").val(item.idMessage);
    $("#messageText").val(item.messageText);
    $("#computer").val(item.computer.id);
    $("#client").val(item.client.idClient);
}

function updateMessage() {

    console.log("ejecutando función para actualizar");
    var idMessage = +$("#id").val();
    var messageText = $("#messageText").val();
    var computer_id = +$("#computer").val();
    var client_id = +$("#client").val();

    if (messageText.length === 0) {
        alert("No se puede actualizar el mensaje, tiene campos vacios");
    } else {
        var message = new Object();
        var computer = {id: computer_id};
        var client = {idClient: client_id};
        message.idMessage = idMessage;
        message.messageText = messageText;
        message.computer = computer;
        message.client = client;

        $.ajax({
            url: urlMessage + "/update",
            type: 'PUT',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(message),
            statusCode: {
                201: function () {
                    alert('Se ha actualizado el mensaje');
                    console.log(message);
                    window.location.href = "tienda.html";
                },
                555: function () {
                    alert('Un error ocurrio, No se puede actualziar el mensaje');
                }
            }
        });
    }
}