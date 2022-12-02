import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useUser from '../../lib/useUser';
import Layout from '../../components/Layout';
import executeQuery from '../../lib/db';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { GetStaticPaths, GetStaticProps } from 'next';
import Router from 'next/router';

const columns: GridColDef[] = [
  { field: 'Hshd_num', headerName: 'Hshd_num' },
  { field: 'Basket_num', headerName: 'Basket_num' },
  { field: 'Date', headerName: 'Date' },
  { field: 'Product_num', headerName: 'Product_num' },
  { field: 'Department', headerName: 'Department' },
  { field: 'Commodity', headerName: 'Commodity' },
  { field: 'Spend', headerName: 'Spend' },
  { field: 'Units', headerName: 'Units' },
  { field: 'Store_region', headerName: 'Store_region' },
  { field: 'Week_num', headerName: 'Week_num' },
  { field: 'Year', headerName: 'Year' },
  { field: 'Loyalty_flag', headerName: 'Loyalty_flag' },
  { field: 'Age_range', headerName: 'Age_range' },
  { field: 'Marital_status', headerName: 'Marital_status' },
  { field: 'Income_range', headerName: 'Income_range' },
  { field: 'Homeowner_desc', headerName: 'Homeowner_desc' },
  { field: 'Hshd_composition', headerName: 'Hshd_composition' },
  { field: 'Hshd_size', headerName: 'Hshd_size' },
  { field: 'Children', headerName: 'Children' },
];

export const getStaticProps: GetStaticProps = async (context) => {
  const query = 'SELECT * FROM data_pull WHERE Hshd_num = ?;';
  let value;
  if (context.params && context.params.id) {
    value = context.params.id;
  } else {
    value = 10;
  }
  const queryResult = await executeQuery({ query, values: [value] });

  const rows = JSON.parse(JSON.stringify(queryResult));

  return {
    props: {
      rows,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const query = 'SELECT Hshd_num FROM household;';
  const queryResult = await executeQuery({ query, values: [] });

  const data = JSON.parse(JSON.stringify(queryResult));

  const paths = data.map((row: { Hshd_num: number }) => ({
    params: {
      id: row.Hshd_num.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default function DataPull({ rows }: { rows: JSON[] }) {
  useUser({
    redirectTo: '/',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const id = event.currentTarget.hshd_num.value;

    Router.push(`/data/${id}`);
  };

  return (
    <Layout>
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '85vh',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h4">
            Data Pull
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ paddingTop: '1rem' }}
          >
            <TextField
              required
              defaultValue="10"
              label="Hshd_num"
              id="hshd_num"
              size="small"
              sx={{ width: '8rem', paddingRight: '1rem' }}
            />
            <Button variant="contained" type="submit">
              Query
            </Button>
          </Box>
          <div style={{ width: '100%', paddingTop: '1rem', height: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={20}
              rowsPerPageOptions={[20]}
              getRowId={(row) =>
                row.Hshd_num * row.Basket_num * row.Product_num
              }
            />
          </div>
        </Box>
      </Container>
    </Layout>
  );
}
