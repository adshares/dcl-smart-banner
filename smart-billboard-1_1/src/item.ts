import * as Ads from '../node_modules/@adshares/decentraland/src/index'

export type Props = {
  adserver: string
  payout_network: 'ads' | 'bsc'
  payout_address: string
  zone_name: string,
  types?: string
  mimes?: string

}

export default class SmartBillboard_1_1 implements IScript<Props> {
  private supplyAgent: Ads.SupplyAgent | undefined = undefined

  init (args: { inventory: IInventory }) {}

  spawn (host: Entity, props: Props, channel: IChannel) {
    if (!this.supplyAgent) {
      this.supplyAgent = Ads.SupplyAgent.fromWallet(props.adserver, props.payout_network, props.payout_address)
    }

    if (!this.supplyAgent) {
      return
    }

    const screen = new Ads.Billboard(props.zone_name, {
      ratio: '1:1',
      ...(props.types ? { types: props.types.split(',').map(t => t.trim()) } : {}),
      ...(props.mimes ? { mimes: props.mimes.split(',').map(t => t.trim()) } : {})
    })

    this.supplyAgent.addPlacement(screen).spawn()
    screen.setParent(host)
  }
}
