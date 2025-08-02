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
  UpdateName?: string;
  UpdateDescription?: string;
  UpdateStartIPv4Address?: string;
  UpdateEndIPv4Address?: string;
  UpdateDHCPServer?: string;
  UpdateDelay?: number;
  UpdateLeaseDuration?: number;
  UpdateActive?: boolean;
  ReturnListFlag?: boolean;
}
