import { useEffect, useMemo, useState } from "react"
import { RoutePatternId, ShapePoint, Stop } from "../schedule"
import { fetchDetourDirections, fetchDetourMissedStops } from "../api"
import { DetourShape } from "../models/detour"

const useDetourDirections = (shapePoints: ShapePoint[]) => {
  const [detourShape, setDetourShape] = useState<ShapePoint[]>([])
  const [directions, setDirections] = useState<
    DetourShape["directions"] | undefined
  >(undefined)

  useEffect(() => {
    let shouldUpdate = true

    if (shapePoints.length < 2) {
      // We expect not to have any directions or shape if we don't have at
      // least two points to route between
      setDetourShape([])
      setDirections(undefined)
      return
    }

    fetchDetourDirections(shapePoints).then((detourInfo) => {
      if (detourInfo && shouldUpdate) {
        setDetourShape(detourInfo.coordinates)
        setDirections(detourInfo.directions)
      }
    })

    return () => {
      shouldUpdate = false
    }
  }, [shapePoints])

  return {
    detourShape,
    directions,
  }
}

export const useDetour = (routePatternId: RoutePatternId) => {
  const [startPoint, setStartPoint] = useState<ShapePoint | null>(null)
  const [endPoint, setEndPoint] = useState<ShapePoint | null>(null)
  const [waypoints, setWaypoints] = useState<ShapePoint[]>([])
  const [missedStops, setMissedStops] = useState<Stop[] | undefined>(undefined)

  useEffect(() => {
    let shouldUpdate = true

    if (startPoint && endPoint) {
      fetchDetourMissedStops(routePatternId, startPoint, endPoint).then(
        (result) => {
          if (shouldUpdate) {
            setMissedStops(result || undefined)
          }
        }
      )
    }

    return () => {
      shouldUpdate = false
    }
  }, [routePatternId, startPoint, endPoint])

  const { detourShape, directions } = useDetourDirections(
    useMemo(
      () =>
        [startPoint, ...waypoints, endPoint].filter(
          (v): v is ShapePoint => !!v
        ),
      [startPoint, waypoints, endPoint]
    ) ?? []
  )

  const canAddWaypoint = () => startPoint !== null && endPoint === null
  const addWaypoint = (p: ShapePoint) => {
    canAddWaypoint() && setWaypoints((positions) => [...positions, p])
  }

  const addConnectionPoint = (point: ShapePoint) => {
    if (startPoint === null) {
      setStartPoint(point)
    } else if (endPoint === null) {
      setEndPoint(point)
    }
  }

  const canUndo = startPoint !== null

  const undo = () => {
    if (!canUndo) return

    if (endPoint !== null) {
      setEndPoint(null)
    } else if (waypoints.length > 0) {
      setWaypoints((positions) => positions.slice(0, positions.length - 1))
    } else if (startPoint !== null) {
      setStartPoint(null)
    }
  }

  const clear = () => {
    setEndPoint(null)
    setStartPoint(null)
    setWaypoints([])
  }

  return {
    /**
     * Creates a new waypoint if all of the following criteria is met:
     * - {@link startPoint} is set
     * - {@link endPoint} is not set.
     */
    addWaypoint,
    /**
     * Sets {@link startPoint} if unset.
     * Otherwise sets {@link endPoint} if unset.
     */
    addConnectionPoint,

    /**
     * The starting connection point of the detour.
     */
    startPoint,
    /**
     * The ending connection point of the detour.
     */
    endPoint,
    /**
     * The waypoints that connect {@link startPoint} and {@link endPoint}.
     */
    waypoints,

    /**
     * The routing API generated detour shape.
     */
    detourShape,
    /**
     * The turn-by-turn directions generated by the routing API.
     */
    directions,
    /**
     * Stops missed by the detour, determined after the route is completed
     */
    missedStops,

    /**
     * Reports if {@link undo} will do anything.
     */
    canUndo,
    /**
     * Removes the last waypoint in {@link waypoints} if {@link canUndo} is `true`.
     */
    undo,
    /**
     * Clears the entire detour
     */
    clear,
  }
}