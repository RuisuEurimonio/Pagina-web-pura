urlReports = "/api/Reservation";

function reportDates() {

    start = $(".startDateReservationReport").val();
    end = $(".DevolutionDateReservationReport").val();

    if (start.length === 0) {
        alert("El campo de fecha inicial no puede estar vacio.");
        $(".startDateReservationReport").addClass("alert-validation");
        $(".exclamation1").removeAttr("hidden");
    } else if(end.length === 0) {
        alert("El campo de fecha final no puede estar vacio");
        $(".DevolutionDateReservationReport").addClass("alert-validation");
        $(".startDateReservationReport").removeClass("alert-validation");
        $(".exclamation2").removeAttr("hidden");
        $(".exclamation1").attr("hidden","");
    } else {
        $.ajax({
            url: urlReports + "/report-dates/" + start + "/" + end,
            type: "GET",
            dataType: "json",
            success: function(respuesta){
                console.log(respuesta);
                makeReportDates(respuesta);
                $(".bi1").addClass("button-selected");
                validationSuccess();
                if (respuesta.length === 0) {
                    $(".bi1").removeClass("button-selected");
                    validationSuccess();
                }
            },
            error: function(xhr, status) {
                alert("Ha sucedido un problema: "+status);
            },
            complete: function (xhr, status) {
                console.log(status);
            }
        })
    }
};

function makeReportDates(respuesta){

    console.log(respuesta);
    console.log(respuesta.length);

    if (respuesta.length > 0) {

        var tabla = `<table border="1" class="table table-dark table-striped tbl1">
                        <tr>
                            <th> ID. </<th>
                            <th> DATES </th>
                            <th> CLIENT </th>
                            <th> COMPUTER</th>
                            <th> STATUS </th>
                        </tr>`;

        for (var i = 0 ; i < respuesta.length ; i++){
            tabla += `<tr>
                        <td> ${respuesta[i].idReservation} </td>
                        <td> ${respuesta[i].startDate.substring(0,10)} - ${respuesta[i].devolutionDate.substring(0,10)} </td>
                        <td> ${respuesta[i].client.name} - ${respuesta[i].client.email} </td>
                        <td> ${respuesta[i].computer.name} </td>
                        <td> ${respuesta[i].status} </td>
                        </tr>`;
        }
        tabla += `</table>`;
        $("#tabla").html(tabla);

    } else {
        alert("No existen reservas entre el intervalo de fechas.");
        validationSuccess();
    }

}

function reportStatus(){

    $.ajax({
        url: urlReports + "/report-status",
        type: "GET",
        dataType: "json",
        success: function(respuesta){
            console.log(respuesta);
            makeReportStatus(respuesta);
            $(".bi2").addClass("button-selected")
        },
        error: function (xhr, status) {
            alert("Ha sucedido un error");
            alert(xhr, status);
        }
    })

}

function makeReportStatus(respuesta) {

    console.log(respuesta.cancelled)
    console.log(respuesta.completed)
    if (respuesta.cancelled === 0 && respuesta.completed === 0){
        alert("No hay reservas para mostrar"); 
        $(".bi2").removeClass("button-selected")
    }   else {var tabla = `<table border="1" class="table table-dark table-striped">
                        <tr>
                            <th> REPORT STATUS </th>
                        </tr>`
        
        tabla +=     `<tr>
                        <th> Completed: ${respuesta.completed} </th>
                      </tr>`;

        tabla += `<tr>
                    <th> Cancelled: ${respuesta.cancelled} </th>
                    </tr>`                      
        
        tabla += `</table>`;
        $("#tablaStatus").html(tabla);
    }
}

function reportClients(respuesta){

    $.ajax({
        url: urlReports + "/report-clients",
        type: "GET",
        dataType: "json",
        success:function(respuesta){
            console.log(respuesta);
            makeReportClients(respuesta);
            $(".bi3").addClass("button-selected")
        },
        error: function(xhr, status){
            console.log("Ha sucedido un error");
            console.log(xhr, status);
        }
    })

}

function makeReportClients(respuesta){
    if (respuesta.length > 0) {
        var tabla = `<table border="1" class="table table-dark table-striped tbl3">
                        <tr>
                            <td> NAME </td>
                            <td> EMAIL </td>
                            <td> MESSAGES </td>
                            <td> RESERVATION </td>
                            <td> TOTAL </td>
                        </tr>`

        for ( var i = 0 ; i < respuesta.length ; i++) {
            console.log(respuesta[i].client.messages)
            reservations = "";
            reservas = respuesta[i].client.reservations.length;
            for ( var a = 0 ; a < reservas ; a++){
                reservations += "ID: " + respuesta[i].client.reservations[a].idReservation + " - " + respuesta[i].client.reservations[a].status + `<br>`;
            }
            messages = "";
            mensajes = respuesta[i].client.messages.length
            for ( var e = 0 ; e < mensajes ; e++){
                messages += "Message" + respuesta[i].client.messages[e].messageText + "<br>";
            }
            tabla += `<tr>
                        <td> ${respuesta[i].client.name} </td>
                        <td> ${respuesta[i].client.email} </td>
                        <td> ${messages} </td>
                        <td> ${reservations} </td>
                        <td> ${respuesta[i].total} </td>`
        }
        tabla += `</table>`;
        $("#tablaClients").html(tabla);
    }else {
        alert("No existen clientes para mostrar");
        $(".bi3").removeClass("button-selected")
    }
}

function validationSuccess() {
    $(".startDateReservationReport").removeClass("alert-validation");
    $(".DevolutionDateReservationReport").removeClass("alert-validation");
    $(".exclamation1").attr("hidden","");
    $(".exclamation2").attr("hidden","");
}