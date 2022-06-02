import Head from "next/head";
import {Box} from "@chakra-ui/react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({children}) {
    return (
        <>
        <Head>
            <title>Meti Real state</title>
        </Head>
            <Box maxWidth={1280} m={"auto"}>
                <header>
                    <Navbar/>
                </header>
                <main>
                    {children}
                </main>
                <footer>
                    <Footer/>
                </footer>
            </Box>
        </>
    );
}

export default Layout;