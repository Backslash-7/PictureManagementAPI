# Pictures Management Tool - Backend

## Description

Pictures Management Tool is a backend application built using Nest.js, a TypeScript framework for building scalable and maintainable server-side applications. This tool allows users to organize and store photographs by creating folders and subfolders.

## Prerequisite

1. Install dependencies:
    ```bash
    npm install
    ```
2. Install Nest Js
    ```bash
    npm i -g @nestjs/cli
    ```

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



## Running Application 

```bash

npm run start:dev //For Dev Mode

```


## APIs

1. Create a Folder


```bash

POST Request
http://localhost:3000/folders/

Request Format:

{
  "folderName": "RootFolderName";
}
```



2. Upload Image in a Folder

```bash
POST Request
http://localhost:3000/folders/:folderId/upload
```


3. Create Sub-folders

```bash

POST Request
http://localhost:3000/folders/:parentFolderId/subfolders

Request Format:
{
    "subfolderName" : "SubFolderName"
}
```

4. List all Folder Content

```bash
GET Request
http://localhost:3000/folders/:folderId/contents
```

5. Swagger

```bash
http://localhost:3000/api/
```