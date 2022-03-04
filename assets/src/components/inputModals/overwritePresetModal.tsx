import React, { useContext } from "react"
import { StateDispatchContext } from "../../contexts/stateDispatchContext"
import { Action, closeInputModal } from "../../state"

const OverwritePresetModal = ({
  presetName,
  confirmCallback,
}: {
  presetName: string
  confirmCallback: (arg0: React.Dispatch<Action>) => void
}) => {
  const [, dispatch] = useContext(StateDispatchContext)
  return (
    <>
      <div className="m-input-modal">
        <div className="m-input-modal__title">
          A preset named{" "}
          <span className="m-input-modal__name-text">{presetName}</span> already
          exists.
        </div>
        <div className="m-input-modal__title">
          Overwrite{" "}
          <span className="m-input-modal__name-text">{presetName}</span>?
        </div>
        <div className="m-input-modal__buttons">
          <button
            className="m-input-modal__button"
            onClick={() => dispatch(closeInputModal())}
          >
            Cancel
          </button>
          <button
            className="m-input-modal__button-confirm"
            onClick={() => {
              confirmCallback(dispatch)
              dispatch(closeInputModal())
            }}
          >
            Save
          </button>
        </div>
      </div>
      <div className="m-input-modal__overlay" />
    </>
  )
}

export default OverwritePresetModal