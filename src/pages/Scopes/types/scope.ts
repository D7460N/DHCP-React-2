export interface Scope {
  Name: string;
  Description: string;
  Subnet: string;
  SubnetMask: string;
  StartIPv4Address: string;
  EndIPv4Address: string;
  Active: boolean;
  DateModified: string;
  ModifiedBy: string;
}

export interface ScopeUpdateRequest {
  Name: string;
  UpdatedName?: string;
  UpdatedDescription?: string;
  UpdatedStartIPv4Address?: string;
  UpdatedEndIPv4Address?: string;
  UpdatedDHCPServer?: string;
  UpdatedDelay?: number;
  UpdatedLeaseDuration?: number;
  UpdatedActive?: boolean;
  ReturnListFlag?: boolean;
}
