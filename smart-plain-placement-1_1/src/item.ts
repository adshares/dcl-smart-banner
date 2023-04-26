import * as Ads from '../node_modules/@adshares/decentraland/src/index'

export type Props = {
  adserver: string
  payout_network: 'ads' | 'bsc'
  payout_address: string
  zone_name: string,
  types?: string
  mimes?: string

}

export default class SmartPlainPlacement_1_1 implements IScript<Props> {
  private supplyAgent: Ads.SupplyAgent | undefined = undefined

  init () { }

  spawn (host: IEntity, props: Props, channel: IChannel) {
    if (!this.supplyAgent) {
      this.supplyAgent = Ads.SupplyAgent.fromWallet(props.adserver, props.payout_network, props.payout_address)
    }

    const hostTransform = host.getComponent(Transform)
    hostTransform.position.y = hostTransform.scale.y / 2 + hostTransform.position.y

    if (!this.supplyAgent) {
      return
    }

    const screen = new Ads.PlainPlacement(props.zone_name, {

      ...(props.types ? { types: props.types.split(',').map(t => t.trim()) } : {}),
      ...(props.mimes ? { mimes: props.mimes.split(',').map(t => t.trim()) } : {})
    })

    this.supplyAgent.addPlacement(screen).spawn()
    screen.setParent(host)
  }
}
