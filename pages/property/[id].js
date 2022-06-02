import React from 'react';
import {Avatar, Box, Flex, Text} from "@chakra-ui/react";
import {baseUrl, fetchApi} from "../../utils/fetchApi";
import ImageScrollBar from "../../components/ImageScrollBar";
import {GoVerified} from "react-icons/go";
import millify from "millify";
import {FaBath, FaBed} from "react-icons/fa";
import {BsGridFill} from "react-icons/bs";

function PropertyDetails({ propertyDetails: { price, rentFrequency, rooms, title, baths, area, agency, isVerified, description, type, purpose, furnishingStatus, amenities, photos } }) {
    return(
    <Box maxW={1000} m={"auto"} p={4}>
        {photos&&<ImageScrollBar data={photos}/>}
        <Box w={"full"} p={6}>
            <Flex paddingTop={2} alignItems={"center"} justifyContent={"space-between"}>
                <Flex alignItems={"center"}>
                    <Box paddingRight={3} color={"green.400"}>
                        {isVerified&&<GoVerified/>}
                    </Box>
                    <Text fontWeight={'bold'} fontSize={"lg"}>
                        AED {millify(price)}{rentFrequency&&`/${rentFrequency}`}
                    </Text>
                </Flex>
                <Box>
                    <Avatar size={'sm'} src={agency?.logo?.url}/>
                </Box>
            </Flex>
            <Flex alignItems={"center"} p={1} justifyContent={"space-between"} w={250} color={"blue.400"}>
                {rooms} <FaBed/> | {baths} <FaBath/> | {millify(area)} sqft <BsGridFill/>
            </Flex>
           <Box mt={2}>
               <Text fontSize={"lg"}>
                   {title}
               </Text>
               <Text lineHeight={2} color={"gray.600"}>
                   {description}
               </Text>
           </Box>
            <Flex flexWrap={"wrap"} textTransform={"uppercase"} justifyContent={"space-between"}>
                <Flex justifyContent={"space-between"} w={400} borderBottom={1} borderColor={"gray.100"} p={3}>
                    <Text>Type</Text>
                    <Text fontWeight={"bold"}>{type}</Text>
                </Flex>
                <Flex justifyContent={"space-between"} w={400} borderBottom={1} borderColor={"gray.100"} p={3}>
                    <Text>Purpose</Text>
                    <Text fontWeight={"bold"}>{purpose}</Text>
                </Flex>
                {furnishingStatus&&
                    <Flex justifyContent={"space-between"} w={400} borderBottom={1} borderColor={"gray.100"} p={3}>
                        <Text>furnishing Status</Text>
                        <Text fontWeight={"bold"}>{furnishingStatus}</Text>
                    </Flex>}
            </Flex>
            <Box>
                {amenities.length&&<Text fontSize={'2xl'} fontWeight={"black"} mt={5}>Amenities</Text>}
                <Flex flexWrap={"wrap"}>
                    {amenities.map(item=>item.amenities.map(amenity=>(
                        <Text
                            fontWeight={"bold"}
                            color={"blue.400"}
                            p={2}
                            bg={"gray.200"}
                            borderRadius={5}
                            m={1}
                            key={amenity.text}>{amenity.text}</Text>
                    )))}
                </Flex>
            </Box>
        </Box>
    </Box>
)
;
}
export async function getServerSideProps({ params: { id } }) {
    const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);

    return {
        props: {
            propertyDetails: data,
        },
    };
}
export default PropertyDetails;