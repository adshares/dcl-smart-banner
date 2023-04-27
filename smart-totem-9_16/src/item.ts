import * as Ads from '../node_modules/@adshares/decentraland/src/index'

export type Props = {
  adserver: string
  payout_network: 'ads' | 'bsc'
  payout_address: string
  zone_name: string,
  types?: string
  mimes?: string

}

export default class SmartTotem_9_16 implements IScript<Props> {
  private supplyAgent: Ads.SupplyAgent | undefined = undefined
  private itemCounter: number = 0
  private itemLimit: number = 5

  init (args: { inventory: IInventory }) {}

  spawn (host: any, props: Props, channel: IChannel) {
    if (!this.supplyAgent) {
      this.supplyAgent = Ads.SupplyAgent.fromWallet(props.adserver, props.payout_network, props.payout_address)
    }

    if (!this.supplyAgent) {
      return
    }

    this.itemCounter += 1

    const screen = new Ads.Totem(props.zone_name, {
      ...(props.types ? { types: props.types.split(',').map(t => t.trim()) } : {}),
      ...(props.mimes ? { mimes: props.mimes.split(',').map(t => t.trim()) } : {})
    })
    screen.setParent(host)

    if (this.itemCounter > this.itemLimit) {
      screen.getPlacements().forEach(placement => placement.renderMessage(`To many items, you can add up to ${this.itemLimit} items.`, 'error'))
      return
    }

    this.supplyAgent.addPlacement(screen).spawn()
  }
}
