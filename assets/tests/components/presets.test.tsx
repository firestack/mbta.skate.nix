import React from "react"
import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import renderer from "react-test-renderer"
import {
  initialState,
  instantiatePreset,
  promptToSaveOrCreatePreset,
  promptToDeletePreset,
} from "../../src/state"
import Presets from "../../src/components/presets"
import { StateDispatchProvider } from "../../src/contexts/stateDispatchContext"
import routeTabFactory from "../factories/routeTab"

describe("Presets", () => {
  test("renders current presets", () => {
    const mockDispatch = jest.fn()
    const mockState = {
      ...initialState,
      routeTabs: [
        routeTabFactory.build({
          ordering: 0,
          presetName: "My Preset",
          isCurrentTab: true,
          selectedRouteIds: ["1"],
        }),
        routeTabFactory.build({
          ordering: 1,
          presetName: "Another Preset",
          isCurrentTab: false,
          selectedRouteIds: ["77"],
        }),
        routeTabFactory.build({
          ordering: undefined,
          isCurrentTab: false,
          selectedRouteIds: ["28"],
        }),
      ],
    }
    const tree = renderer
      .create(
        <StateDispatchProvider state={mockState} dispatch={mockDispatch}>
          <Presets />
        </StateDispatchProvider>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test("saves current tab as preset", () => {
    const mockDispatch = jest.fn()
    const mockState = {
      ...initialState,
      routeTabs: [
        routeTabFactory.build({
          uuid: "uuid1",
          ordering: 0,
          presetName: undefined,
          isCurrentTab: true,
          selectedRouteIds: ["1"],
        }),
      ],
    }

    const result = render(
      <StateDispatchProvider state={mockState} dispatch={mockDispatch}>
        <Presets />
      </StateDispatchProvider>
    )

    userEvent.click(result.getByText("Save as preset"))

    expect(mockDispatch).toHaveBeenCalledWith(
      promptToSaveOrCreatePreset(mockState.routeTabs[0])
    )
  })

  test("saves changes to current tab if it's edited", () => {
    const mockDispatch = jest.fn()
    const mockState = {
      ...initialState,
      routeTabs: [
        routeTabFactory.build({
          uuid: "uuid1",
          ordering: undefined,
          presetName: "My Preset",
          isCurrentTab: false,
          selectedRouteIds: ["1"],
        }),
        routeTabFactory.build({
          uuid: "uuid2",
          ordering: 0,
          presetName: "My Preset",
          isCurrentTab: true,
          selectedRouteIds: ["1", "7"],
          saveChangesToTabUuid: "uuid1",
        }),
      ],
    }

    const result = render(
      <StateDispatchProvider state={mockState} dispatch={mockDispatch}>
        <Presets />
      </StateDispatchProvider>
    )

    userEvent.click(result.getByText("Save as preset"))

    expect(mockDispatch).toHaveBeenCalledWith(
      promptToSaveOrCreatePreset(mockState.routeTabs[1])
    )
  })

  test("opens a preset", () => {
    const mockDispatch = jest.fn()
    const mockState = {
      ...initialState,
      routeTabs: [
        routeTabFactory.build({
          uuid: "uuid1",
          ordering: 0,
          presetName: "My Preset",
          isCurrentTab: true,
          selectedRouteIds: ["1"],
        }),
      ],
    }

    const result = render(
      <StateDispatchProvider state={mockState} dispatch={mockDispatch}>
        <Presets />
      </StateDispatchProvider>
    )

    userEvent.click(result.getByText("My Preset"))

    expect(mockDispatch).toHaveBeenCalledWith(instantiatePreset("uuid1"))
  })

  test("deletes a preset", () => {
    const mockDispatch = jest.fn()
    const mockState = {
      ...initialState,
      routeTabs: [
        routeTabFactory.build({
          uuid: "uuid1",
          ordering: 0,
          presetName: "My Preset",
          isCurrentTab: true,
          selectedRouteIds: ["1"],
        }),
      ],
    }

    const result = render(
      <StateDispatchProvider state={mockState} dispatch={mockDispatch}>
        <Presets />
      </StateDispatchProvider>
    )

    userEvent.click(result.getByTestId("close-button"))

    expect(mockDispatch).toHaveBeenCalledWith(
      promptToDeletePreset(mockState.routeTabs[0])
    )
  })
})