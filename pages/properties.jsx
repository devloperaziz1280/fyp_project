import React from 'react'
import Head from 'next/head'
import { getApartments } from '@/services/blockchain'
import { Collection } from '@/components'
//import { Main } from 'next/document'

const Properties = ({ apartmentsData }) => {
  // apartmentsData is provided by getServerSideProps as a prop
  return <Collection appartments={apartmentsData} />
}

export default Properties

export const getServerSideProps = async () => {
  const apartmentsData = await getApartments()

  return {
    props: {
      apartmentsData: JSON.parse(JSON.stringify(apartmentsData)),
    },
  }
}
