var urlComputer = "/api/Computer";
var urlCategory = "/api/Category";

function consultComputer() {

    $.ajax({
        url: urlComputer + "/all",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            makeTableComputer(respuesta);
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema: ' + xhr + " " + status);
        },
        complete: function (xhr, status) {
            console.log(status);
        }
    });
}

var optionsCategory = function (respuesta) {
    $.ajax({
        url: urlCategory + "/all",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            let options = `<select id="computerOptions" required>`;
            for (var i = 0; i < respuesta.length; i++) {
                options += `<option value="${respuesta[i].id}"> ${respuesta[i].name} </option>`;
            }
            options += `</select>`;
            $("#computerOptions").html(options);
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema: ' + xhr + " " + status);
        },
        complete: function (xhr, status) {
            console.log(status);
        }
    });
};

function makeTableComputer(respuesta) {
    if (respuesta.length > 0) {
        var tabla = `<table border="1" class="table table-dark table-striped">
                  <tr>
                    <th>BRAND</th>
                    <th>NAME</th>
                    <th>YEAR</th>
                    <th>DESCRIPTION</th>                
                    <th>CATEGORY</th>   
                    <th>MESSAGES</th>
                    <th>RESERVATIONS</th>
                    <th>ACCIONES</th>
                  </tr>`;

        for (var i = 0; i < respuesta.length; i++) {
            var messages = " ";
            var reservations = " ";
            var reservaciones = respuesta[i].reservations.length;
            var mensajes = respuesta[i].messages.length;
            if (mensajes > 0 && reservaciones > 0) {
                for (var a = 0; a < reservaciones; a++) {
                    reservations += respuesta[i].reservations[a].idReservation + ": " + respuesta[i].reservations[a].startDate.substring(0, 10) + " - " + respuesta[i].reservations[a].devolutionDate.substring(0, 10) + `<br>` + respuesta[i].reservations[a].status + `<br> <br>`;
                }
                for (var o = 0; o < mensajes; o++) {
                    messages += respuesta[i].messages[o].idMessage + ": " + respuesta[i].messages[o].messageText + `<br> <br>`;
                }
                tabla += `<tr>
                    <td>${respuesta[i].brand}</td>
                    <td>${respuesta[i].name}</td>
                    <td>${respuesta[i].year}</td>
                    <td>${respuesta[i].description}</td>
                    <td> ${respuesta[i].category["name"]} <br> category: ${respuesta[i].category["description"]}  </td>
                    <td id="messagesComputer${respuesta[i].id}" value="Con mensajes."> ${messages} </td>
                    <td id="reservationsComputer${respuesta[i].id}" value="Con reservas."> ${reservations} </td>
                    <td>
                            <button class="btn btn-danger" onclick="deleteComputerById(${respuesta[i].id})">Eliminar</button>
                            <a href="detalleComputer.html?id=${respuesta[i].id}">
                                <button class="btn btn-info" type="submit"> Editar </button>
                            </a>
                    </td> 
                    </tr>`;
            } else if (mensajes === 0 && reservaciones > 0) {
                for (var a = 0; a < reservaciones; a++) {
                    reservations += respuesta[i].reservations[a].idReservation + ": " + respuesta[i].reservations[a].startDate.substring(0, 10) + " - " + respuesta[i].reservations[a].devolutionDate.substring(0, 10) + `<br>` + respuesta[i].reservations[a].status + `<br> <br>`;
                }
                tabla += `<tr>
                <td>${respuesta[i].brand}</td>
                <td>${respuesta[i].name}</td>
                <td>${respuesta[i].year}</td>
                <td>${respuesta[i].description}</td>
                <td> ${respuesta[i].category["name"]} <br> category: ${respuesta[i].category["description"]}  </td>
                <td id="messagesComputer${respuesta[i].id}" value="Sin mensajes."> Sin mensajes. </td>
                <td id="reservationsComputer${respuesta[i].id}" value="Con reservas."> ${reservations} </td>
                <td>
                        <button class="btn btn-danger" onclick="deleteComputerById(${respuesta[i].id})">Eliminar</button>
                        <a href="detalleComputer.html?id=${respuesta[i].id}">
                            <button class="btn btn-info" type="submit"> Editar </button>
                        </a>
                </td> 
                </tr>`;
            } else if (mensajes > 0 && reservaciones === 0) {
                for (var o = 0; o < mensajes; o++) {
                    messages += respuesta[i].messages[o].idMessage + ": " + respuesta[i].messages[o].messageText + `<br> <br>`;
                }
                tabla += `<tr>
                    <td>${respuesta[i].brand}</td>
                    <td>${respuesta[i].name}</td>
                    <td>${respuesta[i].year}</td>
                    <td>${respuesta[i].description}</td>
                    <td > ${respuesta[i].category["name"]} <br> category: ${respuesta[i].category["description"]}  </td>
                    <td id="messagesComputer${respuesta[i].id}" value="Con mensajes."> ${messages} </td>
                    <td id="reservationsComputer${respuesta[i].id}" value="Sin reservas."> Sin reservaciones. </td>
                    <td>
                            <button class="btn btn-danger" onclick="deleteComputerById(${respuesta[i].id})">Eliminar</button>
                            <a href="detalleComputer.html?id=${respuesta[i].id}">
                                <button class="btn btn-info" type="submit"> Editar </button>
                            </a>
                    </td> 
                    </tr>`;
            } else {
                tabla += `<tr>
                    <td>${respuesta[i].brand}</td>
                    <td>${respuesta[i].name}</td>
                    <td>${respuesta[i].year}</td>
                    <td>${respuesta[i].description}</td>
                    <td> ${respuesta[i].category["name"]} <br> category: ${respuesta[i].category["description"]}  </td>
                    <td id="messagesComputer${respuesta[i].id}" value="Sin mensajes."> Sin mensajes. </td>
                    <td id="reservationsComputer${respuesta[i].id}" value="Sin reservas."> Sin reservaciones. </td>
                    <td>
                            <button class="btn btn-danger" onclick="deleteComputerById(${respuesta[i].id})">Eliminar</button>
                            <a href="detalleComputer.html?id=${respuesta[i].id}">
                                <button class="btn btn-info" type="submit"> Editar </button>
                            </a>
                    </td> 
                    </tr>`;
            }
        }
        tabla += `</table>`;
        $("#computerTable").html(tabla);
    } else {
        alert("No existen computadores para mostrar");
    }
}

