import {useState} from "react";
import {useRouter} from "next/router";
import {Box, Flex, Icon, Text} from "@chakra-ui/react";
import { BsFilter } from 'react-icons/bs';
import SearchFilters from "../components/SearchFilters";
import Property from "../components/Property";
import Image from "next/image";
import noResult from '../assets/noresult.svg'
import {baseUrl, fetchApi} from "../utils/fetchApi";
function Search({properties}) {
    const [searchFilters,setSearchFilters]=useState(false)
    const router=useRouter()
    return (
        <Box>
            <Flex cursor={"pointer"} bg={"gray.100"} borderBottom={1}
            borderColor={"gray.200"} p={2} fontWeight={"black"} fontSize={"large"}
            justifyContent={"center"} alignItems={"center"}
            onClick={()=>setSearchFilters((prevState => !prevState))}>
                <Text>Search property by Filters</Text>
                <Icon pl={2} w={7} as={BsFilter}></Icon>
            </Flex>
            {searchFilters&&<SearchFilters/>}
            <Text fontSize={'2xl'} p={4} fontWeight={"bold"}>
                Properties {router.query.purpose}
            </Text>
            <Flex flexWrap={"wrap"}>
                {properties.map((property) => <Property property={property} key={property.id} />)}
            </Flex>
            {properties?.length===0&&<Flex justifyContent={"center"} alignItems={"center"} flexDirection={"column"} marginTop={5} mb={5}>
                <Image alt={'no result'} src={noResult}/>
                <Text fontSize={'2xl'} mt={3}>No results found</Text>
            </Flex>}
        </Box>
    );
}
export async function getServerSideProps(context) {
    let data;
        const purpose = context.query.purpose || 'for-rent';
        const rentFrequency = context.query.rentFrequency || 'yearly';
        const minPrice = context.query.minPrice || '0';
        const maxPrice = context.query.maxPrice || '1000000';
        const roomsMin = context.query.roomsMin || '0';
        const bathsMin = context.query.bathsMin || '0';
        const sort = context.query.sort || 'price-desc';
        const areaMax = context.query.areaMax || '35000';
        const locationExternalIDs = context.query.locationExternalIDs || '5002';
        const categoryExternalID = context.query.categoryExternalID || '4';

         data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);

     return {
        props: {
            properties: data?.hits,
        },
    };
}
export default Search;