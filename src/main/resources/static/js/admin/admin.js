urlAdmin = "/api/Admin";

function consultAdmin() {

    $.ajax({
        url: urlAdmin + "/all",
        type: "GET",
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            makeTableAdmin(respuesta);
        },
        error: function (xhr, status) {
            alert("Ha sucedido un problema: " + status);
        },
        complete: function (xhr, status) {
            console.log(status);
        }
    });
}

function makeTableAdmin(respuesta) {
    if (respuesta.length > 0) {
        var tabla = `<table border="1" class="table table-dark table-striped">
                        <tr>
                            <th> ID </th>
                            <th> NAME </th>
                            <th> EMAIL </th>
                            <th> ACCIONES </th>
                        </tr>`;

        for (var i = 0; i < respuesta.length; i++) {
            tabla += `<tr>
                        <td> ${respuesta[i].idAdmin} </td>
                        <td> ${respuesta[i].name} </td>
                        <td> ${respuesta[i].email} </td>

                        <td>
                            <button class="btn btn-danger" onclick="deleteAdminById(${respuesta[i].idAdmin})">Eliminar</button>
                            <a href="detalleAdmin.html?id=${respuesta[i].idAdmin}">
                                <button class="btn btn-info" type="submit"> Editar </button>
                            </a>
                        </td>
                        </tr>`;
        }
        tabla += `</table>`;
        $("#adminTable").html(tabla);
    } else {
        alert("No existen clientes para mostrar");
    }
}

function saveAdmin() {
    var name = $("#nameAdmin").val();
    var email = $("#emailAdmin").val();
    var password = $("#passwordAdmin").val();

    if (name.length === 0 || email.length === 0 || password.length === 0) {
        alert("No se puede guardar el administrador, tiene campos vacios");
    } else {
        var admin = new Object();
        admin.name = name;
        admin.email = email;
        admin.password = password;
        var jsonadmin = JSON.stringify(admin);
        console.log(admin);

        $.ajax({
            url: urlAdmin + "/save",
            type: 'POST',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data: jsonadmin,
            statusCode: {
                201: function () {
                    alert('Se ha guardado el administrador');
                    consultAdmin();
                },
                555: function () {
                    alert('Un error ocurrio, No se puede guardar el administrador');
                }

            }
        });
    }
}

function deleteAdminById(id) {
    console.log(id);

    var admin = new Object();
    admin.idAdmin = id;

    $.ajax({
        url: urlAdmin + "/" + id,
        type: "DELETE",
        dataTpe: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(admin),
        statusCode: {
            204: function () {
                alert("Se ha eliminado el administrador con id: " + id);
                window.location.href = "tienda.html";
            }
        }
    });
}

function limpiarAdmin() {
    $("#nameAdmin").val("");
    $("#emailAdmin").val("");
    $("#age").val("");
    $("#passwordAdmin").val("");
}

function visibilityAdmins() {
    $(".admin").toggle();
    $("#showAdmins").toggleClass("activeBtn");
}