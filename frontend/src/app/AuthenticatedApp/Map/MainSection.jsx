import React, { memo } from "react";
import { Box } from '@mui/material';
import { border } from '../../../utils';
import WorldMap from "react-svg-worldmap";

const MainSection = () => {
    const data = [
        { country: "cn", color: 1389618778 }, // china
        { country: "in", value: 1311559204 }, // india
        { country: "us", value: 331883986 }, // united states
        { country: "id", value: 264935824 }, // indonesia
        { country: "pk", value: 210797836 }, // pakistan
        { country: "br", value: 210301591 }, // brazil
        { country: "ng", value: 208679114 }, // nigeria
        { country: "bd", value: 161062905 }, // bangladesh
        { country: "ru", value: 141944641 }, // russia
        { country: "mx", value: 127318112 }, // mexico
      ];
    return (
        <Box sx={{
            padding: '20px',
            border: border,
            borderRadius: '4px',
            backgroundColor: 'background.default',
        }}>
            <WorldMap
                color="red"
                title="Top 10 Populous Countries"
                value-suffix="people"
                size="responsive"
                data={data}
            />
        </Box>
    );
};

export default memo(MainSection);
