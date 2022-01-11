var urlComputer = "/api/Computer";

$(document).ready(function () {
    console.log("document ready!");
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('id')) {
        let id = searchParams.get('id');
        consultComputerById(id);
    }
});

function consultComputerById(id) {
    $.ajax({
        url: urlComputer + "/" + id,
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            if (respuesta.id > 0) {
                updateComputerForm(respuesta);
            } else {
                alert('No se encuentra el computador con el id ' + id);
                window.location.href = "tienda.html";
            }
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
            window.location.href = "tienda.html";
        }
    });
}

function updateComputerForm(item) {
    $("#idComputer").val(item.id);
    $("#brand").val(item.brand);
    $("#categoryId").val(item.category.id);
    $("#namecomputer").val(item.name);
    $("#yearComputer").val(item.year);
    $("#descriptionComputer").val(item.description);
}

function updateComputer() {

    var id = +$("#idComputer").val();
    var brand = $("#brand").val();
    var category_id = +$("#categoryId").val();
    var name = $("#namecomputer").val();
    var year = +$("#yearComputer").val();
    var description = $("#descriptionComputer").val();

    if (brand.length === 0 || name.length === 0 || year.length === 0 || description.length === 0) {
        alert("No se puede actualizar el computador, tiene campos vacios");
    } else {
        var computer = new Object();
        var category = {id: category_id};
        computer.id = id;
        computer.brand = brand;
        computer.year = year;
        computer.category = category;
        computer.name = name;
        computer.description = description;

        $.ajax({
            url: urlComputer + "/update",
            type: 'PUT',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(computer),
            statusCode: {
                201: function () {
                    alert('Se ha actualizado el computador');
                    console.log(computer);
                    window.location.href = "tienda.html";
                },
                555: function () {
                    alert('Un error ocurrio, No se puede actualziar el computador');
                }
            }
        });
    }
}

