export function useInfiniteScrollListener(loadMoreCallback, offset, loadingRef, allLoadedRef) {

  let scrollListenerAttached = false
  let isLoadingMore = false

  const handleScroll = () => {
    const scrollPosition = window.innerHeight + window.scrollY
    const bottom = document.documentElement.offsetHeight - offset

    if (scrollPosition >= bottom && !loadingRef.value && !allLoadedRef.value && !isLoadingMore) {
      isLoadingMore = true

      loadMoreCallback().finally(() => {
        isLoadingMore = false
      })
    }
  }

  const manageScrollListener = (enable) => {
    if (enable && !scrollListenerAttached) {
      window.addEventListener('scroll', handleScroll, { passive: true })
      scrollListenerAttached = true
    } else if (!enable && scrollListenerAttached) {
      window.removeEventListener('scroll', handleScroll)
      scrollListenerAttached = false
    }
  }

  const scrollState = {
    isAttached: () => scrollListenerAttached,
    detach: () => manageScrollListener(false)
  }

  return { manageScrollListener, scrollState }
}
