import { NextApiRequest, NextApiResponse } from 'next';

export default function pullHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      executeQuery({ query, values: [id] })
        .then((res) => {
          const queryResult = res;
          const data = JSON.parse(JSON.stringify(queryResult));
          res.status(200).json({ data });
        })
        .catch((err) => {
          console.error(err);
        });
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
