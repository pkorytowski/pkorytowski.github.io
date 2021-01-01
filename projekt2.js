function emptyCanvasContener(){
    let canvasContener = document.getElementById("canv");
    while(canvasContener.firstChild){
       canvasContener.removeChild(canvasContener.firstChild); 
    }
}

function createCanvas(width){
    const canvasContener = document.getElementById("canv");
    
    let canvas = document.createElement("canvas");

    canvas.width = parseInt(width-100);
    canvas.height = parseInt(width/2);
    canvas.style.position = "absolute";

    canvasContener.appendChild(canvas);
    return canvas;
}

function showCycloid(){
    emptyCanvasContener();

    const descContener = document.getElementById("description");
    descContener.innerHTML = `<p style = "padding: 10px; text-align:justify;">Cykloida to krzywa, jaką zakreśla punkt leżący na obwodzie koła, które toczy się bez poślizgu po prostej. 
    Ogólne równania cykloidy mają postać: <br/></p>
    <p style="text-align: center;">
    x = rt - c * sin(t) <br/>
    y = r - c * cos(t), <br/>
    </p>
    <p style = "padding: 10px; text-align:justify;">
    gdzie z jest sumą promienia i przesunięcia punktu względem krawędzi koła. 

    </p><br/>`;

    const setParamsContener = document.getElementById("setParams");
    setParamsContener.innerHTML = `
    
    <table style = "width:200px; margin:auto;">
        <tr><td>Średnica koła</td><td><input type ="number" id="r" value=1 size=4></td></tr>
        <tr><td>Przesunięcie</td><td><input type ="number" id ="offset" value=0 size=4></td></tr>
    </table>

    <button id="draw">rysuj</button>
    
    `;

    updateCycloidValue(); 
    let diameter = document.getElementById("r");
    diameter.addEventListener("change", updateCycloidValue);

    let off = document.getElementById("offset");
    off.addEventListener("change", updateCycloidValue);

    let drawButton = document.getElementById("draw");
    drawButton.addEventListener("click", function(){draw("cycloid")});
    
    return true;
}

function updateCycloidValue(){
    let r = document.getElementById("r").value;
    let offset = document.getElementById("offset").value;

    r = parseInt(r);
    offset = parseInt(offset);

    const showParamsContener = document.getElementById("showParams");
    showParamsContener.innerHTML = `
    <p style="vertical-align:top; display:inline;">
    x = ` + r + ` * t - ` + (r + offset) + ` * sin(t) <br/>
    y = `  + r +  ` - ` + (r + offset) + ` * cos(t) 
    </p>
    </div>
    `
}

function showEpicycloid(){
    emptyCanvasContener();

    const descContener = document.getElementById("description");
    descContener.innerHTML = `<p style = "padding: 10px; text-align:justify">Epicykloida – krzywa, jaką zakreśla ustalony punkt okręgu toczącego się bez poślizgu na zewnątrz innego, nieruchomego okręgu. 
    Ogólne równania epicykloidy mają postać: <br/></p>
    <p style="text-align: center;">
        x = (R + r) * cos(t) - c * cos(((R+r)/r) * t) <br/>
        y = (R + r) * sin(t) - c * sin(((R+r)/r) * t), <br/>
    </p>
    <p style = "padding: 10px; text-align:justify;">
    gdzie r - średnica nieruchomego koła, r - średnica ruchomego koła, c - suma r i przesunięci względem r
    </p><br/>`;

    const setParamsContener = document.getElementById("setParams");
    setParamsContener.innerHTML = `
    <table style = "width:300px; margin:auto;">
        <tr><td>Średnica ruchomego koła</td><td><input type ="number" id="r" value=1 size="4"></td></tr>
        <tr><td>Średnica nieruchomego koła</td><td><input type ="number" id="R" value=1 size="4"></td></tr>
        <tr><td>Przesunięcie</td><td><input type ="number" id ="offset" value=0 size="4"></td></tr>
    </table>

    <button id="draw">rysuj</button>
    `;

    updateEpicycloidValue(); 
    let r = document.getElementById("r");
    r.addEventListener("change", updateEpicycloidValue);

    let R = document.getElementById("R");
    R.addEventListener("change", updateEpicycloidValue);

    let off = document.getElementById("offset");
    off.addEventListener("change", updateEpicycloidValue);

    let drawButton = document.getElementById("draw");
    drawButton.addEventListener("click", function(){draw("epicycloid")});
    
    return true;
}

