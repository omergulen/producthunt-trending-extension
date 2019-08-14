/** @jsx jsx */
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import React from 'react';
import PropTypes from 'prop-types';
import PeriodSelect from './PeriodSelect';
import { ReactComponent as Logo } from '../images/logo.svg';

const TopBar = ({
  onChangePeriod,
  selectedPeriod,
}) => {
  return (
    <Container>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/omergulen/producthunt-trending-extension"
        css={css`
          color: rgba(0, 0, 0, 0.38);
          transition: color 0.5s ease-out;

          &:hover {
            color: rgba(218, 85, 47);
          }
        `}
      >
        <Logo
          height={40}
          width={40}
          fill="currentColor"
          css={css`
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translate(0, -50%);
          `}
        />
      </a>
      <SelectWrapper width={180}>
        <PeriodSelect
          selectedValue={selectedPeriod}
          onChange={onChangePeriod}
        />
      </SelectWrapper>
    </Container>
  );
};

TopBar.propTypes = {
  selectedLanguage: PropTypes.string,
  selectedPeriod: PropTypes.string,
};

export default React.memo(TopBar);

const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 0 16px;
  height: 56px;
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.14),
    0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;

const SelectWrapper = styled.div`
  width: ${props => (props.width ? props.width : 150)}px;
  margin-right: 24px;

  &:last-of-type {
    margin-right: 0;
  }
`;
