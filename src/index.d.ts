// Type definitions for mobx-keeper

declare function keep(storageName: string, variable: any);

declare function createKeeper(target: any, variables: object[]): any;
