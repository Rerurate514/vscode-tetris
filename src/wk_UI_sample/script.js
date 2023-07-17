const buttonBea = document.getElementById('dynamic');
buttonBea.addEventListener('click',setIn);

let num = 0;

function setIn(){
    webview.postMessage({ type: 'drawField' });

}

window.addEventListener('message', event => {
    const message = event.data; // The json data that the extension sent
    switch (message.type) {
        case 'drawField':
            {
                drawField();
                break;
            }

    }
});

function drawField(){
        setInterval(() => dynamicTable(),1000);
}

function dynamicTable(){
    let table = document.querySelector('.field-table');
    let beforeTbody = document.querySelector('#field-tbody');

    table.removeChild(beforeTbody);

    let tbody = document.createElement("tbody");
    tbody.id = "field-tbody";

    table.appendChild(tbody);

    for(let v = 0; v < 20; v++){
        const tr = document.createElement("tr");
        tr.className= `row-num-${v}`;
        tbody?.appendChild(tr);
        for(let h = 0; h < 10; h++){
            const td = document.createElement("td");
            td.className = `${v}-${h}`;
            td.textContent = `${h + num}`;
            tr.appendChild(td);
            console.log(`class = ${v}-${h}`);
        }
        num++;
    }
}