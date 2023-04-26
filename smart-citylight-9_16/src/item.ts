import * as Ads from '../node_modules/@adshares/decentraland/src/index'

export type Props = {
  adserver: string
  payout_network: 'ads' | 'bsc'
  payout_address: string
  zone_name: string,
  types?: string
  mimes?: string
  rotation?: boolean
}

export default class SmartCitylight_9_16 implements IScript<Props> {
  private supplyAgent: Ads.SupplyAgent | undefined = undefined

  init (args: { inventory: IInventory }) {}

  spawn (host: any, props: Props, channel: IChannel) {
    if (!this.supplyAgent) {
      this.supplyAgent = Ads.SupplyAgent.fromWallet(props.adserver, props.payout_network, props.payout_address)
    }

    if (!this.supplyAgent) {
      return
    }

    const screen = new Ads.Citylight(props.zone_name, {
      rotation: props.rotation,
      ...(props.types ? { types: props.types.split(',').map(t => t.trim()) } : {}),
      ...(props.mimes ? { mimes: props.mimes.split(',').map(t => t.trim()) } : {})
    })

    this.supplyAgent.addPlacement(screen).spawn()
    screen.setParent(host)
  }
}
