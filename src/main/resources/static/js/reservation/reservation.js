urlReservation = "/api/Reservation";
urlComputer = "/api/Computer";
urlClient = "/api/Client";

function consultReservation() {

    $.ajax({
        url: urlReservation + "/all",
        type: "GET",
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            makeTableReservation(respuesta);
        },
        error: function (xhr, status) {
            alert("Ha sucedido un problema: " + status);
        },
        complete: function (xhr, status) {
            console.log(status);
        }
    });
}

var optionsComputerReservation = function () {

    $.ajax({
        url: urlComputer + "/all",
        type: "GET",
        dataType: 'json',
        success: function (respuesta) {
            let option = `<select id="reservationClientOption" required>`;
            for (var i = 0; i < respuesta.length; i++) {
                option += `<option value="${respuesta[i].id}"> ${respuesta[i].name} </option>`;
            }
            option += `</select>`;
            $("#reservationComputerOptions").html(option);
        },
        error: function (xhr, status) {
            alert("Ha sucedido un problema: " + status);
        }
    });

};

var optionsClientReservation = function () {

    $.ajax({
        url: urlClient + "/all",
        type: "GET",
        dataType: 'json',
        success: function (respuesta) {
            let option = `<select id="reservationClientOption" required>`;
            for (var i = 0; i < respuesta.length; i++) {
                option += `<option value="${respuesta[i].idClient}"> ${respuesta[i].name} </option>`;
            }
            option += `</select>`;
            $("#reservationClientOption").html(option);
        },
        error: function (xhr, status) {
            alert("Ha sucedido un problema: " + status);
        }
    });

};

function makeTableReservation(respuesta) {
    if (respuesta.length > 0) {
        var tabla = `<table border="1" class="table table-dark table-striped">
                        <tr>
                            <th> ID </th>
                            <th> DATES </th>
                            <th> STATUS </th>
                            <th> COMPUTER </th>
                            <th> CLIENT </th>
                            <th> SCORE </th>
                            <th> ACCIONES </th>
                        </tr>`;


        for (var i = 0; i < respuesta.length; i++) {
            tabla += `<tr>
                        <td> ${respuesta[i].idReservation} </td>
                        <td> Fecha inicial: ${respuesta[i].startDate.substring(0, 10)} <br> Fecha de devolución: ${respuesta[i].devolutionDate.substring(0, 10)} </td>
                        <td> ${respuesta[i].status} </td>
                        <td> ${respuesta[i].computer["name"]} </td>
                        <td> ID: ${respuesta[i].client["idClient"]} - Name: ${respuesta[i].client["name"]} <br> Email: ${respuesta[i].client["email"]} </td>
                        <td> ${respuesta[i].score} </td>

                        <td>
                            <button class="btn btn-danger" onclick="deleteReservationById(${respuesta[i].idReservation})">Eliminar</button>
                            <a href="detalleReservation.html?id=${respuesta[i].idReservation}">
                                <button class="btn btn-info" type="submit"> Editar </button>
                            </a>
                        </td>
                        </tr>`;

        }
        tabla += `</table>`;
        $("#reservationTable").html(tabla);
    } else {
        alert("No existen reservas para mostrar");
    }
}

function saveReservation() {

    var start = $("#startDateReservation").val();
    var devolution = $("#DevolutionDateReservation").val();
    var computer_id = document.querySelector("#reservationComputerOptions").value;
    var client_id = document.querySelector("#reservationClientOption").value;
    var status = "created";
    var score = $("#scoreReservation").val();

    if (start.length === 0 || devolution.length === 0 || status.length === 0 || score.length === 0 || computer_id.length === 0 || client_id.length === 0) {
        alert("No se puede guardar la reserva, tiene campos vacios");
    } else if (score < 0 || score > 5) {
        alert("El score debe ser un numero entre 0 y 5");
    } else {
        var admin = new Object();
        var computer = {id: computer_id};
        var client = {idClient: client_id};
        admin.startDate = start;
        admin.devolutionDate = devolution;
        admin.computer = computer;
        admin.client = client;
        admin.status = status;
        admin.score = score;
        var jsonadmin = JSON.stringify(admin);
        console.log(admin);

        $.ajax({
            url: urlReservation + "/save",
            type: 'POST',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data: jsonadmin,
            statusCode: {
                201: function () {
                    alert('Se ha guardado la reserva');
                    consultReservation();
                    consultComputer();
                    consultClient();
                },
                555: function () {
                    alert('Un error ocurrio, No se puede guardar la reserva');
                }

            }
        });
    }
}

$(document).ready(function () {
    optionsComputerReservation();
    optionsClientReservation();
})

function deleteReservationById(id) {
    console.log(id);

    var reservation = new Object();
    reservation.idReservation = id;

    $.ajax({
        url: urlReservation + "/" + id,
        type: "DELETE",
        dataType: "json",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(reservation),
        statusCode: {
            204: function () {
                alert("Se ha eliminado la reservacion con el id: " + id)
                window.location.href = "tienda.html";
            }
        }
    })
}

function visibilityReservations() {
    $(".reservation").toggle();
    $("#showReservations").toggleClass("activeBtn")
}