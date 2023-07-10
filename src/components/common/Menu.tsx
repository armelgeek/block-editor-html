import React, { useImperativeHandle, forwardRef, useMemo, useRef, useState, type Ref } from 'react'
import { useDimensions } from '../../utils/hooks'

import { useTheme } from '../../store/theme/hook'
import { scaleSizeH, scaleSizeW } from '../../utils/pixelRatio'

const menuItemHeight = scaleSizeH(40)
const menuItemWidth = scaleSizeW(100)

export interface Position { w: number, h: number, x: number, y: number, menuWidth?: number, menuHeight?: number }
export interface MenuSize { width?: number, height?: number }
export type Menus = Readonly<Array<{ action: string, label: string, disabled?: boolean }>>

interface Props<M extends Menus = Menus> {
  menus: Readonly<M>
  onPress?: (menu: M[number]) => void
  buttonPosition: Position
  menuSize: MenuSize
  onHide: () => void
  width?: number
  height?: number
  fontSize?: number
  center?: boolean
  activeId?: M[number]['action'] | null
}

const Menu = ({
  buttonPosition,
  menuSize,
  menus,
  onPress = () => {},
  onHide,
  activeId,
  fontSize = 15,
  center = false,
}: Props) => {
  const theme = useTheme()
  const { window: windowSize } = useDimensions()
  // const fadeAnim = useRef(new Animated.Value(0)).current
  // console.log(buttonPosition)

  const menuItemStyle = useMemo(() => {
    return {
      width: menuSize.width ?? menuItemWidth,
      height: menuSize.height ?? menuItemHeight,
    }
  }, [menuSize])

  const menuStyle = useMemo(() => {
    let menuHeight = menus.length * menuItemStyle.height
    const topHeight = buttonPosition.y - 20
    const bottomHeight = windowSize.height - buttonPosition.y - buttonPosition.h - 20
    if (menuHeight > topHeight && menuHeight > bottomHeight) menuHeight = Math.max(topHeight, bottomHeight)

    const menuWidth = menuItemStyle.width
    const bottomSpace = windowSize.height - buttonPosition.y - buttonPosition.h - 20
    const rightSpace = windowSize.width - buttonPosition.x - menuWidth
    const showInBottom = bottomSpace >= menuHeight
    const showInRight = rightSpace >= menuWidth
    const frameStyle: {
      height: number
      width: number
      top: number
      left?: number
      right?: number
    } = {
      height: menuHeight,
      top: showInBottom ? buttonPosition.y - 80 + buttonPosition.h : buttonPosition.y - menuHeight,
      width: menuWidth,
    }
    if (showInRight) {
      frameStyle.left = buttonPosition.x
    } else {
      frameStyle.right = windowSize.width - buttonPosition.x - buttonPosition.w
    }
    return frameStyle
  }, [menus.length, menuItemStyle, buttonPosition, windowSize])

  const menuPress = (menu: Menus[number]) => {
    // if (menu.disabled) return
    onPress(menu)
    onHide()
  }

  // console.log('render menu')
  // console.log(activeId)
  // console.log(menuStyle)
  // console.log(menuItemStyle)
  return (
    <div style={{ borderColor:theme['c-button-background-active'], backgroundColor: theme['c-content-background'] }} >
      <div>
        {
          menus.map((menu, index) => (
            menu.disabled
              ? (
                  <div
                    key={menu.action}
                    style={{ width: menuItemStyle.width, height: menuItemStyle.height, opacity: 0.4 }}
                  >
                    <p style={{ textAlign: center ? 'center' : 'left' }}>{menu.label}</p>
                  </div>
                )
              : menu.action == activeId
                ? (
                    <div
                      key={menu.action}
                      style={{  width: menuItemStyle.width, height: menuItemStyle.height }}
                    >
                      <p style={{ textAlign: center ? 'center' : 'left',color:theme['c-primary-font-active'] }}>{menu.label}</p>
                    </div>
                  )
                : (
                    <button
                      key={menu.action}
                      style={{ width: menuItemStyle.width, height: menuItemStyle.height }}
                      onClick={() => { menuPress(menu) }}
                    >
                      <p style={{ textAlign: center ? 'center' : 'left' }}>{menu.label}</p>
                    </button>
                  )

          ))
        }
      </div>
    </div>
  )
}

export interface MenuProps<M extends Menus = Menus> {
  menus: M
  onPress: (menu: M[number]) => void
  onHide?: () => void
  width?: number
  height?: number
  fontSize?: number
  center?: boolean
  activeId?: M[number]['action'] | null
}

export interface MenuType {
  show: (position: Position, menuSize?: MenuSize) => void
  hide: () => void
}

const Component = <M extends Menus>({ menus, activeId, onHide, onPress, fontSize, center }: MenuProps<M>, ref: Ref<MenuType>) => {
  // console.log(visible)
  const modalRef = useRef<any>(null)
  const [position, setPosition] = useState<Position>({ w: 0, h: 0, x: 0, y: 0 })
  const [menuSize, setMenuSize] = useState<MenuSize>({ })
  const hide = () => {
    modalRef.current?.setVisible(false)
  }
  useImperativeHandle(ref, () => ({
    show(newPosition, menuSize) {
      setPosition(newPosition)
      if (menuSize) setMenuSize(menuSize)
      modalRef.current?.setVisible(true)
    },
    hide() {
      hide()
    },
  }))

  return (
    <div ref={modalRef}>
      <Menu menus={menus} activeId={activeId} buttonPosition={position} menuSize={menuSize} onPress={onPress} onHide={hide} fontSize={fontSize} center={center} />
    </div>
  )
}

// export default forwardRef(Component) as ForwardRefFn<MenuType>
export default forwardRef(Component) as <M extends Menus>(p: MenuProps<M> & { ref?: Ref<MenuType> }) => JSX.Element | null
