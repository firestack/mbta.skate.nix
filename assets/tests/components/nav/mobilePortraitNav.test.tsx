import React from "react"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom"

import MobilePortraitNav from "../../../src/components/nav/mobilePortraitNav"
import { StateDispatchProvider } from "../../../src/contexts/stateDispatchContext"
import { initialState, OpenView } from "../../../src/state"
import { BrowserRouter } from "react-router-dom"
import vehicleFactory from "../../factories/vehicle"

describe("MobilePortraitNav", () => {
  test("renders top / bottom nav", () => {
    const dispatch = jest.fn()
    const result = render(
      <StateDispatchProvider state={initialState} dispatch={dispatch}>
        <BrowserRouter>
          <MobilePortraitNav />
        </BrowserRouter>
      </StateDispatchProvider>
    )

    expect(result.queryByTitle("Swings View")).toBeVisible()
    expect(result.queryByTitle("Notifications")).toBeVisible()
  })

  test("doesn't render top / bottom nav when a view is open", () => {
    const dispatch = jest.fn()
    const result = render(
      <StateDispatchProvider
        state={{ ...initialState, openView: OpenView.Swings }}
        dispatch={dispatch}
      >
        <BrowserRouter>
          <MobilePortraitNav />
        </BrowserRouter>
      </StateDispatchProvider>
    )

    expect(result.queryByTitle("Swings View")).not.toBeVisible()
    expect(result.queryByTitle("Notifications")).not.toBeVisible()
  })

  test("doesn't render top / bottom nav when a vehicle is selected", () => {
    const dispatch = jest.fn()
    const result = render(
      <StateDispatchProvider
        state={{
          ...initialState,
          selectedVehicleOrGhost: vehicleFactory.build(),
        }}
        dispatch={dispatch}
      >
        <BrowserRouter>
          <MobilePortraitNav />
        </BrowserRouter>
      </StateDispatchProvider>
    )

    expect(result.queryByTitle("Swings View")).not.toBeVisible()
    expect(result.queryByTitle("Notifications")).not.toBeVisible()
  })

  test("doesn't render top / bottom nav when notification drawer is open", () => {
    const dispatch = jest.fn()
    const result = render(
      <StateDispatchProvider
        state={{
          ...initialState,
          openView: OpenView.NotificationDrawer,
        }}
        dispatch={dispatch}
      >
        <BrowserRouter>
          <MobilePortraitNav />
        </BrowserRouter>
      </StateDispatchProvider>
    )

    expect(result.queryByTitle("Swings View")).not.toBeVisible()
    expect(result.queryByTitle("Notifications")).not.toBeVisible()
  })
})