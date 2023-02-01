import React from "react"
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
const Receipt = () => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });
  return (
    <Document>
    <Page size="A4" style={styles.page}>
      xxx
    </Page>
    </Document>
  )
}
export default Receipt