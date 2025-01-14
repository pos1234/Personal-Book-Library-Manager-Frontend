import { postApi } from "../src/config/api-config";
import { signIn, signUp } from "../src/repository/user-repo";
import { mockDataUser } from "../__fixtures__/mockDataUser";
jest.mock("../src/config/api-config", () => ({
    postApi: jest.fn(),
}));

describe("User Repository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("singUp", () => {
    it("Creates an account and returns user detail", async () => {
      (postApi as jest.Mock).mockResolvedValueOnce(mockDataUser);
      const data = {
        data: {
          email: "abebe@gmail.com",
          password: "1234567",
        },
      };
      const signup = await signUp(data);      
      expect(signup).toEqual(mockDataUser);
      expect(postApi).toHaveBeenCalledWith(
        "/auth/signup",
        expect.any(Object),
        expect.any(String),
      );
      expect(postApi).toHaveBeenCalledTimes(1);
    });

    it("Returns error object on post failure", async () => {
      (postApi as jest.Mock).mockResolvedValueOnce({ data: [] });
      const data = {
        data: {
          email: "abebe@gmail.com",
          password: "1234567",
        },
      };
      const signup = await signUp(data);      
      expect(postApi).toHaveBeenCalledWith(
        "/auth/signup",
        expect.any(Object),
        expect.any(String),
      );
      expect(signup).toEqual({
        data:[]
      });
      expect(postApi).toHaveBeenCalledTimes(1);
    });
  });
  describe("singIn", () => {
    it("Logs in and returns user detail", async () => {
      (postApi as jest.Mock).mockResolvedValueOnce(mockDataUser);
      const data = {
        data: {
          email: "abebe@gmail.com",
          password: "1234567",
        },
      };
      const signin = await signIn(data);      
      expect(signin).toEqual(mockDataUser);
      expect(postApi).toHaveBeenCalledWith(
        "/auth/signin",
        expect.any(Object),
        expect.any(String),
      );
      expect(postApi).toHaveBeenCalledTimes(1);
    });

    it("Returns error object on post failure", async () => {
      (postApi as jest.Mock).mockResolvedValueOnce({ data: [] });
      const data = {
        data: {
          email: "abebe@gmail.com",
          password: "1234567",
        },
      };
      const signin = await signIn(data);      
      expect(postApi).toHaveBeenCalledWith(
        "/auth/signin",
        expect.any(Object),
        expect.any(String),
      );
      expect(signin).toEqual({
        data:[]
      });
      expect(postApi).toHaveBeenCalledTimes(1);
    });
  });
});
