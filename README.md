# Pictures Management Tool - Backend

## Description

Pictures Management Tool is a backend application built using Nest.js, a TypeScript framework for building scalable and maintainable server-side applications. This tool allows users to organize and store photographs by creating folders and subfolders.


## Installation

Follow these steps to install and start the server:

1. Clone the repository:

   
   ```bash
   git clone https://github.com/Backslash-7/PictureManagementAPI

   ```
2. Navigate to the project directory:

```bash
     cd PictureManagementAPI
```
  
3. Install dependencies:
```bash
    npm install
```



## Running Application 

```bash

npm run start:dev //For Dev Mode

```


## APIs

1. Create a Folder

POST Request: http://localhost:3000/folders/
Request Format:
```bash
{
  "folderName": "RootFolderName";
}
```

2. Upload Image in a Folder

POST Request: http://localhost:3000/folders/:folderId/upload

3. Create Sub-folders

POST Request: http://localhost:3000/folders/:parentFolderId/subfolders
Request Format:
```bash
{
    "subfolderName" : "SubFolderName"
}
```

4. List all Folder Content

GET Request: http://localhost:3000/folders/:folderId/contents
