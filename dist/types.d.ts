import { ChainReport } from './generated/chainReport';
export declare type FullReport<Status, State> = {
    contractReport: {
        crAvailableContracts: ContractSchema<Status>[];
        crActiveContractStates: ContractStateInFullReport<State>[];
    };
    chainReport: ChainReport;
};
export declare type ContractSchema<Status> = {
    csrSchemas: EndpointSchema[];
    csrDefinition: Status;
};
export declare type EndpointSchema = {
    argument: {
        contents?: [string, {
            tag: string;
        }][];
        tag: string;
    };
    endpointDescription: {
        getEndpointDescription: string;
    };
};
export declare type ContractStateInFullReport<State> = [
    {
        unContractInstanceId: string;
    },
    {
        observableState: State;
        logs: ContractLog[];
        hooks: ContractHookInFullReport[];
        err: {
            contents: any;
            tag: string;
        } | null;
        lastLogs: ContractLog[];
    }
];
export declare type ContractState<State> = {
    observableState: State;
    logs: ContractLog[];
    hooks: ContractHook[];
    err: {
        contents: any;
        tag: string;
    } | null;
    lastLogs: ContractLog[];
};
export declare type ContractLog = {
    _logMessageContent: string;
    _logLevel: 'Info' | 'Warning' | 'Error' | 'Debug';
};
export declare type ContractHookInFullReport = {
    rqID: number;
    itID: number;
    rqRequest: {
        contents: any;
        tag: string;
    };
};
export declare type ContractHook = {
    rqID: number;
    itID: number;
    rqRequest: {
        aeMetadata: null | any;
        aeDescription: {
            getEndpointDescription: string;
        };
    };
};
export declare type ContractStatus<Status, State> = {
    cicCurrentState: ContractState<State>;
    cicContract: {
        unContractInstanceId: string;
    };
    cicWallet: {
        getWalletId: string;
    };
    cicDefinition: Status;
};
export declare type AnyHaskellADT = {
    tag: string;
} | {
    tag: string;
    contents: unknown;
};
export declare type SocketResponse<State, EndpointName> = {
    tag: 'NewObservableState';
    contents: State;
} | {
    tag: 'NewActiveEndpoints';
    contents: {
        aeMetadata: any;
        aeDescription: {
            getEndpointDescription: EndpointName;
        };
    }[];
} | {
    tag: 'ContractFinished';
    contents: any;
};
