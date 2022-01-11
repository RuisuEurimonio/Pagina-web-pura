var urlClient = "/api/Client";

function consultClient() {

    $.ajax({
        url: urlClient + "/all",
        type: 'GET',
        dataType: 'JSON',
        success: function (respuesta) {
            console.log(respuesta);
            makeTableClient(respuesta);
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema' + status);
        },
        complete: function (xhr, status) {
            console.log(status);
        }
    });
}

function makeTableClient(respuesta) {
    if (respuesta.length > 0) {
        var tabla = `<table border="1" class="table table-dark table-striped">
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>AGE</th>
          <th>MESSAGE</th>
          <th>RESERVATIONS</th>
          <th>ACCIONES</th>
        </tr>`;

        for (var i = 0; i < respuesta.length; i++) {
            var messages = "";
            var reservations = "";
            var reservaciones = respuesta[i].reservations.length;
            var mensajes = respuesta[i].messages.length;
            if (mensajes > 0 && reservaciones > 0) {
                for (var a = 0; a < reservaciones; a++) {
                    reservations += respuesta[i].reservations[a].idReservation + " - " + respuesta[i].reservations[a].computer.name + "<br>" + respuesta[i].reservations[a].startDate.substring(0, 10) + " - " + respuesta[i].reservations[a].devolutionDate.substring(0, 10) + `<br>` + respuesta[i].reservations[a].status + `<br> <br>`;
                }
                ;
                for (var o = 0; o < mensajes; o++) {
                    messages += respuesta[i].messages[o].idMessage + ": " + respuesta[i].messages[o].messageText + `<br> <br>`;
                }
                ;
                tabla += `<tr>
                <td>${respuesta[i].idClient}</td>
                <td>${respuesta[i].name}</td>
                <td>${respuesta[i].email}</td>
                <td>${respuesta[i].age}</td>
                <td id="messagesClient${respuesta[i].idClient}" value="Con mensajes   "> ${messages} </td>
                <td id="reservationsClient${respuesta[i].idClient}" value="Con reservas   "> ${reservations} </td>
                <td>
                    <button class="btn btn-danger" onclick="deleteClientById(${respuesta[i].idClient})">Eliminar</button>
                    <a href="detalleClient.html?id=${respuesta[i].idClient}">
                        <button class="btn btn-info" type="submit"> Editar </button>
                    </a>
                </td> 
                </tr>`;
            } else if (mensajes > 0) {
                for (var o = 0; o < mensajes; o++) {
                    messages += respuesta[i].messages[o].idMessage + ": " + respuesta[i].messages[o].messageText + `<br> <br>`;
                };
                tabla += `<tr>
                <td>${respuesta[i].idClient}</td>
                <td>${respuesta[i].name}</td>
                <td>${respuesta[i].email}</td>
                <td>${respuesta[i].age}</td>
                <td id="messagesClient${respuesta[i].idClient}" value="Con mensajes   "> ${messages} </td>
                <td id="reservationsClient${respuesta[i].idClient}" value="Sin reservas"> Sin reservas. </td>
                <td>
                    <button class="btn btn-danger" onclick="deleteClientById(${respuesta[i].idClient})">Eliminar</button>
                    <a href="detalleClient.html?id=${respuesta[i].idClient}">
                        <button class="btn btn-info" type="submit"> Editar </button>
                    </a>
                </td> 
                </tr>`;
            } else if (reservaciones > 0) {
                for (var a = 0; a < reservaciones; a++) {
                    reservations += respuesta[i].reservations[a].idReservation + " - " + respuesta[i].reservations[a].computer.name + "<br>" + respuesta[i].reservations[a].startDate.substring(0, 10) + " - " + respuesta[i].reservations[a].devolutionDate.substring(0, 10) + `<br>` + respuesta[i].reservations[a].status + `<br> <br>`;
                }
                ;
                tabla += `<tr>
                <td>${respuesta[i].idClient}</td>
                <td>${respuesta[i].name}</td>
                <td>${respuesta[i].email}</td>
                <td>${respuesta[i].age}</td>
                <td id="messagesClient${respuesta[i].idClient}" value="Sin mensajes"> Sin mensajes. </td>
                <td id="reservationsClient${respuesta[i].idClient}" value="Con reservas  "> ${reservations} </td>
                <td>
                    <button class="btn btn-danger" onclick="deleteClientById(${respuesta[i].idClient})">Eliminar</button>
                    <a href="detalleClient.html?id=${respuesta[i].idClient}">
                        <button class="btn btn-info" type="submit"> Editar </button>
                    </a>
                </td> 
                </tr>`;
            } else {
                tabla += `<tr>
                <td>${respuesta[i].idClient}</td>
                <td>${respuesta[i].name}</td>
                <td>${respuesta[i].email}</td>
                <td>${respuesta[i].age}</td>
                <td id="messagesClient${respuesta[i].idClient}" value="Sin mensajes"> Sin mensajes. </td>
                <td id="reservationsClient${respuesta[i].idClient}" value="Con reservas  "> Sin reservas. </td>
                <td>
                    <button class="btn btn-danger" onclick="deleteClientById(${respuesta[i].idClient})">Eliminar</button>
                    <a href="detalleClient.html?id=${respuesta[i].idClient}">
                        <button class="btn btn-info" type="submit"> Editar </button>
                    </a>
                </td> 
                </tr>`;
            }
        }
        tabla += `</table>`;
        $("#clientTable").html(tabla);
    } else {
        alert("No existen clientes para mostrar");
    }
}

function saveClient() {
    var name = $("#name").val();
    var email = $("#email").val();
    var age = +$("#age").val();
    var password = $("#pasword_client").val();

    if (name.length === 0 || email.length === 0 || age === 0 || password === 0) {
        alert("No se puede guardar el cliente, tiene campos vacios");
    } else {
        var client = new Object();
        client.name = name;
        client.email = email;
        client.age = age;
        client.password = password;
        var jsonclient = JSON.stringify(client);
        console.log(client);
        $.ajax({
            url: urlClient + "/save",
            type: 'POST',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data: jsonclient,
            statusCode: {
                201: function () {
                    alert('Se ha guardado el cliente');
                    consultClient();
                    optionsClient();
                    optionsClientReservation();
                    limpiarCliente();
                },
                555: function () {
                    alert('Un error ocurrio, No se puede guardar el cliente');
                }
            }
        });

    }
}

function deleteClientById(id) {

    messageValidates = $("#messagesClient" + id).text();
    reservationsValidates = $("#reservationsClient" + id).text();

    if (messageValidates.length === 15 && reservationsValidates.length === 15) {
        var client = new Object();
        client.id = id;

        $.ajax({
            url: urlClient + "/" + id,
            type: 'DELETE',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(client),
            statusCode: {
                204: function () {
                    alert('Se ha eliminado el cliente con id: ' + id);
                    window.location.href = "tienda.html";
                }
            }
        });
    } else if (messageValidates.length === 15) {
        alert("Tiene reservaciones relacionados");
    } else if (reservationsValidates.length === 15) {
        alert("Tiene mensajes relacionados");
    } else {
        alert("Tiene mensajes y reservaciones relacionados.");
    }
}


function limpiarCliente() {
    $("#name").val("");
    $("#email").val("");
    $("#age").val("");
    $("#pasword_client").val("");
}

function visibilityClients(){
    $(".client").toggle();
    $("#showClients").toggleClass("activeBtn");
}
