export default {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'scope-empty': [2, 'always'],
        'type-enum': [
            2,
            'always',
            [
                'feat',
                'fix',
                'chore',
                'docs',
                'style',
                'refactor',
                'perf',
                'test',
                'build',
                'ci',
                'revert',
                'initial',
                'release',
            ],
        ],
    },
};
