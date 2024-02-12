defmodule Skate.OpenRouteServiceAPI.DirectionsRequest do
  @moduledoc """
  A request to the OpenRouteService Directions API
  """
  @derive Jason.Encoder

  @typedoc """
    Type that represents a request made to OpenRouteService's Directions API
  """
  @type t() :: %__MODULE__{
          coordinates: [[float()]]
        }

  defstruct coordinates: []
end