const fs = require('fs');

const {
    createCanvas,
    registerFont
} = require('canvas');
const slugify = require('slugify');

slugify.extend({
    '\'': '-'
});

registerFont('./src/fonts/Recursive-ExtraBold.ttf', {
    family: 'recursive',
});

registerFont('./src/fonts/Recursive_Monospace-Light.ttf', {
    family: 'recursive light',
});

const colors = ['hsl(34 100% 50%)', 'hsl(165 82% 51%)', 'hsl(172 100% 50%)', 'hsl(45 100% 51%)', 'hsl(300 80% 70%)'];

module.exports = (async (url, title) => {
    // need to set output dir
    const outputDir = './src/images/social-preview-images/';
    const split = url.split('/');
    // get name of file, and slugify it
    const name = slugify(split[split.length - 2]);
    // get type, only make images if type === blog
    const type = split[3];
    if (type === 'blog') {
        await processImages(name, outputDir, title);
        return name;
    }
    // process each image and save it to output
    // maybe cache?
    return
})

async function processImages(name, output, title) {
    const canvas = createCanvas(1200, 630);
    const ctx = canvas.getContext('2d');
    // draw function can draw whatever you want
    draw(canvas.width, canvas.height, ctx, title);
    // convert canvas to png buffer
    const buffer = canvas.toBuffer('image/png');
    const path = output + name;
    await fs.promises.writeFile(path + '.png', buffer);
}

function draw(width, height, ctx, title) {
    const bg = 'hsl(0 0% 90%)';
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);
    const args = [width, height, ctx];
    const drawingFunctions = [randomCircles, shapePattern];
    drawingFunctions[randomOne(drawingFunctions)].apply(null, args);
    // randomCircles(width, height, ctx);
    drawText(ctx, title);
    drawFooter(width, height, ctx);
}

function drawFooter(width, height, ctx) {
    ctx.shadowColor = 'hsl(0 0% 20%)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = -4;
    ctx.fillStyle = 'rebeccapurple';
    ctx.fillRect(-15, 570, width + 15, height);
    ctx.fillStyle = 'hsl(0 0% 90%)';
    ctx.font = '30px "recursive light"';
    ctx.fillText('joesahlsa.dev', 40, 580);
}

function drawText(ctx, title) {
    ctx.font = 'bold 80px recursive';
    ctx.textBaseline = 'top';
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 3;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.globalAlpha = 1;
    // reset alpha
    ctx.strokeStyle = 'hsl(0 0% 10%)';
    ctx.lineWidth = 5;
    ctx.fillStyle = 'hsl(0 0% 90%)';
    const parts = splitText(title, 20);
    const startY = 20;
    const lineHeight = 100;
    for (let i = 0; i < parts.length; i++) {
        ctx.strokeText(parts[i], 20, startY + lineHeight * i);
        ctx.fillText(parts[i], 20, startY + lineHeight * i);
    }
}

function randomCircles(width, height, ctx) {
    const min = 10;
    const max = 30;
    const num = random(min, max);
    for (let i = 0; i < num; i++) {
        const x = random(0, width);
        const y = random(0, height);
        const radius = random(height * 0.1, height * 0.3);
        ctx.beginPath(x, y);
        ctx.fillStyle = colors[randomOne(colors)];
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        const alpha = Math.random() * (0.9 - 0.5) + 0.5;
        ctx.globalAlpha = alpha;
        ctx.fill();
    }
}

function shapePattern(width, height, ctx) {
    // get a random size 
    const randSize = random(40, 150);
    // width of each box
    const elWidth = width / Math.ceil(width / randSize);
    // height of each box
    const elHeight = height / Math.ceil(height / randSize);
    // array of shape functions
    const shapes = [circle, squareInSquare, triangle, triangleInTriangle, rectangleCrossing, curvyLines];
    for (let i = 0; i < width; i += elWidth) {
        for (let j = 0; j < height; j += elHeight) {
            const startX = i;
            const startY = j;
            const shapeArgs = [ctx, startX, startY, elWidth, elHeight, colors];
            ctx.save();
            shapes[randomOne(shapes)].apply(null, shapeArgs);
            ctx.restore();
        }
    }
}

// shape functions
function circle(ctx, startX, startY, elWidth, elHeight, colors) {
    // get the minimum, height or width of box
    const minDimension = Math.min(elWidth, elHeight);
    ctx.beginPath();
    ctx.arc((elWidth / 2) + startX, (elHeight / 2) + startY, minDimension / 2, 0, 2 * Math.PI, false);
    ctx.fillStyle = colors[randomOne(colors)];
    ctx.fill();
}

