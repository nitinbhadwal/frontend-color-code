import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import axios from "axios";
import App from "./App";
import data from "./mockdata.json";
import { getData, API } from "./Services";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("axios");

describe("Color code component data", () => {
  // Test Case 1
  it("fetche data from the API successfully", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(data));
    await expect(getData()).resolves.toEqual(data);
    expect(axios.get).toHaveBeenCalledWith(`${API}`);
  });

  // Test Case 2
  it("Catch the total unique color count", async () => {
    const payload = { total: 32768 };
    axios.get = jest.fn().mockResolvedValue(payload);
    const callingAPI = await getData();
    expect(callingAPI).toEqual(payload);
  });

  // Test Case 3
  it("Find and match the canvas width and height", () => {
    const component = shallow(<App />);
    expect(component.find("canvas").props().width).toEqual(256);
    expect(component.find("canvas").props().height).toEqual(128);
  });

  // Test Case 4
  it("fetches erroneously data from the API", async () => {
    const errorMessage = "Network Error";
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );
    await expect(getData()).rejects.toThrow(errorMessage);
  });
});
