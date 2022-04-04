import React, { useContext } from "react"
import { StateDispatchContext } from "../contexts/stateDispatchContext"
import { closeInputModal } from "../state"

const InputModal = ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  const [, dispatch] = useContext(StateDispatchContext)
  return (
    <>
      <div
        className="m-input-modal"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            dispatch(closeInputModal())
          }
        }}
      >
        {children}
      </div>
      <div className="m-input-modal__overlay" />
    </>
  )
}

export default InputModal