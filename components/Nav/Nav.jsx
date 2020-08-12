import Link from 'next/link';
import { useRouter } from 'next/router';
import NavStyled from './NavStyled';

const Nav = () => {
  const router = useRouter();
  const { asPath: currentPath } = router;

  const getActiveClass = (currentPath, linkPath) =>
    currentPath === linkPath ? 'link--active' : '';

  return (
    <NavStyled>
      <li>
        <Link href="/">
          <a className={`link ${getActiveClass(currentPath, '/')}`}>🏡 Home</a>
        </Link>
      </li>
      <li>
        <Link href="/messages/[type]" as={`/messages/public`}>
          <a
            className={`link ${getActiveClass(
              currentPath,
              '/messages/public'
            )}`}
          >
            📣 Public
          </a>
        </Link>
      </li>
      <li>
        <Link href="/messages/[type]" as={`/messages/private`}>
          <a
            className={`link ${getActiveClass(
              currentPath,
              '/messages/private'
            )}`}
          >
            🔒 Private
          </a>
        </Link>
      </li>
    </NavStyled>
  );
};

export default Nav;
