import React, { useId } from "react"
import { Button, FormSelect } from "react-bootstrap"
import { Panel } from "./diversionPage"
import {
  ByRoutePatternId,
  Route,
  RoutePattern,
  RoutePatternId,
} from "../../schedule"
import RoutePropertiesCard from "../mapPage/routePropertiesCard"

interface SelectedRouteInfoWithRoute {
  selectedRoute: Route
  routePatterns: ByRoutePatternId<RoutePattern>
  selectedRoutePatternId: RoutePatternId | null
}

interface SelectedRouteInfoWithoutRoute {
  selectedRoute: null
}

type SelectedRouteInfo =
  | SelectedRouteInfoWithRoute
  | SelectedRouteInfoWithoutRoute

interface DetourRouteSelectionPanelProps {
  allRoutes: Route[]
  selectedRouteInfo: SelectedRouteInfo

  onConfirm: () => void
  onSelectRoute: (route: Route | undefined) => void
  onSelectRoutePattern: (routePattern: RoutePattern | undefined) => void
}

const selectedRoutePatternFromInfo = (
  selectedRouteInfo: SelectedRouteInfoWithRoute
): RoutePatternId =>
  selectedRouteInfo.selectedRoutePatternId ||
  Object.values(selectedRouteInfo.routePatterns).find(
    (rp) => rp.directionId === 1
  )?.id ||
  Object.values(selectedRouteInfo.routePatterns)[0].id

export const DetourRouteSelectionPanel = ({
  allRoutes,
  selectedRouteInfo,
  onConfirm,
  onSelectRoute,
  onSelectRoutePattern,
}: DetourRouteSelectionPanelProps) => {
  const selectId = "choose-route-select" + useId()
  return (
    <Panel as="article">
      <Panel.Header className="">
        <h1 className="c-diversion-panel__h1 my-3">Create Detour</h1>
      </Panel.Header>

      <Panel.Body className="d-flex flex-column">
        <Panel.Body.ScrollArea className="d-flex flex-column">
          <section className="pb-3">
            <h2 className="c-diversion-panel__h2" id={selectId}>
              Choose route
            </h2>
            <FormSelect
              aria-labelledby={selectId}
              value={selectedRouteInfo.selectedRoute?.id}
              onChange={(changeEvent) => {
                onSelectRoute?.(
                  allRoutes.find(
                    (route) => route.id === changeEvent.target.value
                  )
                )
              }}
            >
              <option>Select a route</option>
              {allRoutes.map((route) => (
                <option key={route.id} value={route.id}>
                  {route.name}
                </option>
              ))}
            </FormSelect>
          </section>

          <section className="pb-3">
            <h2 className="c-diversion-panel__h2">Choose direction</h2>
            {selectedRouteInfo.selectedRoute ? (
              <RoutePropertiesCard
                routePatterns={selectedRouteInfo.routePatterns}
                selectedRoutePatternId={selectedRoutePatternFromInfo(
                  selectedRouteInfo
                )}
                selectRoutePattern={onSelectRoutePattern}
                defaultOpened="variants"
              />
            ) : (
              <p className="fst-italic">
                Select a route in order to choose a direction.
              </p>
            )}
          </section>
        </Panel.Body.ScrollArea>

        <Panel.Body.Footer className="d-flex">
          <Button className="m-3 flex-grow-1" onClick={onConfirm}>
            Start drawing detour
          </Button>
        </Panel.Body.Footer>
      </Panel.Body>
    </Panel>
  )
}