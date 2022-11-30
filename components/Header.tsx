import Link from 'next/link';
import { useRouter } from 'next/router';
import fetchJson from '../lib/fetchJson';
import useUser from '../lib/useUser';
import styles from './Header.module.css';

export default function Header() {
  const { user, mutateUser } = useUser();
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.headerUl}>
        <div className={styles.headerRight}>
          <Link href="/" legacyBehavior>
            <a className={styles.headerA}>Home</a>
          </Link>
        </div>
        {user?.isLoggedIn === true && (
          <div className={styles.headerLeft}>
            <a className={styles.headerA}>Hello, {user.username}</a>
            <Link
              className={styles.headerA}
              href="/api/logout"
              onClick={async (e) => {
                e.preventDefault();
                mutateUser(
                  await fetchJson('/api/logout', { method: 'POST' }),
                  false
                );
                router.push('/');
              }}
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
