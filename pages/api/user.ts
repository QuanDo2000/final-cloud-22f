import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from '../../lib/session';
import { withIronSessionApiRoute } from 'iron-session/next';

export type User = {
  isLoggedIn: boolean;
  username: string;
};

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  if (req.session.user) {
    res.json({
      ...req.session.user,
      isLoggedIn: true,
    });
  } else {
    res.json({
      isLoggedIn: false,
      username: '',
    });
  }
}

export default withIronSessionApiRoute(userRoute, sessionOptions);
