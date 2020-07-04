function createGrid(size = 16) {

    if (!size) {
        size = 16;
    }

    let divSize = 500 / size;
    const container = document.querySelector('#container');

    for (let rows = 0; rows < size; rows++) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');
        container.appendChild(rowDiv);
    }

    const rowDivs = document.querySelectorAll('div.row');
    rowDivs.forEach(row => {
        for (let cols = 0; cols < size; cols++) {
            const colDiv = document.createElement('div');
            colDiv.classList.add('column');
            colDiv.style.height = `${divSize}px`;
            colDiv.style.width = `${divSize}px`;
            row.appendChild(colDiv);
        }
    });

}

function cleanGrid() {
    const container = document.querySelector('#container');
    const containerChildren = document.querySelectorAll('div.row');
    containerChildren.forEach(child => {
        container.removeChild(child);
    });
}

function addNormalMode() {
    const colDivs = document.querySelectorAll('div.column');

    colDivs.forEach(div => {
        div.addEventListener('mouseenter', e => {
            e.target.style.backgroundColor = `rgb(0,0,0)`;
        });
    });
}

function addColorMode() {
    const colDivs = document.querySelectorAll('div.column');

    colDivs.forEach(div => {
        div.addEventListener('mouseenter', e => {
            let red = Math.round(Math.random() * 255);
            let green = Math.round(Math.random() * 255);
            let blue = Math.round(Math.random() * 255);

            e.target.style.backgroundColor = `rgb(${red},${green},${blue})`;
            e.target.style.outline = `rgb(${red},${green},${blue})`;
        });
    });
}

function addSketchMode() {
    const colDivs = document.querySelectorAll('div.column');

    colDivs.forEach(div => {
        div.addEventListener('mouseenter', e => {
            let red = 0;
            let green = 0;
            let blue = 0;
            let opacity = 0.1;

            if (!e.target.style.opacity) {
                opacity = 0.1;
            } else if (+e.target.style.opacity === 1) {
                opacity = 1;
            } else {
                let divOpacity = e.target.style.opacity;
                divOpacity = +divOpacity + 0.1;
                opacity = divOpacity;
            }
            e.target.style.backgroundColor = `rgb(${red},${green},${blue})`;
            e.target.style.opacity = opacity;
            e.target.style.outline = `rgba(${red},${green},${blue},${opacity})`;
        });
    });
}
 
const reset = document.querySelector('#reset');
const normal = document.querySelector('#normal'); 
const random = document.querySelector('#random');
const sketch = document.querySelector('#sketch');

window.addEventListener('load', () => { // create grid on page load
    createGrid();
    addNormalMode();
});

reset.addEventListener('click', () => { // reset grid to 16 and add normal mode
    cleanGrid();
    createGrid();
    addNormalMode();
});

normal.addEventListener('click', () => { // trigger normal mode
    let gridSize = +prompt('Enter grid size. 16 is default', '');
    cleanGrid();
    createGrid(gridSize);
    addNormalMode();

}); 

random.addEventListener('click', () => { // trigger color mode
    let gridSize = +prompt('Enter grid size. 16 is default', '');
    cleanGrid();
    createGrid(gridSize);
    addColorMode();
}); 

sketch.addEventListener('click', () => { // trigger sketch mode
    let gridSize = +prompt('Enter grid size. 16 is default', '');
    cleanGrid();
    createGrid(gridSize);
    addSketchMode();
}); 