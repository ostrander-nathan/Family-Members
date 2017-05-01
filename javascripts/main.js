"use strict";

let FbAPIKeys = {};
let inputResult = {};
let skillsArr = [];

function putFamilyInDOM() { // only place dom is being manipulated other than hide and show in the calls to firebase
    FbAPI.getTodos(FbAPIKeys).then(function(items) {
        console.log("items from FB", items);
        items.forEach(function(item) {
            let newListItem = "";
            newListItem += `<div class="col-xs-4" data-fbid="${item.name}">`;
            newListItem += `<h3>${item.name}</h3>`;
            newListItem += `<h3>${item.gender}</h3>`;
            newListItem += `<h4>${item.age}</h4>`;
            newListItem += `<h4>${item.skills}</h4>`;
            newListItem += '</div>';
            newListItem += '<button type="button" class="btn btn-danger delete">Delete</button>';

            // newListItem+='</li>';
            console.log("newListItem", newListItem);
            $("#output").append(newListItem);
        });
    });
}

$(document).ready(function() {

    FbAPI.firebaseCredentials().then(function(keys) {
        FbAPIKeys = keys;
        firebase.initializeApp(FbAPIKeys);
        console.log("FbAPIKeys", FbAPIKeys);
    });

    $("#submitBtn").on("click", function() {
        event.preventDefault();
        let family = {
            "name": $("#name1").val(),
            "age": $("#age1").val(),
            "gender": $("#gender1").val(),
            "skills": $("#skills1").val(),
        };

        FbAPI.addTodo(FbAPIKeys, family).then(function() {
            putFamilyInDOM(family);
            console.log("family", family);
        });

        $('div').on('click', '.delete', function() {
            let familyToDelete = $(this).closest("div#item-name");
            let itemId = $(familyToDelete).data("fbid");
            console.log("fbid-delete", itemId);
            console.log("movieToDelete", movieToDelete);
            FbAPI.deleteTodo(FbAPIKeys, itemId).then(function() {
                putFamilyInDOM();
            });
        });


    });
});
