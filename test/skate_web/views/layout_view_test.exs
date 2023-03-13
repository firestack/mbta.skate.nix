defmodule SkateWeb.LayoutViewTest do
  use SkateWeb.ConnCase
  import Test.Support.Helpers

  alias SkateWeb.LayoutView

  describe "record_fullstory?/0" do
    test "returns true if the :record_fullstory env is true" do
      reassign_env(:skate, :record_fullstory, true)

      assert LayoutView.record_fullstory?()
    end

    test "returns false if the :record_fullstory env is false" do
      reassign_env(:skate, :record_fullstory, false)

      refute LayoutView.record_fullstory?()
    end

    test "returns false if the :record_fullstory env is missing" do
      reassign_env(:skate, :record_fullstory, nil)

      refute LayoutView.record_fullstory?()
    end
  end

  describe "record_appcues?/0" do
    test "returns true if the :record_appcues env is true" do
      reassign_env(:skate, :record_appcues, true)

      assert LayoutView.record_appcues?()
    end

    test "returns false if the :record_appcues env is false" do
      reassign_env(:skate, :record_appcues, false)

      refute LayoutView.record_sentry?()
    end

    test "returns false if the :record_appcues env is missing" do
      reassign_env(:skate, :record_appcues, nil)

      refute LayoutView.record_sentry?()
    end
  end

  describe "record_sentry?/0" do
    test "returns true if the :record_sentry env is true" do
      reassign_env(:skate, :record_sentry, true)

      assert LayoutView.record_sentry?()
    end

    test "returns false if the :record_sentry env is false" do
      reassign_env(:skate, :record_sentry, false)

      refute LayoutView.record_sentry?()
    end

    test "returns false if the :record_sentry env is missing" do
      reassign_env(:skate, :record_sentry, nil)

      refute LayoutView.record_sentry?()
    end
  end
end