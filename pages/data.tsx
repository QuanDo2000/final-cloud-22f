import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useUser from '../lib/useUser';
import Layout from '../components/Layout';

export default function DataPull() {
  const { user } = useUser({
    redirectTo: '/',
  });

  return (
    <Layout>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4">
            Data Pull
          </Typography>
        </Box>
      </Container>
    </Layout>
  );
}
