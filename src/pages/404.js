import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const Page404Styled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LinksParentStyled = styled.div`
  display: flex;
  justify-content: center;
`;

const LinkStyled = styled.button`
  margin: 1rem;
  font-size: 2rem;
`;

const Custom404 = () => {
  const router = useRouter();
  return (
    <Page404Styled>
      <h1>404 | Page Not found!</h1>
      <LinksParentStyled>
        <LinkStyled
          className="c-button"
          onClick={() => {
            router.back();
          }}
        >
          ← Back
        </LinkStyled>
        <Link href="/" passHref>
          <LinkStyled className="c-button">🏡 Home</LinkStyled>
        </Link>
      </LinksParentStyled>
    </Page404Styled>
  );
};

export default Custom404;
