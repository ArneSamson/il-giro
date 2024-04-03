import React from 'react';
import { Page, Text, View, Document, StyleSheet, BlobProvider } from '@react-pdf/renderer';

import useConfigStore from "../../../store/useConfigStore";

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#fafafa'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

console.log(useConfigStore);


export function MyDocument({ props }) {

    return (

        <Document>
            <Page size="A4" style={styles.page}>
                <Text>
                    {props.title}
                </Text>
                <Text break>
                    {props.content}
                </Text>
            </Page>
        </Document>
    );
};

export default MyDocument;