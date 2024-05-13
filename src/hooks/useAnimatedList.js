import { createRef, useCallback, useRef, useState } from "react"

export default function useAnimatedList(initialValue = []) {
  const [items, setItems] = useState(initialValue)
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([])

  const animatedRefs = useRef(new Map)

  const handleRemoveItems = useCallback((id) => {
    setPendingRemovalItemsIds((prevState) => [...prevState, id])
  }, [])

  // const handleAnimationEnd = useCallback((id) => {
  //   setItems((prevState) => prevState.filter((message) => message.id !== id))
  //   setPendingRemovalItemsIds((prevState) =>
  //     prevState.filter((messageId) => messageId !== id)
  //   )
  // }, [])

  const getAnimatedRef = useCallback((itemId) => {
    let animatedRef = animatedRefs.current.get(itemId)

    if(!animatedRef) {
      animatedRef = createRef()
      animatedRefs.current.set(itemId, animatedRef)
    }

    return animatedRef
  }, []) 

  const renderList = useCallback(
    (renderItem) =>
      items.map((item) => {
        const isLeaving = pendingRemovalItemsIds.includes(item.id)

        const animatedRef = getAnimatedRef(item.id)
        return renderItem(item, {
          isLeaving,
          animatedRef
        })
      }),
    [items, pendingRemovalItemsIds, getAnimatedRef]
  )

  return {
    items,
    setItems,
    handleRemoveItems,
    renderList
  }
}


