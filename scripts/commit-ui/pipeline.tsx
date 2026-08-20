import { execa } from 'execa';
import { Box, Text, useApp, useInput } from 'ink';
import Spinner from 'ink-spinner';
import React, { useEffect, useMemo, useState } from 'react';

import CommitGuide from './commit-guide';
import Header from './header';

interface Step {
    label: string;
    command: string;
}

const InputHandler: React.FC<{ status: string; exit: (error?: Error) => void }> = ({ status, exit }) => {
    useInput((input, key) => {
        if (input === 'q' || key.return || key.escape || (key.ctrl && input === 'c')) {
            exit(status === 'failed' ? new Error('Pipeline failed') : undefined);
        }
    });
    return null;
};

const Pipeline: React.FC = () => {
    const { exit } = useApp();
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [status, setStatus] = useState<'running' | 'failed' | 'success'>('running');
    const [failedStep, setFailedStep] = useState<string | null>(null);
    const [errorOutput, setErrorOutput] = useState<string | null>(null);

    // Detect hook type from environment or arguments
    const hookType = process.argv.includes('--hook=commit-msg') ? 'commit-msg' : 'pre-commit';
    const commitMsgFile = process.argv.slice(2).find(arg => !arg.startsWith('--') && !arg.includes('index.tsx')) || '.git/COMMIT_EDITMSG';

    const steps: Step[] = useMemo(() => hookType === 'commit-msg'
        ? [
            { label: 'Checking Commit Message', command: `pnpm exec commitlint --edit "${commitMsgFile}"` }
        ]
        : [
            { label: 'Checking Linting', command: 'pnpm run lint' },
            { label: 'Checking Types', command: 'pnpm run check-types' },
        ], [hookType, commitMsgFile]);

    const isTTY = !!(process.stdin.isTTY && process.stdin.setRawMode);

    useEffect(() => {
        const runSteps = async () => {
            for (let i = 0; i < steps.length; i++) {
                setCurrentStepIndex(i);
                const step = steps[i];

                try {
                    await execa(step.command, {
                        shell: true,
                        all: true,
                        timeout: 60000
                    });
                } catch (err: any) {
                    setStatus('failed');
                    setFailedStep(step.label);
                    setErrorOutput(err.all || err.stderr || err.stdout || err.message);

                    if (!isTTY) {
                        setTimeout(() => exit(new Error('Pipeline failed')), 100);
                    }
                    return;
                }
            }

            setStatus('success');
            setTimeout(() => exit(), 10);
        };

        runSteps();
    }, [exit, steps]);

    return (
        <Box flexDirection="column" padding={1}>
            {hookType === 'pre-commit' && <Header />}

            <Box flexDirection="column" marginTop={1}>
                {steps.map((step, index) => {
                    const isCurrent = index === currentStepIndex && status === 'running';
                    const isCompleted = (index < currentStepIndex) || (index === currentStepIndex && status === 'success');
                    const isFailed = index === currentStepIndex && status === 'failed';
                    const isPending = index > currentStepIndex && status === 'running';

                    return (
                        <Box key={`${step.label}-${index}`} marginBottom={0}>
                            <Box width={3}>
                                {isCurrent && <Text color="yellow"><Spinner type="dots" /></Text>}
                                {isCompleted && <Text color="green">✔</Text>}
                                {isFailed && <Text color="red">✘</Text>}
                                {isPending && <Text color="gray">○</Text>}
                            </Box>
                            <Text color={isCurrent ? 'cyan' : isCompleted ? 'green' : isFailed ? 'red' : 'white'}>
                                {step.label}
                            </Text>
                        </Box>
                    );
                })}
            </Box>

            {status === 'failed' && (
                <Box flexDirection="column" marginTop={1}>
                    <Box borderStyle="round" borderColor="red" paddingX={2} marginBottom={1} alignSelf="flex-start">
                        <Text color="red" bold>FAILED: {failedStep}</Text>
                    </Box>

                    {errorOutput && (
                        <Box borderStyle="single" borderColor="gray" paddingX={1} marginBottom={1} flexDirection="column">
                            <Box marginBottom={1}>
                                <Text color="red" bold>Error Output:</Text>
                            </Box>
                            <Text color="white">{errorOutput}</Text>
                        </Box>
                    )}

                    <CommitGuide />
                    {isTTY && (
                        <Box marginTop={1}>
                            <Text color="gray">Press Enter or 'q' to exit</Text>
                        </Box>
                    )}
                </Box>
            )}

            {status === 'success' && (
                <Box marginTop={1} alignSelf="flex-start">
                    <Box borderStyle="round" borderColor="green" paddingX={2}>
                        <Text color="green" bold>READY: ALL CHECKS PASSED</Text>
                    </Box>
                </Box>
            )}
            {isTTY && (status === 'failed' || status === 'success') && (
                <InputHandler status={status} exit={exit} />
            )}
        </Box>
    );
};

export default Pipeline;
