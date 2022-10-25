import ReactTooltip from 'react-tooltip'

export default class ReactTooltipShim extends ReactTooltip {
  // Patch an issue with React 18 where the tooltip never gets hidden
  // after it shows up for the first time.
  componentDidMount(): void {
    // @ts-ignore
    this.mount = true
    super.componentDidMount()
  }
}
