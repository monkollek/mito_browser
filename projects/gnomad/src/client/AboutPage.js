import React from 'react'
import styled from 'styled-components'
import { ExternalLink, PageHeading } from '@broad/ui'

import DocumentTitle from './DocumentTitle'
import InfoPage from './InfoPage'

const Credits = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 13px;

  @media (max-width: 992px) {
    flex-direction: column;
    font-size: 16px;
  }
`

const CreditsSection = styled.div`
  width: calc(${props => props.width} - 15px);

  @media (max-width: 992px) {
    width: 100%;
  }
`

const ContributorList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  line-height: 1.5;

  ul {
    padding-left: 20px;
    margin: 0.5em 0;
    list-style-type: none;
  }
`

const PrincipalInvestigatorList = styled(ContributorList)`
  columns: 2;

  @media (max-width: 992px) {
    columns: 1;
  }
`

const FundingSourceList = styled(ContributorList)`
  li {
    margin-bottom: 1em;
  }
`

export default () => (
  <InfoPage>
    <DocumentTitle title="About PCGC" />
    <PageHeading id="about-pcgc">About PCGC</PageHeading>
    <p>
      PCGC Placeholder about text
    </p>
  </InfoPage>
)
