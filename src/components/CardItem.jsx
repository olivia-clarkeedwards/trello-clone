import { useEffect, useState, useRef } from 'react'
import { Window } from './Window'
import ITEM_TYPES from '../data/types'
import { useDrag, useDrop } from 'react-dnd'

export function CardItem({ item, index, moveItem, status }) {
  const ref = useRef(null)
  const [, drop] = useDrop({
    accept: ITEM_TYPES,
    hover({ item, monitor }) {
      if (!ref.current) return

      const dragIndex = item.index
      const hoverIndex = item.hover

      if (dragIndex === hoverIndex) return

      const hoveredRect = ref.current.getBoundClientRect()
      const hoverMiddleY = hoveredRect.bottom - hoveredRect.top / 2
      const mousePosition = monitor.getClientOffset()
      const hoverClientY = mousePosition.y - hoveredRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
      if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) return

      moveItem(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    item: { type: ITEM_TYPES, ...item, index },
    collect: (monitor) => ({ isDragging: monitor.isDragging }),
  })

  const [show, setShow] = useState(false)

  const onOpen = () => setShow(true)

  const onClose = () => setShow(false)

  drag(drop(ref))

  return (
    <>
      <div
        ref={ref}
        style={{ opacity: isDragging ? 0 : 1 }}
        className={'item'}
        onClick={onOpen}
      >
        <div
          className={'colour-bar'}
          style={{ backgroundColor: status.color }}
        ></div>
        <p className={'item-title'}>{item.content}</p>
      </div>
    </>
  )
}