function saveComputer() {

    var brand = $("#brand").val();
    var name = $("#name_computer").val();
    var year = +$("#year_computer").val();
    var description = $("#description_computer").val();
    var category_id = document.getElementById("computerOptions").value;

    if (brand.length === 0 || name.length === 0 || year.length === 0 || description.length === 0 || category_id.length === 0) {
        alert("No se puede guardar el computador, tiene campos vacios");
    } else {
        var computer = new Object();
        var category = {id: category_id};
        computer.brand = brand;
        computer.name = name;
        computer.year = year;
        computer.description = description;
        computer.category = category;

        $.ajax({
            url: urlComputer + "/save",
            type: 'POST',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(computer),
            statusCode: {
                201: function () {
                    alert('Se ha guardado el computador');
                    consultComputer();
                    consultCategory();
                    optionsClient();
                    optionsComputerReservation();
                    optionsComputer();
                    limpiarComputer();
                },
                555: function () {
                    alert('Un error ocurrio, No se puede guardar el computador');
                }
            }
        });

    }
}

$(document).ready(function () {
    optionsCategory();
});

function deleteComputerById(id) {

    messagesValidate = $("#messagesComputer" + id).text();
    reservationsValidate = $("#reservationsComputer" + id).text();

    if (messagesValidate.length === 15 && reservationsValidate.length === 20) {
        var computer = new Object();
        computer.id = id;
        $.ajax({
            url: urlComputer + "/" + id,
            type: 'DELETE',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(computer),
            statusCode: {
                204: function () {
                    alert('Se ha eliminado el computador cond id: ' + id);
                    window.location.href = "tienda.html";
                },
                555: function () {
                    alert('Un error ocurrio, No se puede eliminar el computador con el id: ' + id);
                    window.location.href = "tienda.html";
                }
            }
        });
    } else if (messagesValidate.length === 15) {
        alert("Tiene reservaciones relacionados");
    } else if (reservationsValidate.length === 20) {
        alert("Tiene mensajes relacionados");
    } else {
        alert("Tiene mensajes y reservaciones relacionados.");
    }
}

function limpiarComputer(){
    $("#brand").val("");
    $("#year_computer").val("");
    $("#name_computer").val("");
    $("#description_computer").val("");
}

function visibilityComputer() {
    $(".computer").toggle();
    $("#showComputers").toggleClass("activeBtn");
}