//Michael Horwitz u22512323
function loadBrands() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://wheatley.cs.up.ac.za/api/");
    xhttp.onload = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var brandResp = JSON.parse(xhttp.responseText);
            if (brandResp.status === "success") {
                var brandArr = brandResp.data;
                for (let index = 0; index < brandArr.length; index++) {
                    var brand = brandArr[index];
                    var tileDiv = document.createElement("div");
                    tileDiv.innerHTML = "<a id=\"" + brand + "\"href=\"./Construction.html\">" + brand + "<br></a>";
                    document.getElementById("car_brand_tiles").appendChild(tileDiv);
                    loadBrandImg(brand);
                }
            }
        }
    }
    var sendObj = {
        "studentnum": "u22512323",
        "apikey": "a9198b68355f78830054c31a39916b7f",
        "type": "GetAllMakes",
        "limit": 20,
    };
    xhttp.send(JSON.stringify(sendObj));
}

loadBrands();

function loadBrandImg(brand){
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://wheatley.cs.up.ac.za/api/getimage?brand=" + brand);
    var tiles = document.getElementById("car_brand_tiles");
    xhttp.onload = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var img = document.createElement("img");
            img.setAttribute("src", xhttp.responseText);
            img.setAttribute("alt", "Logo not found");
            img.setAttribute("height", "120");
            document.getElementById("" + brand).appendChild(img);
        }
    }
    xhttp.send();
}