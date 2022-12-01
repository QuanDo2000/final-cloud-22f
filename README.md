# final_cloud_22f

Final Project for CS6065: Cloud Computing in the Fall of 2022.

## MySQL Files

- The MySQL files used to populate the Database in `seed.js` file are too large so they are not included on Github.
- Populating the Database will take VERY LONG because of the 100MB file. Therefore, only run `seed.js` if there is no other option.
- After placing the correct files into the `mysql` folder, run the following commands starting from root directory of project.

```bash
cd mysql
node seed.js
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## References

- Login Example <https://github.com/vercel/next.js/tree/canary/examples/with-iron-session>
- Signin template from MUI <https://github.com/mui/material-ui/blob/v5.10.16/docs/data/material/getting-started/templates/sign-in/SignIn.tsx>
- Deploy options <https://stackoverflow.com/questions/68470162/how-to-archive-files-in-artifact-for-github-workflow-actions-in-order-to-fix-thi>
- CSV to MySQL + Upload MySQL <https://www.positronx.io/node-import-csv-file-data-to-mysql-database-with-html-form/>
