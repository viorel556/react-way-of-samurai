import {actions, followUser, unfollowUser} from "../redux/users-reducer.ts";
import {usersApi} from "../api/users-api.ts";
import {APIResponseType} from "../api/api-types.ts";
import {ResultCodeEnum} from "../api/api.ts";


 // TEST SETUP:
// Making a Mock on the object that we receive from this link:
jest.mock("../api/users-api.ts"); // replacing the REAL users-api;
const usersApiMock = usersApi as jest.Mocked<typeof usersApi>;
const result: APIResponseType = {
    resultCode: ResultCodeEnum.Success,
    data: {},
    messages: []
};

// Creating the Mocks used as params in Thunks:
const dispatchMock = jest.fn();  // creating a Dispatch Mock
const getStateMock = jest.fn(); // creating a GetState Mock
beforeEach( () => {
    dispatchMock.mockClear();  // clearing the mocks after using in a test
    dispatchMock.mockClear(); // to be ready for the next test
    usersApiMock.requestFollowUser.mockClear();
    usersApiMock.requestUnfollowUser.mockClear();
});
test("followUser thunk", async () => {
    /* testing if dispatch is called 3 times and with the expected arguments */
    const thunk = followUser(1);

    // specifying a fake networking request
    jest.spyOn(usersApiMock, 'requestFollowUser').mockResolvedValue(result)

    // A THUNK EXPECTS 3 OBJECTS:
    await thunk(dispatchMock, getStateMock, {}); // getStateMock and obj to be ignored;

    // CHECK(1) dispatch to be called 3 times:
    expect(dispatchMock).toBeCalledTimes(3);

    // CHECK(2) if dispatch was called with exact arguments expected:
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.follow(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1));
});

test("unfollowUser thunk", async () => {
    /* testing if dispatch is called 3 times and with the expected arguments */
    const thunk = unfollowUser(1); // TEST CASE

    // specifying a fake networking request
    jest.spyOn(usersApiMock, 'requestUnfollowUser').mockResolvedValue(result)

    // a thunk expects 3 params:
    await thunk(dispatchMock, getStateMock, {}); // getStateMock and obj to be ignored;

    // CHECK(1) dispatch to be called 3 times
    expect(dispatchMock).toBeCalledTimes(3);

    // CHECK(2)
    expect(dispatchMock)
        .toHaveBeenNthCalledWith(1,
            actions.toggleFollowingProgress(true, 1));
    expect(dispatchMock)
        .toHaveBeenNthCalledWith(2,
            actions.unfollow(1));
    expect(dispatchMock)
        .toHaveBeenNthCalledWith(3,
            actions.toggleFollowingProgress(false, 1));
});