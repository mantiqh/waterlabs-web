import { Box, Text } from 'ink';
import React from 'react';

const Header: React.FC = () => {
    return (
        <Box
            borderStyle="round"
            borderColor="cyan"
            paddingX={2}
            justifyContent="center"
            alignSelf="flex-start"
        >
            <Text bold color="white">
                NEXT.JS TEMPLATE – PRODUCTION QUALITY GATE
            </Text>
        </Box>
    );
};

export default Header;
