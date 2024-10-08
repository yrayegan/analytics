defmodule PlausibleWeb.HelpScoutControllerTest do
  use PlausibleWeb.ConnCase, async: true
  use Plausible

  @moduletag :ee_only

  on_ee do
    alias Plausible.HelpScout

    describe "callback/2" do
      test "returns details on success", %{conn: conn} do
        user = insert(:user)
        signature_key = Application.fetch_env!(:plausible, HelpScout)[:signature_key]
        data = ~s|{"conversation-id":"123","customer-id":"500"}|

        signature =
          :hmac
          |> :crypto.mac(:sha, signature_key, data)
          |> Base.encode64()
          |> URI.encode_www_form()

        Req.Test.stub(HelpScout, fn
          %{request_path: "/v2/oauth2/token"} = conn ->
            Req.Test.json(conn, %{
              "token_type" => "bearer",
              "access_token" => "369dbb08be58430086d2f8bd832bc1eb",
              "expires_in" => 172_800
            })

          %{request_path: "/v2/customers/500"} = conn ->
            Req.Test.json(conn, %{
              "id" => 500,
              "_embedded" => %{
                "emails" => [
                  %{
                    "id" => 1,
                    "value" => user.email,
                    "type" => "home"
                  }
                ]
              }
            })
        end)

        conn =
          get(
            conn,
            "/helpscout/callback?conversation-id=123&customer-id=500&X-HelpScout-Signature=#{signature}"
          )

        assert html_response(conn, 200) =~ "/crm/auth/user/#{user.id}"
      end

      test "returns error on failure", %{conn: conn} do
        conn =
          get(
            conn,
            "/helpscout/callback?conversation-id=123&customer-id=500&X-HelpScout-Signature=invalid"
          )

        assert html_response(conn, 200) =~ "bad_signature"
      end

      test "handles invalid parameters gracefully", %{conn: conn} do
        conn =
          get(
            conn,
            "/helpscout/callback?customer-id=500&X-HelpScout-Signature=whatever"
          )

        assert html_response(conn, 200) =~ "Missing expected parameters"
      end
    end

    describe "search/2" do
      test "returns results", %{conn: conn} do
        insert(:user, email: "hs.match@plausible.test")
        insert(:user, email: "hs.nomatch@plausible.test")

        conn =
          conn
          |> set_conversation_cookie("123")
          |> get("/helpscout/search?conversation_id=123&customer_id=500&term=hs.match")

        html = html_response(conn, 200)

        assert html =~ "hs.match@plausible.test"
        refute html =~ "hs.nomatch@plausible.test"
      end

      test "returns error when cookie is missing", %{conn: conn} do
        conn = get(conn, "/helpscout/search?conversation_id=123&customer_id=500&term=hs.match")

        assert html_response(conn, 200) =~ "invalid_conversation"
      end

      test "returns error when cookie does not match", %{conn: conn} do
        conn =
          conn
          |> set_conversation_cookie("456")
          |> get("/helpscout/search?conversation_id=123&customer_id=500&term=hs.match")

        assert html_response(conn, 200) =~ "invalid_conversation"
      end
    end

    describe "show/2" do
      test "returns details on success", %{conn: conn} do
        user = insert(:user, email: "hs.match@plausible.test", notes: "Some note\nwith new line")

        conn =
          conn
          |> set_conversation_cookie("123")
          |> get(
            "/helpscout/show?conversation_id=123&customer_id=500&email=hs.match@plausible.test"
          )

        assert html = html_response(conn, 200)
        assert html =~ "/crm/auth/user/#{user.id}"
        assert html =~ "Some note<br>\nwith new line"
      end

      test "returns error when cookie is missing", %{conn: conn} do
        conn =
          get(
            conn,
            "/helpscout/show?conversation_id=123&customer_id=500&email=hs.match@plausible.test"
          )

        assert html_response(conn, 200) =~ "invalid_conversation"
      end

      test "returns error when cookie does not match", %{conn: conn} do
        conn =
          conn
          |> set_conversation_cookie("456")
          |> get(
            "/helpscout/show?conversation_id=123&customer_id=500&email=hs.match@plausible.test"
          )

        assert html_response(conn, 200) =~ "invalid_conversation"
      end
    end

    defp set_conversation_cookie(conn, conversation_id) do
      conn
      |> PlausibleWeb.HelpScoutController.set_cookie(conversation_id)
      |> recycle()
      |> Map.put(:secret_key_base, secret_key_base())
      |> Plug.Conn.put_req_header("x-forwarded-for", Plausible.TestUtils.random_ip())
    end

    defp secret_key_base() do
      :plausible
      |> Application.fetch_env!(PlausibleWeb.Endpoint)
      |> Keyword.fetch!(:secret_key_base)
    end
  end
end
