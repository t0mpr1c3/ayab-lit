export class MutationObserverHelper {
  // https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
  static waitFor(selector: any) {
    return new Promise((resolve) => {
      // Check if element already exists
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector))
      }

      // Set MutationObserver to report on selector
      const observer = new MutationObserver(() => {
        if (document.querySelector(selector)) {
          observer.disconnect()
          resolve(document.querySelector(selector))
        }
      })

      // Observe entire document.
      // If you get "parameter 1 is not of type 'Node'" error,
      // see https://stackoverflow.com/a/77855838/492336
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      })
    })
  }
}
