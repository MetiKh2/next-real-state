import {ScrollMenu,VisibilityContext} from "react-horizontal-scrolling-menu";
import {useContext} from "react";
import {Box, Flex, Icon} from "@chakra-ui/react";
import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from "react-icons/fa";
import Image from 'next/image'
const LeftArrow = () => {
  const {scrollPrev} =useContext(VisibilityContext)
    return    <Flex justifyContent='center' alignItems='center' marginRight='1'>
        <Icon
            as={FaArrowAltCircleLeft}
            onClick={() => scrollPrev()}
            fontSize='2xl'
            cursor='pointer'
        />
    </Flex>

}
const RightArrow = () => {
    const { scrollNext } = useContext(VisibilityContext);

    return (
        <Flex justifyContent='center' alignItems='center' marginLeft='1'>
            <Icon
                as={FaArrowAltCircleRight}
                onClick={() => scrollNext()}
                fontSize='2xl'
                cursor='pointer'
            />
        </Flex>
    );
}
function ImageScrollBar({data}) {
    return (
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} style={{overflow:'hidden'}}>
            {data.map((item,index) => (
                <Box width='910px' key={index} itemId={item.id} overflow='hidden' p='1'>
                    <Image placeholder="blur" blurDataURL={item.url} src={item.url} width={1000} height={500}  sizes="(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px" />
                </Box>
            ))}
        </ScrollMenu>
    );
}

export default ImageScrollBar;