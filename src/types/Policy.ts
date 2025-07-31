type Policy = {
  id: string;
  name: string;
  description: string;
  cloudProviderId: number | '';
  cloudProviderName: string;
  createdBy: string;
  resourceTypeId: number | '';
  resourceTypeName: string;
  policyTypeId: number | '';
  policyTypeName: string;
  policyValue: string;
  status: string;
};

export default Policy;
