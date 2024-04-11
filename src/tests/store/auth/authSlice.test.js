import { authSlice } from "../../../store/auth/authSlide";
import { initialState } from "../../helpers/fixtures/authFixtures";

describe('pruebas en authSlice', () => {

    test('debe de regresar el estado inicial y llamarse auth', () => {
        
        const state = authSlice.reducer(initialState, {});
        
        expect(state).toEqual(initialState);
        expect(authSlice.name).toBe('auth');
    });

});