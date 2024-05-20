var SiteNameInput = document.getElementById("SiteName");
var SiteLinkInput = document.getElementById("SiteLink");

var Rows = [];
if (localStorage.getItem("Dataaaaaaa")) {
    Rows = JSON.parse(localStorage.getItem("Dataaaaaaa"));
    Display();
}

function addRow() {
    var name = SiteNameInput.value.trim();
    var link = SiteLinkInput.value.trim();

    if (name.length <= 3 || !isValidURL(link)) {
        document.getElementById("alertBox").style.display = "flex";
        return;
    } else {
        document.getElementById("alertBox").style.display = "none";
    }

    var RowData = {
        name: name,
        link: link
    };

    Rows.push(RowData);
    localStorage.setItem("Dataaaaaaa", JSON.stringify(Rows));
    Display();
}

function Display() {
    var temp = "";
    for (var i = 0; i < Rows.length; i++) {
        temp += `<tr>
            <td>${i + 1}</td>
            <td>${Rows[i].name}</td>
            <td><button type="button" class="btn btn-primary" onclick="visitSite(${i})"><i class="fa-solid fa-eye"></i> Visit</button></td>
            <td><button type="button" onclick="Delete(${i})" class="btn btn-danger"><i class="fa-solid fa-trash"></i> Delete</button></td>
        </tr>`;
    }
    document.getElementById("myData").innerHTML = temp;
}

function visitSite(index) {
    var url = Rows[index].link;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "http://" + url;
    }
    window.open(url, '_blank');
}

function Delete(index) {
    Rows.splice(index, 1);
    localStorage.setItem("Dataaaaaaa", JSON.stringify(Rows));
    Display();
}

function isValidURL(url) {
    // Regular expression pattern to match a valid URL with any top-level domain
    var pattern = /^(https?:\/\/)?([\w-]+\.)+[\w]{2,}(\/\S*)?$/i;
    return pattern.test(url);
}

function closeBtn() {
    document.getElementById("alertBox").style.display = "none";
}