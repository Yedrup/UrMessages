import React, { Component } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { formatMetaTitle } from '../../components/Meta';
import styled from 'styled-components';

const StyledTitle = styled.h1`
  text-transform: capitalize;
`;

class MessagesPage extends Component {
  render() {
    const { title, headTitle, children } = this.props;
    if (!children) return <p>No Messages to display</p>;
    return (
      <div>
        <Head> {headTitle && <title>{formatMetaTitle(headTitle)}</title>}</Head>
        <StyledTitle>{title}</StyledTitle>
        {children}
      </div>
    );
  }
}
export default MessagesPage;

MessagesPage.propTypes = {
  title: PropTypes.string,
  headTitle: PropTypes.string,
  children: PropTypes.array,
};
