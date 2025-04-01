import { Engine } from "rattler";
import ClockState from "./states/ClockState";

export default class ShaderClock extends Engine {
  init() {
    this.loadState(ClockState);
  }
}
