import React from 'react';
import { Page, Text, View, Document, StyleSheet, BlobProvider, Image, Font } from '@react-pdf/renderer';

// Font.register({ family: 'Kaisei Decol', src: '/fonts/KaiseiDecol-Regular.ttf' });
Font.register({ family: 'calibri', src: '/fonts/calibri.ttf' });

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#fafafa',
        fontSize: 11,
        padding: 50,
        width: '100%',
        gap: 40,
    },

    heading: {

    },

    options: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignContent: 'space-between',
        gap: 20,

    },
    model: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignContent: 'space-between'
    },
    modelTitle: {
        // fontSize: 11,
    },
    optionsTitle: {
        width: 100,
    },
    modelOptions: {
        display: 'flex',
        flexDirection: 'column',
        border: '2px solid black',
        width: '100%', // Set width to 100%
    },
    modelOption: {
        display: 'flex',
        flexDirection: 'row',
        borderBottom: '1px solid black',
        padding: 5,
    },

    appliances: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignContent: 'space-around'
    },

    applianceOptions: {
        display: 'flex',
        flexDirection: 'column',
        border: '2px solid black',
        width: '100%', // Set width to 100%
    },

    applianceOption: {
        display: 'flex',
        flexDirection: 'row',
        borderBottom: '1px solid black',
        padding: 5,
    },

    table: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignContent: 'space-between',
    },
    row: {
        width: '100%',
        flexDirection: 'row',
    },
    cell: {
        width: '100%',
        border: '1px solid black',
    },
    cellContent: {
        paddingLeft: 8,
        paddingTop: 6,
        textAlign: 'left',
    },

});

export function MyDocument({ props }) {

    return (

        <Document
            title="Order Overview"
            author="Arne Samson"
            subject="Order Overview"
            keywords="order, overview, il giro"
            language='en'
        >
            <Page size="A4" style={styles.page} wrap={true}>

                <View
                    style={styles.heading}
                >
                    <View
                        style={styles.table}
                    >
                        <View
                            style={[styles.row, { width: '100%', height: 100 }]}
                        >
                            <View
                                style={[styles.cell, { width: 'auto', height: 100 }]}
                            >
                                <Image
                                    style={{ padding: 10 }}
                                    src='/images/UI/Logo_SR_Black.png'
                                    source={'./images/UI/Logo_SR_Black.png'}
                                />
                            </View>

                            <View
                                style={styles.cell}
                            >
                                <View
                                    style={styles.row}
                                >
                                    <View
                                        style={styles.cell}
                                    >
                                        <Text
                                            style={styles.cellContent}
                                        >
                                            PURCHASE ORDER IL GIRO
                                        </Text>
                                    </View>

                                    <View
                                        style={styles.cell}
                                    >
                                        <Text
                                            style={styles.cellContent}
                                        >
                                            date :
                                        </Text>
                                    </View>

                                </View>
                                <View
                                    style={styles.row}
                                >
                                    <View
                                        style={styles.cell}
                                    >
                                        <Text
                                            style={styles.cellContent}
                                        >
                                            reference :
                                        </Text>
                                    </View>

                                    <View
                                        style={styles.cell}
                                    >
                                        <Text
                                            style={styles.cellContent}
                                        >

                                            ...
                                        </Text>
                                    </View>

                                </View>
                            </View>

                        </View>

                        <View
                            style={[styles.row, { width: '100%', height: 100 }]}
                        >
                            <View
                                style={styles.cell}
                            >
                                <Text
                                    style={styles.cellContent}
                                >
                                    customer :
                                </Text>
                            </View>

                            <View
                                style={styles.cell}
                            >
                                <Text
                                    style={styles.cellContent}
                                >
                                    delivery adress :
                                </Text>
                            </View>

                            <View
                                style={styles.cell}
                            >
                                <Text
                                    style={styles.cellContent}
                                >
                                    delivery week :
                                </Text>
                            </View>
                        </View>

                    </View>

                </View>

                <View
                    style={styles.options}
                >

                    <View
                        style={styles.model}
                    >
                        <Text
                            style={styles.optionsTitle}
                        >
                            model :
                        </Text>

                        <View
                            style={styles.modelOptions}
                        >
                            <View
                                style={styles.modelOption}
                            >
                                <Text>
                                    model name : {props.chosenModules}
                                </Text>
                            </View>

                            <View
                                style={styles.modelOption}
                            >
                                <Text>
                                    material type : {props.mainMaterial.name}
                                </Text>
                            </View>

                            <View
                                style={styles.modelOption}
                            >
                                <Text>
                                    finish color :
                                </Text>
                            </View>

                            <View
                                style={[styles.modelOption, { borderBottom: '2px solid black' }, { borderTop: '2px solid black' }]}
                            >
                                <Text>
                                    type of handle :
                                </Text>
                            </View>

                            <View
                                style={styles.modelOption}
                            >
                                <Text>
                                    ceiling panel :
                                </Text>
                            </View>

                            <View
                                style={styles.modelOption}
                            >
                                <Text>
                                    LED lighting :
                                </Text>
                            </View>

                            <View
                                style={[styles.modelOption, { borderBottom: 'none' }]}
                            >
                                <Text>
                                    countertop : {props.tableTopMaterial.name}
                                </Text>
                            </View>

                        </View>

                    </View>

                    <View
                        style={styles.appliances}
                    >
                        <Text
                            style={styles.optionsTitle}
                        >
                            appliances :
                        </Text>

                        <View
                            style={styles.applianceOptions}
                        >
                            <View
                                style={styles.applianceOption}
                            >
                                <Text>
                                    type of wine cooler:
                                </Text>
                            </View>

                            <View
                                style={styles.applianceOption}
                            >
                                <Text>
                                    type of refrigerator :
                                </Text>
                            </View>

                            <View
                                style={styles.applianceOption}
                            >
                                <Text>
                                    type of cooking fire :
                                </Text>
                            </View>

                            <View
                                style={styles.applianceOption}
                            >
                                <Text>
                                    type of sink :
                                </Text>

                            </View>

                            <View
                                style={[styles.applianceOption, { borderBottom: 'none' }]}
                            >
                                <Text>
                                    type of faucet :
                                </Text>

                            </View>

                        </View>

                    </View>

                </View>
            </Page>
        </Document >
    );
};

export default MyDocument;