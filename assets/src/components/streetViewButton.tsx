import React, { ReactNode } from "react"
import { joinClasses } from "../helpers/dom"
import { WalkingIcon } from "../helpers/icon"
import { streetViewUrl as streetViewUrlFrom } from "../util/streetViewUrl"
import * as FullStory from "@fullstory/browser"

export interface GeographicCoordinate {
  latitude: number
  longitude: number
}

export interface GeographicCoordinateBearing extends GeographicCoordinate {
  bearing?: number
}

export interface StreetViewButtonProps extends GeographicCoordinateBearing {
  className?: string
  text?: string
  title?: string
  children?: ReactNode
}

export const StreetViewButton = ({
  className,
  text,
  children,
  title,
  ...worldPosition
}: StreetViewButtonProps) => {
  const streetViewUrl = streetViewUrlFrom(worldPosition)
  return (
    <a
      className={joinClasses([
        "c-street-view-button",
        "button-small",
        className,
      ])}
      href={streetViewUrl}
      target="_blank"
      rel="noreferrer"
      onClick={() => {
        FullStory.event("Street view link followed", {
          streetViewUrl_str: streetViewUrl,
          source: {
            latitude_real: worldPosition.latitude,
            longitude_real: worldPosition.longitude,
          },
        })
      }}
      {...(title && { title })}
    >
      <WalkingIcon
        className="c-street-view-button__icon"
        role="img"
        aria-label=""
        aria-hidden={true}
      />
      {children ?? text ?? "Street View"}
    </a>
  )
}

export default StreetViewButton
