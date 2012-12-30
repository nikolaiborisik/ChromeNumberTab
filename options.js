console.log('Options.js');

function save_options() {
    console.log('save tap');
    var radios = document.getElementsByName('numberStyle');
    for(var  i = 0; i < radios.length; i++){
        if(radios[i].checked){
            console.log(radios[i].value);
            ChromeNumberTabsApi.setNumberStyle(radios[i].value);
            ChromeNumberTabsApi.refreshTabsNumber();
            break;
        }
    }
    // Update status to let user know options were saved.
    var status = document.getElementById("status");
    status.innerHTML = "Options Saved.";
    setTimeout(function() {
        status.innerHTML = "";
    }, 750);
}

// Restores select box state to saved value from localStorage.
function pageReady() {
    console.log('bind listeners');

    document.getElementById('save').addEventListener('click', save_options);
    var style = ChromeNumberTabsApi.getNumberStyle();
    if (!style) {
        return;
    }
    var radios = document.getElementsByName("numberStyle");
    for (var i = 0; i < radios.length; i++) {
        if(radios[i].value == style){
            radios[i].checked = true;
            break;
        }
    }
    

}
document.addEventListener('DOMContentLoaded', pageReady);
