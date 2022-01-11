urlClient = "/api/Client";

$(document).ready(function () {
    console.log("document ready!");
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('id')) {
        let id = searchParams.get('id');
        consultClientById(id);
    }
});

function consultClientById(id) {
    $.ajax({
        url: urlClient + "/" + id,
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta.idClient);
            if (respuesta.idClient > 0) {
                updateClientForm(respuesta);
            } else {
                alert('No se encuentra el cliente con el id ' + id);
                window.location.href = "tienda.html";
            }
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
            window.location.href = "tienda.html";
        }
    });
}

function updateClientForm(item) {
    $("#idClient").val(item.idClient);
    $("#name").val(item.name);
    $("#email").val(item.email);
    $("#age").val(item.age);
    $("#password").val(item.password);
}

function updateClient() {
    console.log("ejecutando funcion para actualizar");
    var idClient = +$("#idClient").val();
    var name = $("#name").val();
    var email = $("#email").val();
    var age = +$("#age").val();
    var password = $("#password").val();
    if (name.length === 0 || password.length === 0 || age === 0) {
        alert("No se puede actualizar el cliente, tiene campos vacios");
    } else {
        var client = new Object();
        client.idClient = idClient;
        client.name = name;
        client.email = email;
        client.age = age;
        client.password = password;

        $.ajax({
            url: urlClient + "/update",
            type: 'PUT',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(client),
            statusCode: {
                201: function () {
                    alert('Se ha actualizado el cliente');
                    window.location.href = "tienda.html";
                },
                555: function () {
                    alert('Un error ocurrio, No se puede actualizar el cliente');
                }
            }
        });
    }
}