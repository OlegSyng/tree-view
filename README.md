# React Explorer: Tree View 

This app provides Tree View File structure of current project.

Please select your preffered authorization level from header navigation bar under dropdown User button.
Here you will find 3 levels of authorization: `guest`, `basic` and `admin`. Based on selection different
data levels avaliable for user's view.

### 1. Backend API response mockup

Example of Backend API response is located in `public/data.json` file.
In production I would suggest to design an API that on user click will send POST request with appropriate 
item id and level of clicked folder, so API reponse will return only set of data which have common parentId and level + 1 attributes. Such approach will provide less data needed on initial load, authorization of user will be secure as with request to Backend API client submits custom header with token, which server could read and assign allowed data to return.

Example of request to provide all svg files under assets folder: 

```json Provide all svg from assets folder
{
  "operator":"AND",
  "criterias":[
      {
          "field":"parentId",
          "value": 31,
          "qualifier":"="
      },
      {
          "field":"name",
          "value":"%svg",
          "qualifier":"LIKE"
      }
  ]
}
```

### 2. TreeView.tsx

A tree is recursive data type. What does this mean? Just as a recursive function makes calls to itself, a recursive data type has references to itself. Single tree node has a defined data type like any other defined data type. It is a compound data type that includes whatever information the programmer would like it to incorporate. If the tree were a tree of folders, each node in the tree might contain a string for a folder's name, an string of it's extension, etc. In addition, however, each node in the tree would contain pointers to other trees. 

### 3. Tree-view state

Component TreeView.tsx as any file explorer simulates typical states:
  1. Empty folders doestn't have a pointer to its expand folder;
  2. Active container indicated with open folder svg;
  3. Search result for file or folder is hightlighted;

### 4. Search for files or folders

Searching functionality is querying all the node with recursive function and returns first matched result. 
This implementation approach has been taken as we have all avaliable data in hands. Preparing search component
for production purposes I would pick backend API POST request approach with queried value name and manage on server response to be sent to client bearing in mind authorization level of curren user.


### React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Taiwind CSS 

Tailwind CSS works by scanning all of your HTML files, JavaScript components, and any other templates for class names, generating the corresponding styles and then writing them to a static CSS file.

It's fast, flexible, and reliable — with zero-runtime.
