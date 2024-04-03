import React from 'react';
import { Page, Text, View, Document, StyleSheet, BlobProvider, Image, Font } from '@react-pdf/renderer';

Font.register({ family: 'Kaisei Decol', src: '/fonts/KaiseiDecol-Regular.ttf' });

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#fafafa'
    },
    section: {
        margin: 10,
        padding: 10,
    },
    subsection: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    title: {
        fontFamily: 'Kaisei Decol',
        fontSize: 42,
        fontWeight: 400,
        marginBottom: 10
    },
    subtitle: {
        fontFamily: 'Kaisei Decol',
        fontSize: 24,
        marginBottom: 5
    },
    value: {
        fontSize: 12
    },

    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',

    },

    banner: {
        width: '100%',
        height: 300,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20
    },
    bannerTitle: {
        fontSize: 70,
        fontWeight: 400,
        color: '#272727',
        fontFamily: 'Kaisei Decol'
    },
    heroImage: {
        width: 'auto',
        height: 200
    }
});

export function MyDocument({ props }) {

    return (

        <Document>
            <Page size="A4" style={styles.page} wrap>

                <View
                    style={styles.banner}
                >
                    <Text
                        style={styles.bannerTitle}
                    >
                        Il Giro
                    </Text>
                    <Image
                        src='/images/UI/hero.png'
                        source={'./images/UI/hero.png'}
                        style={styles.heroImage}
                    />
                </View>

                <View style={styles.section}>
                    <Image
                        src='/images/UI/bg2.png'
                        source={'./images/UI/bg2.png'}
                        style={styles.backgroundImage}
                    />

                    <Text style={styles.title}>Overview of Your Order</Text>

                    <View
                        style={styles.subsection}
                    >
                        <Text style={styles.subtitle}>Main Material:</Text>
                        <Text style={styles.value}>{props.mainMaterial}</Text>
                    </View>

                    <View
                        style={styles.subsection}
                    >
                        <Text style={styles.subtitle}>Table Top Material:</Text>
                        <Text style={styles.value}>{props.tableTopMaterial}</Text>
                    </View>

                    {props.accentMaterial &&
                        <>
                            <View
                                style={styles.subsection}
                            >
                                <Text style={styles.subtitle}>Accent Material:</Text>
                                <Text style={styles.value}>{props.accentMaterial}</Text>
                            </View>
                        </>
                    }

                    <View
                        style={styles.subsection}
                    >
                        <Text style={styles.subtitle}>Chosen Modules:</Text>
                        <Text style={styles.value}>{props.chosenModules}</Text>
                    </View>

                    <View
                        style={styles.subsection}
                    >
                        <Text style={styles.subtitle}>Curved:</Text>
                        <Text style={styles.value}>{props.bevelled}</Text>
                    </View>

                    <View
                        style={styles.subsection}
                    >
                        <Text style={styles.subtitle}>Edge Finish:</Text>
                        <Text style={styles.value}>{props.edgeFinish}</Text>
                    </View>

                    {props.applianceType && (
                        <>
                            <View
                                style={styles.subsection}
                            >
                                <Text style={styles.subtitle}>Appliance Type:</Text>
                                <Text style={styles.value}>{props.applianceType}</Text>
                            </View>
                        </>
                    )}

                    {props.wineStandSize && (
                        <>
                            <View
                                style={styles.subsection}
                            >
                                <Text style={styles.subtitle}>Wine Stand Size:</Text>
                                <Text style={styles.value}>{props.wineStandSize}</Text>
                            </View>
                        </>
                    )}

                    {props.tapType && (
                        <>
                            <View
                                style={styles.subsection}
                            >
                                <Text style={styles.subtitle}>Tap Type:</Text>
                                <Text style={styles.value}>{props.tapType}</Text>
                            </View>
                        </>
                    )}

                    {props.stoveType && (
                        <>
                            <View
                                style={styles.subsection}
                            >
                                <Text style={styles.subtitle}>Stove Type:</Text>
                                <Text style={styles.value}>{props.stoveType}</Text>
                            </View>
                        </>
                    )}
                </View>
            </Page>
        </Document>
    );
};

export default MyDocument;