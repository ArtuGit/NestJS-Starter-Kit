import { ICompany, SalesFunnelStage } from '../types/companies.types'

export const companiesStorage: ICompany[] = [
  {
    id: '1',
    name: 'Foo',
    salesFunnelStage: SalesFunnelStage.Interest,
    websiteURL: 'foo.com',
  },
  {
    id: '2',
    name: 'Bar',
    salesFunnelStage: SalesFunnelStage.Awareness,
    websiteURL: 'bar.com',
    logoURI: '/logos/logo-bar.png',
  },
  {
    id: '3',
    name: 'Baz',
    salesFunnelStage: SalesFunnelStage.CP,
    websiteURL: 'baz.com',
    logoURI: '/logos/logo-baz.png',
  },
  {
    id: '4',
    name: 'Duck',
    salesFunnelStage: SalesFunnelStage.Awareness,
  },
  {
    id: '5',
    name: 'Pan',
    salesFunnelStage: SalesFunnelStage.Evaluation,
  },
]
