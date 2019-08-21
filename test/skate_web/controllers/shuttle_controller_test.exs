defmodule SkateWeb.ShuttleControllerTest do
  use SkateWeb.ConnCase
  import Test.Support.Helpers

  alias Gtfs.Route
  alias SkateWeb.AuthManager

  describe "GET /api/shuttles" do
    setup do
      reassign_env(:skate_web, :routes_fn, fn ->
        [
          %Route{id: "non-shuttle", name: "Non Shuttle", direction_names: %{}, description: ""},
          %Route{
            id: "shuttle",
            name: "Shuttle",
            direction_names: %{},
            description: "Rail Replacement Bus"
          }
        ]
      end)
    end

    test "when logged out, redirects you to cognito auth", %{conn: conn} do
      conn =
        conn
        |> api_headers()
        |> get("/api/shuttles")

      assert redirected_to(conn) == "/auth/cognito"
    end

    test "when logged in, returns only shuttle routes", %{conn: conn} do
      conn =
        conn
        |> api_headers()
        |> logged_in()
        |> get("/api/shuttles")

      assert %{"data" => [%{"id" => "shuttle"}]} = json_response(conn, 200)
    end
  end

  defp api_headers(conn) do
    conn
    |> put_req_header("accept", "application/json")
    |> put_req_header("content-type", "application/json")
  end

  defp logged_in(conn) do
    {:ok, token, _} = AuthManager.encode_and_sign(%{})

    put_req_header(conn, "authorization", "bearer: " <> token)
  end
end