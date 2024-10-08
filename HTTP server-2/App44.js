const fs = require('fs');
const path = require('path');
 
// Function to delete a folder and its contents
function deleteFolder(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.rmSync(folderPath, { recursive: true, force: true });
    console.log(`Folder '${folderPath}' has been deleted.`);
  } else {
    console.log(`Folder '${folderPath}' does not exist.`);
  }
}
 
// Specify the full folder path
const folderPath = 'C:\\Users\\sjagdale\\Downloads\\demo22';
deleteFolder(folderPath);
 