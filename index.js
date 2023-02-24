const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Text (up to 3 characters): ', function(text) {
  rl.question('Text color (color keyword or hexadecimal number): ', function(textColor) {
    rl.question('Shape (circle, triangle, or square): ', function(shape) {
      rl.question('Shape color (color keyword or hexadecimal number): ', function(shapeColor) {
        const svg = createSvg(text, textColor, shape, shapeColor);
        fs.writeFile('logo.svg', svg, function(error) {
          if (error) throw error;
          console.log('Generated logo.svg');
        });
        rl.close();
      });
    });
  });
});

function createSvg(text, textColor, shape, shapeColor) {
  let shapeElement;
  switch (shape) {
    case 'circle':
      shapeElement = `<circle cx="150" cy="100" r="50" fill="${shapeColor}"/>`;
      break;
    case 'triangle':
      shapeElement = `<polygon points="150,50 250,150 50,150" fill="${shapeColor}"/>`;
      break;
    case 'square':
      shapeElement = `<rect x="75" y="50" width="150" height="100" fill="${shapeColor}"/>`;
      break;
    default:
      throw new Error('Invalid shape');
  }
  
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
      ${shapeElement}
      <text x="150" y="125" fill="${textColor}" font-size="48" font-weight="bold" text-anchor="middle">${text}</text>
    </svg>
  `;
  
  return svg;
}
