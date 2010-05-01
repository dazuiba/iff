require 'test_helper'

class SharesControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:shares)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create shares" do
    assert_difference('Shares.count') do
      post :create, :shares => { }
    end

    assert_redirected_to shares_path(assigns(:shares))
  end

  test "should show shares" do
    get :show, :id => shares(:one).id
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => shares(:one).id
    assert_response :success
  end

  test "should update shares" do
    put :update, :id => shares(:one).id, :shares => { }
    assert_redirected_to shares_path(assigns(:shares))
  end

  test "should destroy shares" do
    assert_difference('Shares.count', -1) do
      delete :destroy, :id => shares(:one).id
    end

    assert_redirected_to shares_path
  end
end
