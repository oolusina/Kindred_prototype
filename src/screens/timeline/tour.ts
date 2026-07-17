/** Session-scoped tour flags for Timeline / Learn / Ask first visits. */

export function tourSeen(key: string): boolean {
  try {
    return sessionStorage.getItem(key) === '1'
  } catch {
    return true
  }
}

export function markTourSeen(key: string) {
  try {
    sessionStorage.setItem(key, '1')
  } catch {
    /* ignore */
  }
}

export const TOUR_TIMELINE = 'kindred.tour.timeline'
export const TOUR_LEARN = 'kindred.tour.learn'
export const TOUR_ASK = 'kindred.tour.ask'
export const TOUR_PREP = 'kindred.tour.prep'
export const TOUR_COMMUNITY = 'kindred.tour.community'
