var urlReservation = "api/Reservation";

$(document).ready(function () {
    console.log("document ready!");
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('id')) {
        let id = searchParams.get('id');
        consultReservationById(id);
    }
});

function consultReservationById(id) {
    $.ajax({
        url: urlReservation + "/" + id,
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            if (respuesta.idReservation > 0) {
                updateReservationForm(respuesta);
            } else {
                alert('No se encuentra la reserva con el id ' + id);
                window.location.href = "tienda.html";
            }
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
            window.location.href = "tienda.html";
        }
    });
}

function updateReservationForm(item) {
    $("#idReservation").val(item.idReservation);
    $("#startdateReservation").val(item.startDate.substring(0, 10));
    $("#devolutionDateReservation").val(item.devolutionDate.substring(0, 10));
    $("#statusSelect").val(item.status);
    $("#computerReservation").val(item.computer.id);
    $("#clientReservation").val(item.client.idClient);
    $("#scoreReservation").val(item.score);
}

function updateReservation() {

    console.log("ejecutando función para actualizar");
    var idReservation = +$("#idReservation").val();
    var starDate = $("#startdateReservation").val();
    var devolutionDate = $("#devolutionDateReservation").val();
    var status = $("#statusSelect").val();
    var computer_id = +$("#computerReservation").val();
    var client_id = +$("#clientReservation").val();
    var score = +$("#scoreReservation").val();

    if (score < 0 || score > 5) {
        alert("El valor de score debe ser entre 0 y 5");
    } else if (starDate > devolutionDate) {
        alert("La fecha inicial debe ser anterior a la de devolucion");
    } else {
        var Reservation = new Object();
        var computer = {id: computer_id};
        var client = {idClient: client_id};
        Reservation.idReservation = idReservation;
        Reservation.startDate = starDate;
        Reservation.devolutionDate = devolutionDate;
        Reservation.status = status;
        Reservation.computer = computer;
        Reservation.client = client;
        Reservation.score = score;

        $.ajax({
            url: urlReservation + "/update",
            type: 'PUT',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(Reservation),
            statusCode: {
                201: function () {
                    alert('Se ha actualizado el mensaje');
                    console.log(Reservation);
                    window.location.href = "tienda.html";
                },
                555: function () {
                    alert('Un error ocurrio, No se puede actualziar el mensaje');
                }
            }
        });
    }
}