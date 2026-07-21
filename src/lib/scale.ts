/**
 * Ratio between an element's real (post-transform) rendered size and its local
 * (pre-transform) layout size — e.g. 0.85 inside the mobile shell's zoom-out
 * (PhoneFrame.tsx). getBoundingClientRect() returns real pixels; anything computed
 * from it and then applied as a `position`/`width` style inside the same
 * transformed subtree needs dividing by this scale first, or it renders scaled
 * a second time.
 */
export function getLocalScale(el: HTMLElement): number {
  return el.offsetWidth ? el.getBoundingClientRect().width / el.offsetWidth : 1
}
