defmodule Plausible.Workers.CleanInvitationsTest do
  use Plausible.DataCase
  alias Plausible.Workers.CleanInvitations

  test "cleans invitation that is more than 48h old" do
    now = NaiveDateTime.utc_now(:second)

    insert(:invitation,
      inserted_at: NaiveDateTime.shift(now, hour: -49),
      site: build(:site),
      inviter: build(:user)
    )

    CleanInvitations.perform(nil)

    refute Repo.exists?(Plausible.Auth.Invitation)
  end

  test "does not clean invitation that is less than 48h old" do
    now = NaiveDateTime.utc_now(:second)

    insert(:invitation,
      inserted_at: NaiveDateTime.shift(now, hour: -47),
      site: build(:site),
      inviter: build(:user)
    )

    CleanInvitations.perform(nil)

    assert Repo.exists?(Plausible.Auth.Invitation)
  end
end
