urlCategory = "/api/Category";

$(document).ready(function () {
    console.log("document ready!");
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('id')) {
        let id = searchParams.get('id');
        consultCategoryById(id);
    }
});

function consultCategoryById(id) {
    $.ajax({
        url: urlCategory + "/" + id,
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            if (respuesta.id > 0) {
                updateCategoryForm(respuesta);
            } else {
                alert('No se encuentra el Categorye con el id ' + id);
                window.location.href = "tienda.html";
            }
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
            window.location.href = "tienda.html";
        }
    });
}

function updateCategoryForm(item) {
    $("#idCategory").val(item.id);
    $("#nameCategory").val(item.name);
    $("#descriptionCategory").val(item.description);
}

function updateCategory() {
    console.log("ejecutando funcion para actualizar");
    var idCategory = +$("#idCategory").val();
    var name = $("#nameCategory").val();
    var description = $("#descriptionCategory").val();
    if (name.length === 0 || description.length === 0) {
        alert("No se puede actualizar el Categorye, tiene campos vacios");
    } else {
        var category = new Object();
        category.id = idCategory;
        category.name = name;
        category.description = description;

        $.ajax({
            url: urlCategory + "/update",
            type: 'PUT',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(category),
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