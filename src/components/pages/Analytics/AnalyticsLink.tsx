import React, { FC } from 'react';
import styled from 'styled-components';
import { ButtonLink } from '../../core/Button';

const Link = styled(ButtonLink)`
  padding: 4px 8px;
  text-transform: none;
`;

export const AnalyticsLink: FC<{}> = () => (
  <Link href="/analytics">
    <span role="img" aria-label="chart">
      📊
    </span>{' '}
    View analytics
  </Link>
);
