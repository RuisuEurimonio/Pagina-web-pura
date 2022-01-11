ulrCategory = "/api/Category";

function consultCategory() {

    $.ajax({
        url: ulrCategory + "/all",
        type: "GET",
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            makeTableCategory(respuesta);
        },
        error: function (xhr, status) {
            alert("Ha sucedido un problema: " + status);
        },
        complete: function (xhr, status) {
            console.log(status);
        }
    });
}

function makeTableCategory(respuesta) {
    if (respuesta.length > 0) {
        var tabla = `<table border="1" class="table table-dark table-striped">
                        <tr>
                            <th> NAME </th>
                            <th> DESCRIPTION </th>
                            <th> COMPUTERS </th>
                            <th> ACCIONES </th>
                        </tr>`;

        for (var i = 0; i < respuesta.length; i++) {
            computers = "";
            computadores = respuesta[i].computers.length;
            if (computadores > 0) {
                for (var a = 0; a < computadores; a++) {
                    computers += respuesta[i].computers[a].name + " - " + respuesta[i].computers[a].brand + `<br> <br>`;
                }
                tabla += `<tr>
                            <td> ${respuesta[i].name} </td>
                            <td> ${respuesta[i].description} </td>
                            <td id="computerCategory${respuesta[i].id}"> Name: ${computers} </td>
                            <td>
                                <button class="btn btn-danger" onclick="deleteCategoryById(${respuesta[i].id})">Eliminar</button>
                                <a href="detalleCategory.html?id=${respuesta[i].id}">
                                    <button class="btn btn-info" type="submit"> Editar </button>
                                </a>
                            </td>
                            </tr>`;
            } else {
                tabla += `<tr>
                            <td> ${respuesta[i].name} </td>
                            <td> ${respuesta[i].description} </td>
                            <td id="computerCategory${respuesta[i].id}"> Sin computadores. </td>
                            <td>
                                <button class="btn btn-danger" onclick="deleteCategoryById(${respuesta[i].id})">Eliminar</button>
                                <a href="detalleCategory.html?id=${respuesta[i].id}">
                                    <button class="btn btn-info" type="submit"> Editar </button>
                                </a>
                            </td>
                            </tr>`;
            }
        }
        tabla += `</table>`;
        $("#categoryTable").html(tabla);
        categoriesConsulted = true;
    } else {
        alert("No existen categorias para mostrar");
    }
}

function saveCategory() {
    var name = $("#name_category").val();
    var description = $("#description_category").val();

    if (name.length === 0 || description.length === 0) {
        alert("No se puede guardar la categoria, tiene campos vacios");
    } else {
        var admin = new Object();
        admin.name = name;
        admin.description = description;
        var jsonadmin = JSON.stringify(admin);
        console.log(admin);

        $.ajax({
            url: ulrCategory + "/save",
            type: 'POST',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data: jsonadmin,
            statusCode: {
                201: function () {
                    alert('Se ha guardado la categoria');
                    consultCategory();
                    optionsCategory();
                    limpiarCategory();
                },
                555: function () {
                    alert('Un error ocurrio, No se puede guardar la categoria');
                }

            }
        });
    }
}

function deleteCategoryById(id) {
    computerValidate = $("#computerCategory" + id).text();
    console.log(computerValidate.length);

    if (computerValidate.length === 19) {
        var category = new Object();
        category.id = id;

        $.ajax({
            url: ulrCategory + "/" + id,
            type: "DELETE",
            dataType: "json",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(category),
            statusCode: {
                204: function () {
                    alert("Se ha eliminado la categoria con el id: " + id);
                    window.location.href = "tienda.html";
                }
            }
        });
    } else {
        alert("Tiene computadores relacionados.");
    }
}

function limpiarCategory(){
    $("#name_category").val("");
    $("#description_category").val("");
}

function visibilityCategories(){
    $(".category").toggle();
    $("#showCategories").toggleClass("activeBtn");
}