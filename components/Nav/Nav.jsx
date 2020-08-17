import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { UserStateContext } from '../../contexts/UserContext';
import NavStyled from './NavStyled';
import Connect from './Connect';
import User from '../User';

const Nav = () => {
  const { stateUser } = useContext(UserStateContext);
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
      {stateUser?.isConnected && (
        <>
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
        </>
      )}
      <Connect />
      {stateUser.userId && stateUser.isConnected && (
        <li className="user__avatar">
          <User />
        </li>
      )}
    </NavStyled>
  );
};

export default Nav;
