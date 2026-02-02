const fs = require('fs');
const path = require('path');

const jsonPath = path.join(process.cwd(), 'public/data/assets.json');
const content = fs.readFileSync(jsonPath, 'utf8');

try {
    JSON.parse(content);
    console.log('JSON is valid');
} catch (e) {
    console.log('JSON is invalid');
    console.log('Error message:', e.message);
    const pos = e.message.match(/position (\d+)/);
    if (pos) {
        const index = parseInt(pos[1]);
        const before = content.substring(Math.max(0, index - 100), index);
        const after = content.substring(index, Math.min(content.length, index + 100));
        console.log('--- Context around error ---');
        console.log(before + ' [[ERROR HERE]] ' + after);

        // Find line number
        const lines = content.substring(0, index).split('\n');
        console.log('Line number:', lines.length);
    }
}
