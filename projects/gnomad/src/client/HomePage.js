import React from 'react'
import styled from 'styled-components'

import { ExternalLink } from '@broad/ui'

import DocumentTitle from './DocumentTitle'
import InfoPage from './InfoPage'
import Link from './Link'
import Searchbox from './Searchbox'
import GnomadHeading from './GnomadHeading'

const HomePage = styled(InfoPage)`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 740px;
  margin-top: 90px;
`

const HeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 40px;
`

const SubHeading = styled.h2`
  padding-top: 0;
  padding-bottom: 0;
  font-size: 1.2em;
  font-weight: lighter;
  letter-spacing: 2px;
  text-align: center;
`

export default () => (
  <HomePage>
    <DocumentTitle />
    <HeadingContainer>
      {/* <GnomadHeading width="60%" /> */}
      <img src="http://www.leklab.org/wp-content/uploads/2019/08/decepticons.jpg" width="25%" height="25%"></img>
      <SubHeading>gnomAD mito beta browser</SubHeading>
      <Searchbox width="100%" />
      <p>
        Examples - Gene:{' '}
        <Link preserveSelectedDataset={false} to="/gene/MT-CO1">
          MT-CO1
        </Link>
        , Variant:{' '}
        <Link preserveSelectedDataset={false} to="/variant/MT-5951-A-G">
          MT-5951-A-G
        </Link>
      </p>
    </HeadingContainer>

  </HomePage>
)
