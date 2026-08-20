import { Box, Text } from 'ink';
import React from 'react';

interface TableProps {
    data: Array<Record<string, string>>;
}

const Table: React.FC<TableProps> = ({ data }) => {
    if (data.length === 0) return null;

    const columns = Object.keys(data[0]);

    // Calculate max width for each column
    const columnWidths = columns.map(col => {
        const maxContentLen = Math.max(
            col.length,
            ...data.map(row => row[col]?.length || 0)
        );
        return maxContentLen + 2; // Add some padding
    });

    return (
        <Box flexDirection="column">
            {/* Header */}
            <Box borderStyle="single" borderBottom={false} borderColor="gray">
                {columns.map((col, i) => (
                    <Box key={col} width={columnWidths[i]} paddingX={1}>
                        <Text bold color="white">{col}</Text>
                    </Box>
                ))}
            </Box>

            {/* Rows */}
            <Box flexDirection="column" borderStyle="single" borderColor="gray">
                {data.map((row, rowIndex) => (
                    <Box key={rowIndex}>
                        {columns.map((col, i) => (
                            <Box key={col} width={columnWidths[i]} paddingX={1}>
                                <Text color="cyan">{row[col]}</Text>
                            </Box>
                        ))}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

const tableData = [
    { Rule: 'Format', Value: '<type>: <subject>' },
    { Rule: 'Types', Value: 'feat | fix | chore | docs | refactor | test | initial | release ' },
    { Rule: 'Example', Value: 'feat: add dashboard layout' },
];

const CommitGuide: React.FC = () => {
    return (
        <Box flexDirection="column" marginTop={1}>
            <Box borderStyle="round" borderColor="yellow" paddingX={1} marginBottom={1} alignSelf="flex-start">
                <Text bold color="yellow">
                    COMMIT MESSAGE GUIDELINES
                </Text>
            </Box>
            <Table data={tableData} />
        </Box>
    );
};

export default CommitGuide;
