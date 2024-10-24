import { Socket } from "phoenix"
import React, { ReactElement, useContext, useState } from "react"
import { SocketContext } from "../contexts/socketContext"
import { StateDispatchContext } from "../contexts/stateDispatchContext"
import useSearchResults from "../hooks/useSearchResults"
import { useStations } from "../hooks/useStations"
import { filterVehicles } from "../models/vehicle"
import { Ghost, Vehicle } from "../realtime"
import { Stop } from "../schedule"
import { SearchPageState } from "../state/searchPageState"
import { MapFollowingPrimaryVehicles } from "./map"
import RecentSearches from "./recentSearches"
import OldSearchForm from "./oldSearchForm"
import SearchResults from "./searchResults"
import { LayersControl, LayersControlState } from "./map/controls/layersControl"
import { TileType } from "../tilesetUrls"
import { setTileType } from "../state/mapLayersState"
import { usePanelStateFromStateDispatchContext } from "../hooks/usePanelState"

enum MobileDisplay {
  List = 1,
  Map,
}

const thereIsAnActiveSearch = (
  vehicles: (Vehicle | Ghost)[] | null,
  searchPageState: SearchPageState
): boolean => vehicles !== null && searchPageState.isActive

const ToggleMobileDisplayButton = ({
  mobileDisplay,
  onToggleMobileDisplay,
}: {
  mobileDisplay: MobileDisplay
  onToggleMobileDisplay: () => void
}) => {
  const otherDisplayName = mobileDisplay === MobileDisplay.List ? "map" : "list"

  return (
    <button
      className="c-search-page__toggle-mobile-display-button"
      onClick={onToggleMobileDisplay}
    >
      Show {otherDisplayName} instead
    </button>
  )
}

const SearchPage = (): ReactElement<HTMLDivElement> => {
  const [
    {
      searchPageState,
      mobileMenuIsOpen,
      mapLayers: {
        legacySearchMap: { tileType: tileType },
      },
    },
    dispatch,
  ] = useContext(StateDispatchContext)

  const {
    currentView: { selectedVehicleOrGhost },
    openVehiclePropertiesPanel,
  } = usePanelStateFromStateDispatchContext()

  const { socket }: { socket: Socket | undefined } = useContext(SocketContext)
  const stations: Stop[] | null = useStations()

  const vehicles: (Vehicle | Ghost)[] | null = useSearchResults(
    socket,
    searchPageState.isActive ? searchPageState.query : null
  )
  const onlyVehicles: Vehicle[] = filterVehicles(vehicles)
  const [mobileDisplay, setMobileDisplay] = useState(MobileDisplay.List)
  const toggleMobileDisplay = () => {
    setMobileDisplay(
      mobileDisplay === MobileDisplay.List
        ? MobileDisplay.Map
        : MobileDisplay.List
    )
  }

  const mobileDisplayClass =
    mobileDisplay === MobileDisplay.List
      ? "c-search-page--show-list"
      : "c-search-page--show-map"

  const mobileMenuClass = mobileMenuIsOpen ? "blurred-mobile" : ""

  return (
    <div
      className={`l-page c-search-page ${mobileDisplayClass} ${mobileMenuClass}`}
    >
      <div className="c-search-page__input-and-results">
        <div className="c-search-page__input">
          <OldSearchForm />

          <ToggleMobileDisplayButton
            mobileDisplay={mobileDisplay}
            onToggleMobileDisplay={toggleMobileDisplay}
          />
        </div>

        <div className="c-search-display">
          {vehicles != null &&
          thereIsAnActiveSearch(vehicles, searchPageState) ? (
            <SearchResults
              vehicles={vehicles}
              onClick={openVehiclePropertiesPanel}
              selectedVehicleId={selectedVehicleOrGhost?.id || null}
            />
          ) : (
            <RecentSearches />
          )}
        </div>
      </div>

      <div className="c-search-page__map">
        <MapFollowingPrimaryVehicles
          selectedVehicleId={selectedVehicleOrGhost?.id}
          vehicles={onlyVehicles}
          onPrimaryVehicleSelect={openVehiclePropertiesPanel}
          stations={stations}
          tileType={tileType}
        >
          <LayersControlState>
            {(open, setOpen) => (
              <LayersControl.WithTileContext
                showLayersList={open}
                onChangeLayersListVisibility={setOpen}
                onChangeTileType={(tileType: TileType) =>
                  dispatch(setTileType("legacySearchMap", tileType))
                }
              />
            )}
          </LayersControlState>
        </MapFollowingPrimaryVehicles>
      </div>
    </div>
  )
}

export default SearchPage
