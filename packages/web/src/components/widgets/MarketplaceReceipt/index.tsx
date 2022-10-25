//react-pdf does not support alt in Image: https://react-pdf.org/components#image
/* eslint-disable jsx-a11y/alt-text */
import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import React from 'react'
import { TransactionReceipt } from 'web3-core'

export type InvoiceTxnProps = {
  amount: string
  transactionHash: string
  created: string
  type: string
  wellName?: string
  wellLocation?: string
}

type TransactionReceiptPlus = TransactionReceipt & {
  effectiveGasPrice?: number
}

type Props = {
  receipt: TransactionReceiptPlus
  transaction: InvoiceTxnProps
  hash: string
}

const MyDocument: React.FC<Props> = ({ receipt, transaction, hash }) => {
  const BUYAMOUNT = 30
  const celoGasPrice = receipt.effectiveGasPrice / 10 ** 18
  Font.register({ family: 'Lato', src: '/assets/Lato-Regular.ttf' })
  Font.register({ family: 'Lato-Bold', src: '/assets/Lato-Bold.ttf' })
  Font.register({ family: 'Montserrat-Bold', src: '/assets/Montserrat-Bold.ttf' })

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      padding: '36 40 48',
      fontSize: '10',
      textAlign: 'left',
      lineHeight: 2.5,
      color: '#000000',
    },
    section: {
      display: 'flex',
      flexDirection: 'column',
      zIndex: 20,
      marginTop: '36',
    },
    sectionTitle: {
      fontFamily: 'Montserrat-Bold',
      marginBottom: 8,
    },
    info: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    item: {
      fontFamily: 'Lato',
      color: '#606060',
    },
    itemMain: {
      fontFamily: 'Lato',
      color: '#606060',
      lineHeight: 1.5,
    },
    itemInfo: {
      fontFamily: 'Lato',
      color: '#606060',
      fontSize: '8',
      lineHeight: 1.5,
      marginLeft: 8,
    },
    itemContent: {
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Lato-Bold',
      color: '#000000',
      alignItems: 'flex-end',
      lineHeight: 1.75,
    },
    logo: {
      width: '90',
      height: '20',
      zIndex: 20,
      marginBottom: '12',
    },
    cornerHexagons: {
      position: 'absolute',
      right: 0,
      minWidth: '100%',
      minHeight: '100%',
      display: 'flex',
      width: '255',
      height: '255',
      zIndex: 10,
    },
  })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image src="/images/receiptLogo.png" style={styles.logo} />
        <Image src="/images/receipthexagons.png" style={styles.cornerHexagons} />

        <View id="GeneralInfo" style={styles.section}>
          <Text style={styles.sectionTitle}>GENERAL INFO</Text>

          <View style={styles.info}>
            <Text style={styles.item}>
              {transaction !== undefined && transaction.type === 'retire'
                ? 'Token amount retired'
                : 'Token amount purchased'}
            </Text>
            <Text style={styles.itemContent}>
              {transaction !== undefined ? transaction.amount : 'N/A'}
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.item}>Transaction hash</Text>
            <Text style={styles.itemContent}>{hash}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.item}>Timestamp</Text>
            <Text style={styles.itemContent}>
              {transaction !== undefined
                ? transaction.created.substring(8, 10) +
                  '.' +
                  transaction.created.substring(5, 7) +
                  '.' +
                  transaction.created.substring(2, 4) +
                  '. ' +
                  transaction.created.substring(11, 19) +
                  ' UTC'
                : 'N/A'}
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.item}>Status</Text>
            <Text style={styles.itemContent}>
              {receipt !== undefined && receipt.status ? 'Confirmed' : 'Pending'}
            </Text>
          </View>

          {transaction !== undefined && transaction.type === 'retire' && (
            <>
              <View style={styles.info}>
                <Text style={styles.item}>Well name</Text>
                <Text style={styles.itemContent}>{transaction.wellName}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.item}>Location</Text>
                <Text style={styles.itemContent}>{transaction.wellLocation}</Text>
              </View>
            </>
          )}
        </View>

        <View id="AdditionalInfo" style={styles.section}>
          <Text style={styles.sectionTitle}>ADDITIONAL INFO</Text>

          <View style={styles.info}>
            <Text style={styles.item}>Block</Text>
            <Text style={styles.itemContent}>
              {receipt !== undefined ? receipt.blockNumber : 'N/A'}
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.item}>From</Text>
            <Text style={styles.itemContent}>{receipt !== undefined ? receipt.from : 'N/A'}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.item}>Interacted With (To)</Text>
            <Text style={styles.itemContent}>{receipt !== undefined ? receipt.to : 'N/A'}</Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.item}>Tokens Transfered</Text>
            {transaction !== undefined && transaction.type === 'retire' ? (
              <View style={styles.itemContent}>
                <Text>From: {receipt !== undefined ? receipt.from : 'N/A'}</Text>
                <Text>
                  To: {receipt !== undefined ? '0x' + '0'.repeat(receipt.from.length - 4) : 'N/A'}
                </Text>
                <Text>For: {transaction.amount} $CPC02e</Text>
              </View>
            ) : (
              transaction !== undefined &&
              transaction.type === 'purchase' && (
                <View style={styles.itemContent}>
                  <Text>From: {receipt !== undefined ? receipt.to : 'N/A'}</Text>
                  <Text>To: {receipt !== undefined ? receipt.from : 'N/A'}</Text>
                  <Text>For: {transaction.amount} $CPC02e</Text>

                  <Text>From: {receipt !== undefined ? receipt.from : 'N/A'}</Text>
                  <Text>
                    To:{' '}
                    {receipt !== undefined
                      ? '0x' + receipt.logs[0].topics[2].slice(2).replace(/^0+/, '')
                      : 'N/A'}
                  </Text>
                  <Text>
                    For:{' '}
                    {receipt !== undefined ? parseFloat(transaction.amount) * BUYAMOUNT : 'N/A'}{' '}
                    cUSD
                  </Text>
                </View>
              )
            )}
          </View>

          <View style={styles.info}>
            <Text style={styles.item}>Transaction Type</Text>
            <Text style={styles.itemContent}>
              {transaction !== undefined && transaction.type === 'retire' ? 'Retire' : 'Purchase'}
            </Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.item}>Gas Price</Text>
            <Text style={styles.itemContent}>
              {receipt !== undefined ? (receipt.effectiveGasPrice / 10 ** 18).toFixed(10) : 'N/A'}
              {' CELO'}
            </Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.item}>Gas Used by Transaction</Text>
            <Text style={styles.itemContent}>
              {receipt !== undefined ? receipt.gasUsed.toLocaleString() : 'N/A'}
            </Text>
          </View>

          <View style={styles.info}>
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Text style={styles.itemMain}>Transaction Fee</Text>
              <Text style={styles.itemInfo}>
                {'Combined gas fee used for 2 transactions:\n (i) allowance increase \n (ii) ' +
                  `${
                    transaction !== undefined && transaction.type === 'retire' ? 'retire' : 'buy'
                  }` + ' transaction'}
              </Text>
            </View>

            <Text style={styles.itemContent}>
              {receipt !== undefined
                ? (receipt.cumulativeGasUsed * celoGasPrice).toFixed(10)
                : 'N/A'}{' '}
              CELO
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default MyDocument
