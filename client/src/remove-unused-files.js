const fs = require('fs');
const path = require('path');

// List of unused files (manually identified)
const unusedFiles = [
  'src/hooks/useGoBack.ts',
  
];

// Function to delete a file
function deleteFile(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`Deleted: ${filePath}`);
  } else {
    console.log(`File not found: ${filePath}`);
  }
}

// Delete all unused files
unusedFiles.forEach((file) => {
  const fullPath = path.join(__dirname, file);
  deleteFile(fullPath);
});