function updateEpicycloidValue(){
    let r = document.getElementById("r").value;
    let R= document.getElementById("R").value;
    let offset = document.getElementById("offset").value;

    r = parseInt(r);
    R = parseInt(R);
    offset = parseInt(offset);

    const showParamsContener = document.getElementById("showParams");
    showParamsContener.innerHTML = `
    <p style="vertical-align:top; display:inline;">
    x = ` + (R + r) + ` * cos(t) - ` + (r + offset) + ` * cos(` + (Math.round((((R+r) / r) + Number.EPSILON) * 100) / 100) + ` * t) <br/>
    y = ` + (R + r) + ` * sin(t) - ` + (r + offset) + ` * sin(` + (Math.round((((R+r) / r) + Number.EPSILON) * 100) / 100) + ` * t)
    </p>
    </div>
    `
}

function showHipocycloid(){
    emptyCanvasContener();

    const descContener = document.getElementById("description");
    descContener.innerHTML = `<p style = "padding: 10px; text-align:justify;">Hipocykloida to krzywa, jaką zakreśla ustalony punkt okręgu toczącego się bez poślizgu wewnątrz okręgu o większym promieniu.
    Ogólne równania hipocykloidy mają postać: <br/></p>
    <p style="text-align: center;">
    x = (R - r) * cos(t) + c * cos(((R-r)/r) * t) <br/>
    y = (R - r) * sin(t) - c * sin(((R-r)/r) * t), <br/>
    </p>
    <p style = "padding: 10px; text-align:justify;">
    gdzie r - średnica nieruchomego koła, r - średnica ruchomego koła, c - suma r i przesunięci względem r
    </p><br/>`;

    const setParamsContener = document.getElementById("setParams");
    setParamsContener.innerHTML = `
    <table style = "width:300px; margin:auto;">
        <tr><td>Średnica ruchomego koła</td><td><input type ="number" id="r" value=1 size=4></td></tr>
        <tr><td>Średnica nieruchomego koła</td><td><input type ="number" id="R" value=1 size=4></td></tr>
        <tr><td>Przesunięcie</td><td><input type ="number" id ="offset" value=0 size=4></td></tr>
    </table>

    <button id="draw">rysuj</button>
    `;

    updateHipocycloidValue(); 
    let r = document.getElementById("r");
    r.addEventListener("change", updateHipocycloidValue);

    let R = document.getElementById("R");
    R.addEventListener("change", updateHipocycloidValue);

    let off = document.getElementById("offset");
    off.addEventListener("change", updateHipocycloidValue);

    let drawButton = document.getElementById("draw");
    drawButton.addEventListener("click", function(){draw("hipocycloid")});
    
    return true;
}

function updateHipocycloidValue(){
    let r = document.getElementById("r").value;
    let R= document.getElementById("R").value;
    let offset = document.getElementById("offset").value;

    r = parseInt(r);
    R = parseInt(R);
    offset = parseInt(offset);

    const showParamsContener = document.getElementById("showParams");
    showParamsContener.innerHTML = `
    <p style="vertical-align:top; display:inline;">
    x = ` + (R - r) + ` * cos(t) + ` + (r + offset) + ` * cos(` + (Math.round((((R-r) / r) + Number.EPSILON) * 100) / 100) + ` * t) <br/>
    y = ` + (R - r) + ` * sin(t) - ` + (r + offset) + ` * sin(` + (Math.round((((R-r) / r) + Number.EPSILON) * 100) / 100) + ` * t)
    </p>
    </div>
    `
}



function draw(method){
    emptyCanvasContener();

    var r = document.getElementById('r').value;
    let R = null;
    var offset=document.getElementById('offset').value;

    if(r!=""){
        r = parseInt(r);
        offset = parseInt(offset);
    } 

    
    var canvasContener = document.getElementById("canv");
    var width = canvasContener.clientWidth;

    canvasContener.style.height = ((width/2) + 30) + "px";

    var canvas1 = createCanvas(width);
    var canvas2 = createCanvas(width);

    var offscreen1 = canvas1.transferControlToOffscreen();
    var offscreen2 = canvas2.transferControlToOffscreen();

    if (method == "cycloid"){
        let worker = new Worker("offscreenCycloid.js");
        worker.postMessage({canv1: offscreen1, canv2: offscreen2, r: r, offset: offset }, [offscreen1, offscreen2]);
    }
    else if (method == "epicycloid"){
        R = parseInt(document.getElementById("R").value);

        let worker = new Worker("offscreenEpicycloid.js");
        worker.postMessage({canv1: offscreen1, canv2: offscreen2, r: r, offset: offset, R: R }, [offscreen1, offscreen2]);  
    }
    else {
        R = parseInt(document.getElementById("R").value);

        let worker = new Worker("offscreenHipocycloid.js");
        worker.postMessage({canv1: offscreen1, canv2: offscreen2, r: r, offset: offset, R: R }, [offscreen1, offscreen2]);
    }


}





