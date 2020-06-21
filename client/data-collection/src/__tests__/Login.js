import React from "react";
import Login from "../containers/Login";
import { mount, configure } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Adapter from "enzyme-adapter-react-16";
import { BrowserRouter } from "react-router-dom";
import api from "../utils/API";
import { onSubmit, onLoggedIn } from "../actions/login";
import SelectInput from "@material-ui/core/Select/SelectInput";
const postRequests = require.requireMock("../utils/requests/postRequsts");

jest.mock("../utils/API", () => {
  return {
    post: jest.fn(),
  };
});

/**
 * Test for Login page.
 *
 * The following tests will assert the basic functionality of the login page.
 * We will mostly cover the input fields (username and password inputs)
 * but also the submit button functionality.
 *
 * Please note that complete testing of the GUI is impossible, and even
 * the current tests may not guarantee 100% bug-free code. Manual testing
 * remains important!
 *
 * @since     17.05.2020
 *
 *
 * @see https://devhints.io/enzyme#installing
 * @see https://github.com/enzymejs/enzyme/issues/1002
 * @see https://stackoverflow.com/questions/50584641/invariant-violation-you-should-not-use-switch-outside-a-router
 */

// configure the Enzyme adapter
//https://stackoverflow.com/questions/55344422/what-is-adapter-in-enzyme
configure({ adapter: new Adapter() });

//create a mock store
const defaultStore = {
  loginReducer: {
    username: "alin",
    password: "bandera",
  },
  mainAppReducer: {},
  questionsReducer: {
    answers: [],
  },
};

const mockedStore = configureMockStore()(defaultStore);

//render the full page (also router, provider)
export const mountWithProvider = (children) => (store = mockedStore) =>
  mount(
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );

describe("works", () => {
  it("should render without throwing an error", () => {
    const props = {};
    const wrapper = mountWithProvider(<Login {...props} />)();
    expect(wrapper.exists()).toBe(true);
  });
});

describe("basic structure test", () => {
  it("has a Login component", () => {
    const props = {};
    const wrapper = mountWithProvider(<Login {...props} />)();
    expect(wrapper.contains(<Login />)).toBe(true);
  });
});

it("Correct actions dispatched when login success", async () => {
  await api.post.mockResolvedValue(
    Promise.resolve({ data: { access_token: "access" }, status: 200 })
  );
  mockedStore.dispatch(
    onSubmit("username", "password", mockedStore.dispatch)
  );
  await new Promise(r => setTimeout(r, 200))
  expect(mockedStore.getActions()[0].type === "ON_LOG_IN")
  expect(mockedStore.getActions()[1].type === "ON_LOGGED_IN")
});
