module.exports = {
    roots: ["<rootDir>/src"],
    // testMatch設定は、ts/tsx/jsフォーマットで書かれた.test/.specファイルを発見するためのglobのパターンマッチャー
    testMatch: [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)",
    ],
    // transform設定は、ts/tsxファイルに対してts-jestを使うようjestに指示します。
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
};
