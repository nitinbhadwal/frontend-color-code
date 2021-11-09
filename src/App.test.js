import axios from "axios";
import { getData, API } from "./Services";

jest.mock("axios");

describe("getData", () => {
  //Test Case 1
  it("fetches successfully data from an API", async () => {
    const data = {
      responseCode: 200,
      responseMessage: "success",
      response: ["rgb(8,8,8)", "rgb(8,8,16)", "rgb(8,8,24)"],
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(data));
    await expect(getData("32768")).resolves.toEqual(data);
    expect(axios.get).toHaveBeenCalledWith(`${API}/?limit=32768`);
  });

  // Test Case 2
  it("fetches erroneously data from an API", async () => {
    const errorMessage = "Network Error";

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );

    await expect(getData()).rejects.toThrow(errorMessage);
  });
});
