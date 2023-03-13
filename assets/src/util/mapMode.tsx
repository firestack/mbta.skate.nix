import React from "react"
import { ReactElement } from "react"
import MapPage from "../components/mapPage"
import SearchPage from "../components/searchPage"
import { SearchIcon, SearchMapIcon } from "../helpers/icon"
import inTestGroup, { MAP_BETA_GROUP_NAME } from "../userInTestGroup"

type HTMLElementProps = React.PropsWithoutRef<React.HTMLAttributes<HTMLElement>>

export interface NavMode {
  path: string
  title: string
  element: ReactElement
  navIcon: React.JSXElementConstructor<HTMLElementProps>
  supportsRightPanel: boolean
  navEventText?: string
}

const legacyMapConfig = {
  path: "/search",
  title: "Search",
  element: <SearchPage />,
  navIcon: SearchIcon,
  supportsRightPanel: true,
}

export const searchMapConfig = {
  path: "/map",
  title: "Search Map",
  element: <MapPage />,
  navIcon: SearchMapIcon,
  supportsRightPanel: false,
  navEventText: "Search Map nav entry clicked",
}

export const mapModeForUser = (): NavMode =>
  inTestGroup(MAP_BETA_GROUP_NAME) ? searchMapConfig : legacyMapConfig