import { ChainReport } from './generated/chainReport';

export type FullReport<Status, State> = {
  contractReport: {
    crAvailableContracts: ContractSchema<Status>[];
    crActiveContractStates: ContractStateInFullReport<State>[];
  };
  chainReport: ChainReport;
};

export type ContractSchema<Status> = {
  csrSchemas: EndpointSchema[];
  csrDefinition: Status;
};

export type EndpointSchema = {
  argument: {
    contents?: [string, { tag: string }][];
    tag: string;
  };
  endpointDescription: { getEndpointDescription: string };
};

export type ContractStateInFullReport<State> = [
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

export type ContractState<State> = {
  observableState: State;
  logs: ContractLog[];
  hooks: ContractHook[];
  err: {
    contents: any;
    tag: string;
  } | null;
  lastLogs: ContractLog[];
};

export type ContractLog = {
  _logMessageContent: string;
  _logLevel: 'Info' | 'Warning' | 'Error' | 'Debug';
};

export type ContractHookInFullReport = {
  rqID: number;
  itID: number;
  rqRequest: {
    contents: any;
    tag: string;
  };
};

export type ContractHook = {
  rqID: number;
  itID: number;
  rqRequest: {
    aeMetadata: null | any;
    aeDescription: {
      getEndpointDescription: string;
    };
  };
};

export type ContractStatus<Status, State> = {
  cicCurrentState: ContractState<State>;
  cicContract: {
    unContractInstanceId: string;
  };
  cicWallet: { getWalletId: string };
  cicDefinition: Status;
};

export type AnyHaskellADT = { tag: string } | { tag: string; contents: unknown };

export type SocketResponse<State, EndpointName> =
  | { tag: 'NewObservableState'; contents: State }
  | {
      tag: 'NewActiveEndpoints';
      contents: {
        aeMetadata: any;
        aeDescription: {
          getEndpointDescription: EndpointName;
        };
      }[];
    }
  | { tag: 'ContractFinished'; contents: any };
