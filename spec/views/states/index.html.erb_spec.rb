require 'rails_helper'

RSpec.describe "states/index", type: :view do
  before(:each) do
    assign(:states, [
      State.create!(
        :id => "",
        :name => "Name"
      ),
      State.create!(
        :id => "",
        :name => "Name"
      )
    ])
  end

  it "renders a list of states" do
    render
    assert_select "tr>td", :text => "".to_s, :count => 2
    assert_select "tr>td", :text => "Name".to_s, :count => 2
  end
end
