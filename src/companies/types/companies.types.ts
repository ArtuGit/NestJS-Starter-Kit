export interface ICompany {
  id: string
  name: string
  salesFunnelStage: SalesFunnelStage
  websiteURL?: string
  logoURI?: string
}

export enum SalesFunnelStage {
  Awareness = 'Awareness',
  Interest = 'Interest',
  Evaluation = 'Evaluation',
  Engagement = 'Engagement',
  CP = 'Commitment/Purchase',
}
