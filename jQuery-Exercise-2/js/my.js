let data = [];
let toDel = [];
let cnt = 0;
$(document).ready(function(){

    // when add button is clicked to add new fields
    $("#add").click(function(){
        const fname = $("#fname").val();
        const lname = $("#lname").val();
        const color = $("#color").val();
        const size = $("#size").val();

        // validation to check if empty
        if(fname === "" || lname === "" || color === "" || size === ""){
            alert("Fields cannot be empty");
            return;
        }// validation to validate color
        else if(/^#[0-9A-F]{6}$/i.test(color))
            data.push({fname, lname, color, size});
        else{
            alert("Enter valid color");
            return;
        }
        let tab = "";

        // after adding show #selAll tag
        $("#selAll").show();

        // if first element then this
        if(cnt === 0){
            tab+= `<div id = "item${cnt}">`
            tab +=`<br><input type="checkbox" name="check${cnt}" id = "check${cnt}"}" onchange=viewDelete('check${cnt}')>`
            tab +=`<input class = "styling" type="text" name="fname${cnt}" id = "fname${cnt}" value="${data[cnt].fname}" style = "background-color: ${data[cnt].color}; font-size: ${data[cnt].size}; " readonly>`
            tab +=`<input class = "styling" type="text" name="lname${cnt}" id = "lname${cnt}"  value="${data[cnt].lname}" style = "background-color: ${data[cnt].color}; font-size: ${data[cnt].size}; " readonly>`
            tab += `<button class = "edit" name="edit${cnt}" id="edit${cnt}" onclick=editData(document.getElementById("edit${cnt}").name)>Edit</button>`
            tab += `<button class = "delete" name="delete${cnt}" id="delete${cnt}" onclick=deleteData(document.getElementById("delete${cnt}").name) style="display: none">Delete</button>`
            tab += `</div>`;
            $("#list").append(tab);
            $(`#item${cnt}`).hide();
            $(`#item${cnt}`).fadeIn();
        }
        else{
            tab+= `<div id = "item${cnt}">`
            tab +=`<br><input type="checkbox" name="check${cnt}" id = "check${cnt}"}" onchange=viewDelete('check${cnt}')>`
            tab +=`<input class = "styling" type="text" name="fname${cnt}" id = "fname${cnt}" value="${data[cnt].fname}" style = "background-color: ${data[cnt].color}; font-size: ${data[cnt].size}; " readonly>`
            tab +=`<input class = "styling" type="text" name="lname${cnt}" id = "lname${cnt}"  value="${data[cnt].lname}" style = "background-color: ${data[cnt].color}; font-size: ${data[cnt].size}; " readonly>`
            tab += `<button class = "edit" name="edit${cnt}" id="edit${cnt}" onclick=editData(document.getElementById("edit${cnt}").name)>Edit</button>`
            tab += `<button class = "delete" name="delete${cnt}" id="delete${cnt}" onclick=deleteData(document.getElementById("delete${cnt}").name) style="display: none">Delete</button>`
            tab += `</div>`;
            $("#list").append(tab);
            $(`#item${cnt}`).hide();
            $(`#item${cnt}`).fadeIn();
        }
        cnt++;
        $("#modify").show();
    });
});

// edit button is pressed
function editData(name){
    let id;
    if(name.length === 5)
        id = +name.charAt(name.length - 1);
    else
        id = +name.slice(4);
    const fname = data[id].fname;
    const lname = data[id].lname;
    const color = data[id].color;
    const size = data[id].size;

    //setting values in the input fields
    $("#fname").val(fname);
    $("#lname").val(lname);
    $("#color").val(color);
    $("#size").val(size);
    $("#id").val(id);
    $("#add").css("display","none");
    $("#update").css("display", "");
}

// update button pressed
function updateData(id){
    data[+id].fname = $("#fname").val();
    data[+id].lname = $("#lname").val();
    data[+id].color = $("#color").val();
    data[+id].size = $("#size").val();
    alert("Updated");
    console.log(data[+id]);
    $(`#fname${id}`).val($("#fname").val());
    $(`#lname${id}`).val($("#lname").val());
    $(`#fname${id}`).css({"background-color" : `${$("#color").val()}`, "font-size" : `${$("#size").val()}`});
    $(`#lname${id}`).css({"background-color" : `${$("#color").val()}`, "font-size" : `${$("#size").val()}`});
    $("#add").css("display", "");
    $("#update").css("display", "none");
    $("#fname").val("");
    $("#lname").val("");
    $("#color").val("");
    $("#size").val("");
}

// when any individual check box is clicked
function viewDelete(name){
    let id;
    let change = true;
    $("#selAll").show();
    if(name.length === 6)
        id = +name.charAt(name.length - 1);
    else
        id = +name.slice(5);
    if($(`#check${id}`).is(":checked")){
        $(`#delete${id}`).css("display", "");
        $(`#delSel`).css("display", "");
        toDel.push(id);
        $("#rowCount").show();
        $("#rowCount").html(`${toDel.length} rows selected`);
    }
    else{
        $(`#delete${id}`).css("display","none");
        toDel.splice(toDel.indexOf(id), 1);
        $("#rowCount").show();
        $("#rowCount").html(`${toDel.length} rows selected`);
        if(toDel.length === 0){
            $(`#delSel`).css("display", "none");
            $("#rowCount").hide();
        }
    }
}

// individual row delete button pressed
function deleteData(name){
    let id;
    if(name.length === 7)
        id = +name.charAt(name.length - 1);
    else
        id = +name.slice(6);
    if(confirm("Are you sure you want to delete?")){
        data.splice(id, 1);
        $(`#item${id}`).fadeOut("normal", function(){
            $(this).remove();
        });
        document.getElementById("fname").value = "";
        document.getElementById("lname").value = "";
        cnt--;
        $('input:checkbox').prop('checked',false);
        toDel = [];
        $("#rowCount").hide();
        $("#delSel").hide();
        if(cnt === 0){
            $("#modify").hide();
            $("#selAll").hide();
        }
    }
    else   
        return;
}

//when select all check box is checked
function onSelectAllChange(){
    if($(`#delAll`).is(":checked")){
        toDel = [];
        $('input:checkbox').prop('checked',true);
        for(elem in data){
            toDel.push(elem);
        }
        $(`#delSel`).css("display", "");
        $("#rowCount").show();
        $("#rowCount").html(`${data.length} rows selected`);
    }
    else{
        $('input:checkbox').prop('checked',false);
        $(`#delSel`).css("display", "none");
        toDel = [];
        $("#rowCount").hide();
    }
}

// main delete button is pressed
function deleteAll(){
    if(confirm("Are you sure you want to delete?")){

        //if delete all
        if($(`#delAll`).is(":checked")){
            data = [];
            $("#list").fadeOut("normal",  function(){
                $("#list").html("");
                $("#fname").val("");
                $("#lname").val("");
                $("#color").val("");
                $(`#delSel`).css("display", "none");
            });
            cnt = 0;
            $("#selAll").hide();
            $("#modify").hide();
        }// if delete selected
        else{
            for(id in toDel){
                data.splice(toDel[id], 1);
                $(`#item${toDel[id]}`).fadeOut("normal", function(){
                    $(this).remove();
                });
                cnt--;
            }
            toDel = [];
            $("#rowCount").hide();
            if(data.length == 0){
                $("#selAll").hide();
                $("#modify").hide();
            }
        }
    }
    else    
        return;
}

// called when modify is clicked
function modify(){
    const color = $("#modifyColor").val();
    if(color === ""){
        alert("Fields cannot be empty");
        return;
    }
    else if(/^#[0-9A-F]{6}$/i.test(color)){
        for(id in toDel){
            $(`#fname${toDel[id]}`).css({"background-color":`${color}`, "font-size":`${$("#modifySize").val()}`});
            $(`#lname${toDel[id]}`).css({"background-color":`${color}`, "font-size":`${$("#modifySize").val()}`});
            data[toDel[id]].color = $("#modifyColor").val();
            data[toDel[id]].size = $("#modifySize").val();
        }
        $("#modifyColor").val("");
        $("#modifySize").val("");
    }
    else{
        alert("Enter valid color");
        return;
    }
}