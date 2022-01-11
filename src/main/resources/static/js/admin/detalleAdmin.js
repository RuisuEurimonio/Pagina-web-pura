urlAdmin = "/api/Admin";

$(document).ready(function () {
    console.log("document ready!");
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('id')) {
        let id = searchParams.get('id');
        consultAdminById(id);
    }
});

function consultAdminById(id) {
    $.ajax({
        url: urlAdmin + "/" + id,
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            if (respuesta.idAdmin > 0) {
                console.log(respuesta);
                updateAdminForm(respuesta);
            } else {
                alert('No se encuentra el administrador con el id ' + id);
                window.location.href = "tienda.html";
            }
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
            window.location.href = "tienda.html";
        }
    });
}

function updateAdminForm(item) {
    $("#idAdmin").val(item.idAdmin);
    $("#nameAdmin").val(item.name);
    $("#emailAdmin").val(item.email);
    $("#passwordAdmin").val(item.password);
}

function updateAdmin() {
    console.log("ejecutando funcion para actualizar");
    var idAdmin = +$("#idAdmin").val();
    var name = $("#nameAdmin").val();
    var email = $("#emailAdmin").val();
    var password = $("#passwordAdmin").val();
    if (name.length === 0 || email.length === 0 || password.length === 0) {
        alert("No se puede actualizar el Admine, tiene campos vacios");
    } else {
        var Admin = new Object();
        Admin.idAdmin = idAdmin;
        Admin.name = name;
        Admin.email = email;
        Admin.password = password;

        $.ajax({
            url: urlAdmin + "/update",
            type: 'PUT',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(Admin),
            statusCode: {
                201: function () {
                    alert('Se ha actualizado la categoria');
                    window.location.href = "tienda.html";
                },
                555: function () {
                    alert('Un error ocurrio, No se puede actualizar la categoria');
                }
            }
        });
    }
}