function squareInSquare(ctx, startX, startY, elWidth, elHeight, colors) {
    ctx.fillStyle = colors[randomOne(colors)];
    ctx.fillRect(startX, startY, elWidth, elHeight);
    ctx.clearRect((elWidth * 0.1) + startX, (elHeight * 0.1) + startY, elWidth * 0.8, elHeight * 0.8);
    ctx.strokeStyle = colors[randomOne(colors)];
    ctx.lineWidth = elWidth * 0.07;
    ctx.strokeRect((elWidth * 0.3) + startX, (elHeight * 0.3) + startY, elWidth * 0.4, elHeight * 0.4);
}

function triangle(ctx, startX, startY, elWidth, elHeight, colors) {
    ctx.beginPath();
    ctx.moveTo((elWidth / 2) + startX, startY);
    ctx.lineTo(elWidth + startX, elHeight + startY);
    ctx.lineTo(startX, elHeight + startY);
    ctx.fillStyle = colors[randomOne(colors)];
    ctx.fill();
}

function triangleInTriangle(ctx, startX, startY, elWidth, elHeight, colors) {
    ctx.beginPath();
    ctx.moveTo((elWidth / 2) + startX, elHeight + startY);
    ctx.lineTo(startX, startY);
    ctx.lineTo(elWidth + startX, startY);
    ctx.fillStyle = colors[randomOne(colors)];
    ctx.fill();
    // smaller triangle
    ctx.beginPath();
    ctx.moveTo((elWidth * 0.25) + startX, (elHeight / 2) + startY);
    ctx.lineTo((elWidth * 0.75) + startX, (elHeight / 2) + startY);
    ctx.lineTo((elWidth / 2) + startX, startY);
    ctx.fillStyle = colors[randomOne(colors)];
    ctx.fill();
}

function rectangleCrossing(ctx, startX, startY, elWidth, elHeight, colors) {
    ctx.globalCompositeOperation = 'multiply';

    ctx.fillStyle = colors[randomOne(colors)];
    ctx.fillRect((elWidth * 0.125) + startX, (elHeight * 0.125) + startY, elWidth / 2, elHeight / 2);

    ctx.fillStyle = colors[randomOne(colors)];
    ctx.fillRect((elWidth * 0.375) + startX, (elHeight * 0.375) + startY, elWidth / 2, elHeight / 2);

}

// the next 2 functions draw curvy lines of varying color and thickness
function curvyLines(ctx, startX, startY, elWidth, elHeight, colors) {
    const lines = random(4, 6);
    // get a minimum and miximum fluctuation for curves
    const maxFluctuation = (elHeight / lines) * 0.9;
    const minFluctuation = (elHeight / lines) * 0.3;

    // set the y position for each line
    const ypos = elHeight / lines;

    // clip box so lines dont bleed into neighbors
    ctx.rect(startX, startY, elWidth, elHeight);
    ctx.clip();
    // loop throught lines and draw a curvy one from left to right
    for (let i = 1; i < lines; i++) {
        const fluctuation = random(minFluctuation, maxFluctuation);
        drawCurvyLine(ctx, elWidth, elHeight, startX, startY, ypos * i, fluctuation);
    }
}

function drawCurvyLine(ctx, elWidth, elHeight, startX, startY, ypos, fluctuation) {
    // initialize variables curves, curveLength, bump
    const curves = random(4, 10);
    const curveLength = elWidth / curves;
    let bump = curveLength / 2;

    // styles
    ctx.strokeStyle = colors[randomOne(colors)];
    const minLineWidth = elHeight * 0.01;
    const maxLineWidth = elHeight * 0.07;
    ctx.lineWidth = random(minLineWidth, maxLineWidth);

    ctx.beginPath();
    ctx.moveTo(startX, ypos + startY);

    for (let i = 1; i <= curves; i++) {
        let curveUp = false;
        fluctuation = curveUp ? fluctuation : fluctuation * -1;
        ctx.quadraticCurveTo(bump + startX, fluctuation + ypos + startY, curveLength * i + startX, ypos + startY);
        bump += curveLength;
        curveUp = !curveUp;
    }
    ctx.stroke();
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomOne(array) {
    return Math.floor(Math.random() * array.length);
}

// splitText takes a string and returns an array of strings less that num
// meant to break up long title lines
function splitText(str, num) {
    const arr = [];
    const parts = str.split(' ');
    let newStr = '';

    for (let i = 0; i < parts.length; i++) {
        if (parts[i].length > num) {
            if (newStr.length > 0 && newStr[0] !== ' ') {
                arr.push(newStr + ' ');
            }
            arr.push(parts[i] + ' ');
            newStr = '';
            continue;
        }
        if (newStr.length + parts[i].length > num) {
            arr.push(newStr);
            newStr = '';
            i--;
        } else {
            newStr += parts[i] + ' ';
        }
    }
    if (newStr.length > 0) {
        arr.push(newStr);
    }
    return arr.map(line => line.trim());
}
